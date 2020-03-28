'use strict'

const config = require('config')
const express = require('express')
const { ErrorHandler } = require('./lib/errorHandlers')

require('./lib/extendExpress').extendResponse(express.response)
const indexRoute = require('./routes/index')

const app = express()
app.use(indexRoute)
// Uncomment this out if you want to have a directory for static assets
// app.use(express.static('public'))
app.use(ErrorHandler)

const port = process.env.PORT || config.get('site.port')
app.listen(port, () => {
  console.log(`Listening on port #${port}`)
})
