'use strict'

const fs = require('fs').promises
const mkdirp = require('mkdirp')
const config = require('config')
const path = require('path')
const simpleGit = require('simple-git/promise')
const git = simpleGit()

const REPO_DIR = config.get('repoDir')

// Create folder to hold repos if it doesn't exist
// Sync is okay because it's only 1 time on init
mkdirp.sync(REPO_DIR)

async function cloneRepo(repoUrl, cacheRepos = true) {
  const repoName = new URL(repoUrl).pathname.split('/').pop()
  const repoPath = path.join(REPO_DIR, repoName)
  const stat = await fs.stat(repoPath)
  // Don't create if it already exists
  // This kind of serves a filesystem cache
  if (cacheRepos && !stat.isDirectory()) {
    await git.clone(`${repoUrl}.git`, repoPath)
  }
  return repoPath
}

// async function findLanguages()

module.exports = { cloneRepo }
