'use strict'

const Promise = require('bluebird')
const path = require('path')
const fs = require('fs').promises
const config = require('config')
const languageMap = require('language-map')

// Reverse the map, we want extension => language
const revMap = {}
for (const langName in languageMap) {
  const langVal = languageMap[langName]
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
  return (dirName in fileBlacklist)
}

async function findFiles (filePath, fileCb, fullPath = false) {
  const files = await fs.readdir(filePath, { withFileTypes: true })
  await Promise.map(files, (file) => {
    if (file.isDirectory()) {
      if (shouldSkip(file.name)) return null
      return findFiles(path.join(filePath, file.name), fileCb)
    } else { // Is file
      if (fullPath) {
        fileCb(path.join(filePath, file.name))
      } else {
        fileCb(file.name)
      }
    }
  }, { concurrency: 2 })
}

async function getDirLanguages (targetPath) {
  // const fileList = await nodeDir.promiseFiles(targetPath)
  const fileExts = new Set()
  await findFiles(targetPath, (file) => {
    const lang = file2Lang(file)
    if (lang !== null) fileExts.add(lang)
  })
  console.log('Got files:', fileExts)
  return fileExts
  // return new Set(fileList.map(file2Lang))
}

module.exports = { ext2Lang, file2Lang, getDirLanguages, findFiles }
