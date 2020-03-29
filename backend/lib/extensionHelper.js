'use strict'

const Promise = require('bluebird')
const path = require('path')
const fsSync = require('fs')
const fs = require('fs').promises
const mkdirp = require('mkdirp')
const config = require('config')
const languageMap = require('language-map')
const parser = require('gitignore-parser')

const { patienceDiff, patienceDiffPlus } = require('./ext/patienceDiff')

// Reverse the map, we want extension => language
const revMap = {}
const languageBlacklist = new Set(config.get('languageBlacklist'))
const gitignore = parser.compile(fsSync.readFileSync('data/selective.gitignore', 'utf8'))

for (const langName in languageMap) {
  const langVal = languageMap[langName]
  if (languageBlacklist.has(langName)) continue
  if (langVal.type !== 'programming' || !langVal.extensions) continue
  langVal.extensions.forEach(ext => {
    revMap[ext] = langName
  })
}

const fileBlacklist = new Set(config.get('excludeDirs'))

function ext2Lang (ext) {
  if (ext in revMap) return revMap[ext]
  return null
}

function file2Lang (filePath) {
  return ext2Lang(path.extname(filePath))
}

const REPR_DIR = '___lang_jihwan'
function shouldSkip (dirName) {
  return fileBlacklist.has(dirName) || dirName.includes(REPR_DIR)
}

async function findFiles (filePath, fileCb, fullPath = false) {
  const files = await fs.readdir(filePath, { withFileTypes: true })
  await Promise.map(files, async (file) => {
    if (file.isSymbolicLink()) return null
    if (file.isDirectory()) {
      if (shouldSkip(file.name)) return null
      return findFiles(path.join(filePath, file.name), fileCb, fullPath)
    } else { // Is file
      if (fullPath) {
        await fileCb(path.join(filePath, file.name))
      } else {
        await fileCb(file.name)
      }
    }
  }, { concurrency: 2 })
}

async function findFilesWithIgnore (filePath, fileCb, fullPath = false) {
  const files = await fs.readdir(filePath, { withFileTypes: true })
  await Promise.map(files, async (file) => {
    if (file.isSymbolicLink()) return null
    const longPath = path.join(filePath, file.name)
    if (gitignore.denies(file.name) || file.name.includes(REPR_DIR)) return null
    if (file.isDirectory()) {
      return findFiles(longPath, fileCb, fullPath)
    } else { // Is file
      if (fullPath) {
        await fileCb(longPath)
      } else {
        await fileCb(file.name)
      }
    }
  }, { concurrency: 2 })
}

async function getDirLanguages (targetPath) {
  // const fileList = await nodeDir.promiseFiles(targetPath)
  const fileExts = new Set()
  await findFilesWithIgnore(targetPath, (file) => {
    const lang = file2Lang(file)
    if (lang !== null) fileExts.add(lang)
  })
  console.log('Got files:', fileExts)
  return fileExts
  // return new Set(fileList.map(file2Lang))
}

async function concatByLanguage (targetPath, useFs = true) {
  // console.log('Concat called on ', targetPath)
  const dirName = path.join(targetPath, REPR_DIR)
  await mkdirp(dirName)
  try {
    const index = JSON.parse(await fs.readFile(path.join(dirName, 'index-json')))
    const langStrs = {}
    for (const langName in index) {
      const cleanLangName = langName.split(' ').join('_')
      langStrs[langName] = await fs.readFile(path.join(dirName, cleanLangName), 'utf8')
    }
    return [langStrs, index]
  } catch (err) {
    const langStrs = {}
    const langCurrentIdxs = {}
    const langStoredIdxs = {}
    await findFilesWithIgnore(targetPath, async (file) => {
      const fileLang = file2Lang(file)
      if (fileLang === null) return null
      const fileContents = await fs.readFile(file, 'utf8')
      // Slow, but we can fix later (hopefully)
      const numLines = fileContents.split('\n').length
      if (fileLang in langStrs) {
        langStrs[fileLang] += fileContents + '\n'
        langCurrentIdxs[fileLang] += numLines
        langStoredIdxs[fileLang].push({
          pos: langCurrentIdxs[fileLang],
          path: file
        })
      } else {
        langStrs[fileLang] = fileContents + '\n'
        langCurrentIdxs[fileLang] = numLines
        langStoredIdxs[fileLang] = [{
          pos: numLines,
          path: file
        }]
      }
    }, true)
    if (useFs) {
      for (const langName in langStrs) {
        const cleanLangName = langName.split(' ').join('_')
        await fs.writeFile(path.join(dirName, cleanLangName), langStrs[langName])
      }
      fs.writeFile(path.join(dirName, 'index-json'), JSON.stringify(langStoredIdxs))
    }
    return [langStrs, langStoredIdxs]
  }
}

