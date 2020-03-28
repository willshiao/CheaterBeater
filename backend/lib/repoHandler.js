'use strict'

const fs = require('fs').promises
const fsSync = require('fs')
const mkdirp = require('mkdirp')
const config = require('config')
const crypto = require('crypto')
const path = require('path')
const simpleGit = require('simple-git/promise')
const { findFiles } = require('./extensionHelper')

const git = simpleGit()
const REPO_DIR = config.get('repoDir')

// Create folder to hold repos if it doesn't exist
// Sync is okay because it's only 1 time on init
// console.log('Creating', REPO_DIR, '???')
mkdirp.sync(REPO_DIR)
// console.log('Made:', made)

async function cloneRepo(repoUrl, cacheRepos = true) {
  const repoName = new URL(repoUrl).pathname.split('/').pop()
  const repoPath = path.join(REPO_DIR, repoName)
  let repoExists = true
  try {
    const statInfo = await fs.stat(repoPath)
    // await fs.access(repoPath, oldfs.constants.F_OK | oldfs.constants.W_OK | oldfs.constants.R_OK)
    if (!statInfo.isDirectory()) repoExists = false
  } catch (error) {
    repoExists = false
    console.log(repoPath, 'does not exist, cloning...', error)
    // Does not exist yet
  }
  // Don't create if it already exists
  // This kind of serves a filesystem cache
  if (!repoExists || !cacheRepos) {
    try {
      await git.clone(`${repoUrl}.git`, repoPath)
    } catch (err) {
      if (err.message.includes('not found')) return null
      throw err
    }
  }
  return repoPath
}

async function hashFile (filename) {
  // console.log('Hashing: ', filename)
  return new Promise((resolve, reject) => {
    const hashSum = crypto.createHash(config.get('hashAlgorithm'))
    const stream = fsSync.createReadStream(filename)
    stream.on('data', data => hashSum.update(data))
    stream.on('end', () => resolve(hashSum.digest('hex')))
    stream.on('error', reject)
  })
}

async function getHashes (repoPath) {
  const hashToFile = {}
  await findFiles(repoPath, async (filePath) => {
    const fileHash = await hashFile(filePath)
    hashToFile[fileHash] = filePath
  }, true)
  return hashToFile
}

// async function findLanguages()

module.exports = { cloneRepo, getHashes }
