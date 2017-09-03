'use strict'

const path = require('path')
const util = require('util')
const fs = require('fs')
const loadJsonFile = require('load-json-file')

const debuglog = util.debuglog('metalsmith-json-metadata')
const defaults = {
  files: [],
  keyname: 'jsonMetadata'
}

function toArray(val) {
  if (!val) return []

  return Array.isArray(val) ? val : [val]
}

module.exports = (opts) => {
  const options = Object.assign({}, defaults, opts)

  return (files, metalsmith, done) => {
    setImmediate(done)

    Object.keys(files).forEach((file) => {
      if (path.extname(file) === '.json') {
        return
      }
      debuglog('process file: %s', file)

      let jsonFiles = [].concat(
        toArray(options.files),
        toArray(files[file][options.keyname])
      )
      jsonFiles = Array.from(new Set(jsonFiles))

      const basePath = path.dirname(file)

      jsonFiles.forEach((json) => {
        const jsonPath = path.resolve(
          metalsmith.directory(),
          metalsmith.source(),
          basePath,
          json
        )
        debuglog('jsonPath: %s', jsonPath)

        const result = loadJsonFile.sync(jsonPath)

        if (result) {
          const property = path.basename(json, '.json')
          files[file][property] = result
        }
      })
    })
  }
}
