/**
 * A module to extend default Express Response objects for JSON APIs.
 * Adds the successJson, errorJson, failMsg, failJson, and errorMsg functions.
 */

'use strict'

module.exports.extendResponse = function extendResponse (response) {
  response.successJson = function successJson (data = {}) {
    return this.json({
      status: 'success',
      data
    })
  }

  response.errorJson = function errorJson (err) {
    console.error(err)
    return this.json({
      status: 'error',
      error: err.message || err
    })
  }

  response.failMsg = function failMsg (msg) {
    return this.json({
      status: 'fail',
      message: msg
    })
  }

  response.failJson = function failJson (failInfo) {
    return this.json({
      status: 'fail',
      data: failInfo
    })
  }

  response.errorMsg = function errorMsg (msg) {
    return this.json({
      status: 'error',
      message: msg
    })
  }
}
