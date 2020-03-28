'use strict'

const router = require('express').Router()

const Promise = require('bluebird')
const bodyParser = require('body-parser')
const cheerio = require('cheerio')
const axios = require('axios')

const { AsyncHandler } = require('../lib/errorHandlers.js')
const { getDirLanguages } = require('../lib/extensionHelper.js')
const { cloneRepo, getHashes } = require('../lib/repoHandler.js')

router.use(bodyParser.json())

function union (setA, setB) {
  const _union = new Set(setA)
  for (const elem of setB) {
    _union.add(elem)
  }
  return _union
}

function getGithubFromDevpost ($) {
  const firstGithubLink = $('span:contains("github.com")').parent().attr('href')
  // In case the last one doesn't work
  const altGithubLink = $('span:contains("GitHub Repo")').parent().attr('href')
  return (firstGithubLink || altGithubLink)
}

router.get('/test', (req, res) => {
  res.send('OK')
})

router.post('/devpost', AsyncHandler(async (req, res) => {
  const link = req.body.link
  // call cheerio
  console.log(link)
  // Make a request for a user with a given ID
  const data = await axios.get(link)
  // console.log(data)
  const $ = cheerio.load(data.data)
  const githubLink = getGithubFromDevpost($)
  console.log('Link:', githubLink)
  if (githubLink === undefined) {
    return res.failMsg('Missing GitHub link')
  }

  const teamMembers = new Set(Array.from($('#app-team .user-profile-link'))
    .map(el => $(el).attr('href')))
  console.log('hi')
  console.log(teamMembers)

  const connectedProjects = [] // github link of all connected projects
  // get the rest of this user's projects

  const userPages = await Promise.map(Array.from(teamMembers), async link => {
    return (await axios.get(link)).data
  }, { concurrency: 2 })

  // get devpost of each project except original link
  for (let i = 0; i < userPages.length; i++) {
    const userPage = userPages[i]
    const $ = cheerio.load(userPage)
    const userProjects = new Set(Array.from($('#software-entries .link-to-software'))
      .map(el => $(el).attr('href')))
    // console.log($('#software-entries .link-to-software').attr('href'))
    // const userProjects = new Set(Array.from($('#software-entries'))
    // .map(el => $(el).attr('href')))
    userProjects.delete(link)
    // console.log(userProjects)
    connectedProjects.push(userProjects)
    // console.log(userPage)
  }

  // get github links for those projects
  console.log(connectedProjects)
  const uniqueProjs = connectedProjects.reduce((acc, cur) => union(acc, cur))
  console.log(uniqueProjs)

  // teammembers. for each
  // as long as new link != link
  // inside each member's devpost profie, loop through the list of projects and obtain its github link
  // const githubList = []
  // const githubAllProjectLinks = []

  const githubList = await Promise.map(Array.from(uniqueProjs), async link => {
    return (await axios.get(link)).data
  }, { concurrency: 2 })

  const filteredGittyLinks = githubList
    .map((page) => {
      const $ = cheerio.load(page)
      const ghLink = getGithubFromDevpost($)
      if (ghLink === undefined) console.log('Page:', page)
      return ghLink
    })
    .filter(el => el !== undefined)
  // Add original link
  filteredGittyLinks.push(githubLink)

  // console.log(githubAllProjectLinks)
  //  githubAllProjectLinks
  console.log(filteredGittyLinks)
  // clone all repos
  let mainRepoLocation = null // location of our target repo
  const repoLocations = (await Promise
    .map(filteredGittyLinks, async (gLink) => {
      const repoLocation = await cloneRepo(gLink)
      if (gLink === githubLink) {
        mainRepoLocation = repoLocation
      }
      return [gLink, repoLocation]
    }, { concurrency: 1 }))
    .filter(x => x[1])

  const dirLanguages = {}
  await Promise.map(repoLocations, async (pair) => {
    console.log(pair)
    dirLanguages[pair[0]] = await getDirLanguages(pair[1])
  }, { concurrency: 1 })
  console.log(dirLanguages)

  const hashes = {}
  const mainHashes = await getHashes(mainRepoLocation)
  const matches = {}
  await Promise.map(repoLocations, async ([gLink, repoDir]) => {
    if (gLink === githubLink) return null
    hashes[gLink] = await getHashes(repoDir)
    for (let mainHash in mainHashes) {
      if (mainHash in hashes[gLink]) {
        const mainFile = mainHashes[mainHash]
        const matchedFile = hashes[gLink][mainHash]
        console.log('Found match with: ', matchedFile)
        if (mainFile in matches) {
          matches[mainFile].append(matchedFile)
        } else {
          matches[mainFile] = [matchedFile]
        }
      }
    }
  }, { concurrency: 1 })
  console.log(hashes)
  console.log('Matches:', matches)
  
  // handle success
  // parse response data
  // now parse response to get the following:
  // 1. get github repo if it exists
  // 2. get all members of the projects and their devposts
  // 3. get all the projects of those members

  return res.successJson({ page: data.data })
  // 2. get all members of the projects and their devposts
  // 3. get all the projects of those members
  // hi ji hwan
  // hi adi. Will is coding very well
  // Yes.
  
  return res.successJson({ page: data.data })
}))

module.exports = router
