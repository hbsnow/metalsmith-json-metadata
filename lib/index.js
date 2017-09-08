'use strict'

const path = require('path')
const util = require('util')
const loadJsonFile = require('load-json-file')

const debuglog = util.debuglog('metalsmith-json-metadata')

const defaults = {
  except: true
}

module.exports = (opts) => {
  const options = Object.assign({}, defaults, opts)

  return (files, metalsmith, done) => {
    setImmediate(done)

    Object.keys(files).forEach((file) => {
      debuglog('process file: %s', file)
      if (path.extname(file) === '.json') {
        if (options.except) delete files[file]

        return
      }

      const metadata = files[file]

      if (!metadata.hasOwnProperty('jsonMetadata')) {
        return
      }

      const basePath = path.dirname(file)
      const jsonFiles = Array.isArray(metadata['jsonMetadata'])
        ? metadata['jsonMetadata']
        : Array.of(metadata['jsonMetadata'])

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
