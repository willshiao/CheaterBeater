'use strict'

const router = require('express').Router()

const bodyParser = require('body-parser')
router.use(bodyParser.json())

const cheerio = require('cheerio')
const axios = require('axios')
const { AsyncHandler } = require('../lib/errorHandlers.js') 
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
  console.log("Hi Ji Hwan", $)
  const firstGithubLink = $('span:contains("github.com")').parent().attr('href')
  // In case the last one doesn't work
  const altGithubLink = $('span:contains("GitHub Repo")').parent().attr('href')
  let githubLink = firstGithubLink || altGithubLink
  console.log('Link:', githubLink)

  githubLink = githubLink + ".git"
  // clone repo 


  // get the rest of this user's projects



    
    // handle success
    // parse response data
    // now parse response to get the following:
    // 1. get github repo if it exists
    // 2. get all members of the projects and their devposts
    // 3. get all the projects of those members


  return res.successJson({"page":data.data})

}))

module.exports = router
