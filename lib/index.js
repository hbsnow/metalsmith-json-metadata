'use strict'

const path = require('path')
const util = require('util')
const loadJsonFile = require('load-json-file')

const debuglog = util.debuglog('metalsmith-json-metadata')

module.exports = (opts) => {
  const options = Object.assign({}, opts)

  return (files, metalsmith, done) => {
    setImmediate(done)

    Object.keys(files).forEach((file) => {
      debuglog('process file: %s', file)
      if (path.extname(file) === '.json') {
        return
      }

      const metadata = files[file]

      if (!metadata.hasOwnProperty('jsonMetadata')) {
        return
      }

      const basePath = path.dirname(file)
      const jsonFiles = Array.isArray(metadata['jsonMetadata'])
        ? metadata['jsonMetadata']
        : [metadata['jsonMetadata']]

      jsonFiles.forEach((json) => {
        const jsonPath = path.resolve(
          metalsmith.directory(),
          metalsmith.source(),
          basePath,
          json
        )
        debuglog('jsonPath: %s', jsonPath)

        const property = path.basename(json, '.json')
        files[file][property] = loadJsonFile.sync(jsonPath)
      })
    })
  }
}
