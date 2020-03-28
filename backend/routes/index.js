'use strict'

const router = require('express').Router()

const Promise = require('bluebird')
const bodyParser = require('body-parser')
router.use(bodyParser.json())

const cheerio = require('cheerio')
const axios = require('axios')
const { AsyncHandler } = require('../lib/errorHandlers.js') 

function union(setA, setB) {
  let _union = new Set(setA)
  for (let elem of setB) {
      _union.add(elem)
  }
  return _union
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
  //console.log("Hi Ji Hwan", $)
  const firstGithubLink = $('span:contains("github.com")').parent().attr('href')
  // In case the last one doesn't work
  const altGithubLink = $('span:contains("GitHub Repo")').parent().attr('href')
  let githubLink = firstGithubLink || altGithubLink
  console.log('Link:', githubLink)

  githubLink = githubLink + ".git"
  
  const teamMembers = new Set(Array.from($('#app-team .user-profile-link'))
    .map(el => $(el).attr('href')))
  console.log('hi')
  console.log(teamMembers)


  const connectedProjects = [] // github link of all connected projects
  // get the rest of this user's projects

  const userPages = await Promise.map(Array.from(teamMembers), async link => {
    return (await axios.get(link)).data
  }, {concurrency: 3})

  // get devpost of each project except original link
  var i;
  for(i=0; i < userPages.length; i++){
    const userPage = userPages[i]
    const $ = cheerio.load(userPage)
    const userProjects = new Set(Array.from($('#software-entries .link-to-software'))
    .map(el => $(el).attr('href')))
  

    //console.log($('#software-entries .link-to-software').attr('href'))
    // const userProjects = new Set(Array.from($('#software-entries'))
    // .map(el => $(el).attr('href')))
    userProjects.delete(link)
    //console.log(userProjects)
    connectedProjects.push(userProjects)

    //console.log(userPage)

    
  }
  // get github links for those projects
  console.log(connectedProjects)
  const uniqueProjs = connectedProjects.reduce((acc, cur) => union(acc, cur))
  console.log( uniqueProjs)
  
    // teammembers. for each
    // as long as new link != link
    //inside each member's devpost profie, loop through the list of projects and obtain its github link
  // const githubList = []
  const githubAllProjectLinks = []


  const  githubList = await Promise.map(Array.from(uniqueProjs), async link => {
    return (await axios.get(link)).data
  }, {concurrency: 3})

  githubList.forEach( (element) =>{

    const $ = cheerio.load(element)
    //console.log("Hi Ji Hwan", $)
    const firstGithubLink = $('span:contains("github.com")').parent().attr('href')
    // In case the last one doesn't work
    const altGithubLink = $('span:contains("GitHub Repo")').parent().attr('href')
    let githubLink = firstGithubLink || altGithubLink
    console.log('Link:', githubLink)
    githubAllProjectLinks.push(githubLink)
    
  })


  
  console.log(githubAllProjectLinks)
  const filteredGittyLinks = githubAllProjectLinks.filter(el => el !== undefined)
  filteredGittyLinks.push(link)
  console.log(filteredGittyLinks)
  
  
    // handle success
    // parse response data
    // now parse response to get the following:
    // 1. get github repo if it exists
    // 2. get all members of the projects and their devposts
    // 3. get all the projects of those members


  return res.successJson({"page":data.data})

}))

module.exports = router
