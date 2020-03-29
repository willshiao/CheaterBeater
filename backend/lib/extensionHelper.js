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

function shouldSkip (dirName) {
  return fileBlacklist.has(dirName)
}

async function findFiles (filePath, fileCb, fullPath = false) {
  const files = await fs.readdir(filePath, { withFileTypes: true })
  await Promise.map(files, async (file) => {
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
    const longPath = path.join(filePath, file.name)
    if (gitignore.denies(file.name)) return null
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
  const dirName = path.join(targetPath, '___lang_jihwan')
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
        langStrs[fileLang] += fileContents
        langCurrentIdxs[fileLang] += numLines
        langStoredIdxs[fileLang].push({
          pos: langCurrentIdxs[fileLang],
          path: fileLang
        })
      } else {
        langStrs[fileLang] = fileContents
        langCurrentIdxs[fileLang] = numLines
        langStoredIdxs[fileLang] = [{
          pos: numLines,
          path: fileLang
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

module.exports = { ext2Lang, file2Lang, getDirLanguages, findFiles, findFilesWithIgnore, concatByLanguage, diffRepos }
