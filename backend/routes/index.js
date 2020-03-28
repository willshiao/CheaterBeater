'use strict'

const router = require('express').Router()

router.get('/test', (req, res) => {
  res.send('OK')
})

module.exports = router
