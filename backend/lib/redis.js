'use strict'

const config = require('config')
const Promise = require('bluebird')
const redis = require('redis')
Promise.promisifyAll(redis.RedisClient.prototype)

let client
if (config.get('redisEnabled')) {
  client = redis.createClient(config.get('redisOptions'))

  client.on('error', (error) => {
    console.error(error)
  })

  client.on('connect', () => {
    console.log('Redis connected!')
  })
}

module.exports = client
