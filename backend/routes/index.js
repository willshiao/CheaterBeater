'use strict'

const router = require('express').Router()

const Promise = require('bluebird')
const bodyParser = require('body-parser')
const cheerio = require('cheerio')
const axios = require('axios')
const cors = require('cors')

const { AsyncHandler } = require('../lib/errorHandlers.js')
const { compareWithMatches, continousMatches, getDirLanguages, findFilesWithIgnore, file2Lang, concatByLanguage } = require('../lib/extensionHelper.js')
const { cloneRepo, getHashes, repoPathToLink } = require('../lib/repoHandler.js')

router.use(bodyParser.json())
router.use(cors())

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
  // get project name
  const projectName = $('#app-title').text()
  console.log('project name', projectName)

  const teamMembers = new Set(Array.from($('#app-team .user-profile-link'))
    .map(el => $(el).attr('href')))
  console.log('hi')
  console.log(teamMembers)

  const connectedProjects = [] // github link of all connected projects
  // get the rest of this user's projects

  const userPages = await Promise.map(Array.from(teamMembers), async link => {
    return (await axios.get(link)).data
  }, { concurrency: 2 })

  const members = []
  const userProjectNamesAgg = []
  // get devpost of each project except original link
  for (let i = 0; i < userPages.length; i++) {
    const userPage = userPages[i]
    const $ = cheerio.load(userPage)
    const userProjects = new Set(Array.from($('#software-entries .link-to-software'))
      .map(el => $(el).attr('href')))

    const userProjectNames = new Set(Array.from($('.software-entry-name.entry-body > h5'))
      .map(el => $(el).text().trim()))
    // console.log("oh shittttt", userProjectNames)
    userProjectNamesAgg.push(userProjectNames)

    const member = $('#portfolio-user-name').text().trim().split('\n')[0];

    // console.log("Hewwo", member)
    members.push(member)
    // console.log($('#software-entries .link-to-software').attr('href'))
    // const userProjects = new Set(Array.from($('#software-entries'))
    // .map(el => $(el).attr('href')))
    userProjects.delete(link)
    // console.log(userProjects)
    connectedProjects.push(userProjects)
    // console.log(userPage)

    // num files copied
    // line matches

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
  const path2Link = {}
  let mainRepoLocation = null // location of our target repo
  const repoLocations = (await Promise
    .map(filteredGittyLinks, async (gLink) => {
      const repoLocation = await cloneRepo(gLink)
      if (gLink === githubLink) {
        mainRepoLocation = repoLocation
      }
      path2Link[repoLocation] = gLink
      return [gLink, repoLocation]
    }, { concurrency: 1 }))
    .filter(x => x[1])

  const dirLanguages = {}
  const lang2Repo = {}
  await Promise.map(repoLocations, async (pair) => {
    // console.log(pair)
    const langs = await getDirLanguages(pair[1])
    langs.forEach(lang => {
      if (lang in lang2Repo) {
        lang2Repo[lang].push(pair[1])
      } else {
        lang2Repo[lang] = [pair[1]]
      }
    })
    dirLanguages[pair[0]] = langs
  }, { concurrency: 1 })
  console.log(dirLanguages)

  const hashes = {}
  const mainHashes = await getHashes(mainRepoLocation)
  const matches = {}
  await Promise.map(repoLocations, async ([gLink, repoDir]) => {
    if (gLink === githubLink) return null
    hashes[gLink] = await getHashes(repoDir)
    for (const mainHash in mainHashes) {
      if (mainHash in hashes[gLink]) {
        const mainFile = mainHashes[mainHash]
        const matchedFile = hashes[gLink][mainHash]
        console.log('Found match with: ', matchedFile)
        // Same file
        if (mainFile === matchedFile) continue
        if (mainFile in matches) {
          matches[mainFile].push(matchedFile)
        } else {
          matches[mainFile] = [matchedFile]
        }
      }
    }
  }, { concurrency: 1 })
  console.log(hashes)
  console.log('Matches:', matches)

  await Promise.map(repoLocations, async ([__, x]) => concatByLanguage(x), { concurrency: 1 })
  // handle success
  // parse response data
  // now parse response to get the following:
  // 1. get github repo if it exists
  // 2. get all members of the projects and their devposts
  // 3. get all the projects of those members


  // aditya -> Toor, Joyride, Profanifree 
  //   JSON Object needed by front-end
  // var data = {
  //       "team-members": [
  //          "team-member1":{
  //             "projects" : ["project1":"50%","project2":"70%","project3":"10%"]
  //          }
  //          "team-member2":{
  //             "projects" : ["project1":"50%","project2":"70%","project3":"10%"]
  //          }
  //       ]
  //    }
  const teamMemberList = []
  for (let i = 0; i < members.length; ++i) {
    teamMemberList.push({
      name: members[i],
      projects: Array.from(userProjectNamesAgg[i])
    })
  }
  console.log(teamMemberList)
  console.log('project name', projectName)

  const overallOutput = []
  let totalChecked = 0
  let totalSame = 0
  let totalFilesChecked = 0
  await findFilesWithIgnore(mainRepoLocation, async (filename) => {
    const langName = file2Lang(filename)
    if (langName === null) return null
    totalFilesChecked++
    const repos = lang2Repo[langName]
    const { matches, linesChecked } = await compareWithMatches(filename, mainRepoLocation, repos, langName, path2Link)
    const { blocks, linesSame } = continousMatches(matches)
    totalChecked += linesChecked
    totalSame += linesSame

    const code = blocks.filter(b => {
      return b.blockLines > 3 // ignore single-line copies
    })
    if (code.length === 0) return null
    overallOutput.push({
      code,
      filePath: repoPathToLink(githubLink, filename),
      language: langName,
      linesChecked,
      linesSame
    })
    // console.log('Cont:', continousMatches(output))
    // console.log('Output:', output)
  }, true)
  const totalStats = { totalChecked, totalSame, totalFilesChecked }

  return res.successJson({
    teamMembers: teamMemberList,
    matches,
    projectName,
    partialMatches: overallOutput,
    totalStats
  })
  // 2. get all members of the projects and their devposts
  // 3. get all the projects of those members
  // hi ji hwan
  // hi adi. Will is coding very well
  // Yes.
  // "There are {} files that are the exact same with previous repos. Keep in mind that many of these may be library files and are not necessarily indicative of cheating"
  // "There are {} files that are similar with previous repos. Some of the snippets we found include {} {} {}"

}))
// }))
// }))
// }))


























module.exports = router