async function readLangFile (targetRepo, targetLang) {
  const dirName = path.join(targetRepo, REPR_DIR)
  // console.log('Reading from', dirName)
  const index = JSON.parse(await fs.readFile(path.join(dirName, 'index-json')))
  const cleanLangName = targetLang.split(' ').join('_')
  // console.log('Reading from', path.join(dirName, cleanLangName))
  const langStr = await fs.readFile(path.join(dirName, cleanLangName), 'utf8')
  return [langStr, index[targetLang]]
}

async function diffRepos (repoPath1, repoPath2) {
  const [langStrs1, langStoredIdxs1] = await concatByLanguage(repoPath1)
  const [langStrs2, langStoredIdxs2] = await concatByLanguage(repoPath2)
  const langs1 = new Set(Object.keys(langStoredIdxs1))
  const sharedLangs = Object.keys(langStoredIdxs2)
    .filter(x => langs1.has(x))
  const ret = {}
  sharedLangs.forEach(sharedLang => {
    ret[sharedLang] = patienceDiffPlus(langStrs1[sharedLang].split('\n'), langStrs2[sharedLang].split('\n'))
  })
  return ret
}

function repoPathToLink (githubLink, repoPath) {
  const repoName = new URL(githubLink).pathname.split('/').pop()
  const createdPath = path.join(config.get('repoDir'), repoName)
  return repoPath.replace(createdPath, `${githubLink}/blob/master`)
  .split('\\\\') // in case we have Windows paths
  .join('/')
}

async function compareWithMatches (filename, mainRepo, otherRepos, langName, path2Link) {
  console.log('Got input filename: ', filename)
  const fileContents = await fs.readFile(filename, 'utf8')
  const fileLines = fileContents
    .split('\n')
    .filter(l => l.trim().length > 0)
    // .map(l => l.trim())
  const matches = fileLines.map(line => {
    return {
      line,
      otherIndexes: []
    }
  })
  await Promise.each(otherRepos, async (repo) => {
    const ghLink = path2Link[repo]
    if (repo === mainRepo) return null
    const [langStr, index] = await readLangFile(repo, langName)
    const langStrLines = langStr.split('\n')
    const diff = patienceDiff(fileLines, langStrLines)
    // Iterate over the diff
    diff.lines.forEach(line => {
      // if (line.line.includes('isZipCodeValid')) console.log('Zip code:', line)
      if (line.aIndex === -1 || line.bIndex === -1) return null
      let i = 0
      for (i = 0; i < index.length; ++i) {
        if (line.bIndex < index[i].pos) break
      }
      i = Math.min(i, index.length - 1)
      if (line.aIndex >= matches.length) {
        console.log(`Warning: aIndex=${line.aIndex} >= size=${matches.length}`)
      }
      matches[line.aIndex].otherIndexes.push(repoPathToLink(ghLink, index[i].path))
    })
  })
  return { matches, linesChecked: fileLines.length }
}

function continousMatches (matchArr) {
  let buf = ''
  let links = new Set()
  const output = []
  let linesSame = 0
  let blockLines = 0
  for (let i = 0; i < matchArr.length; ++i) {
    if (matchArr[i].otherIndexes.length === 0) {
      if (buf.length > 0 && links.size > 0) {
        output.push({
          block: buf,
          plagiarismLinks: Array.from(links),
          blockLines
        })
      }
      // buf = matchArr[i].line + '\n'
      buf = ''
      links = new Set()
      blockLines = 0
    } else {
      linesSame++
      blockLines++
      buf += matchArr[i].line + '\n'
      matchArr[i].otherIndexes.forEach(x => links.add(x))
    }
  }
  if (buf.length > 0 && links.size > 0) {
    output.push({
      block: buf,
      plagiarismLinks: Array.from(links),
      blockLines
    })
  }
  return { blocks: output, linesSame }
}

module.exports = {
  compareWithMatches,
  concatByLanguage,
  continousMatches,
  diffRepos,
  ext2Lang,
  repoPathToLink,
  file2Lang,
  findFiles,
  findFilesWithIgnore,
  getDirLanguages
}
