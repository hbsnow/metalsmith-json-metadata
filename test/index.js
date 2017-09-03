var assert = require('assert')
var path = require('path')
var Metalsmith = require('metalsmith')
var jsonMetadata = require('..')


describe('metalsmith-json-metadata', function () {
  it('メタデータからjsonのデータを追加する', function (done) {
    var metalsmith = Metalsmith('test/fixtures/basic')
    metalsmith
      .use(jsonMetadata())
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 2)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'index':
              assert.deepEqual(files[file].data, { one: 'test' })
              break
          }
        })
        done()
      })
  })

  it('すべてのファイルのメタデータにjsonのデータを追加する', function (done) {
    var metalsmith = Metalsmith('test/fixtures/files')
    metalsmith
      .use(jsonMetadata({
        files: 'data.json'
      }))
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 3)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'one':
              assert.deepEqual(files[file].data, { one: 'test' })
              break
            case 'two':
              assert.deepEqual(files[file].hasOwnProperty('data'), false)
              break
          }
        })
        done()
      })
  })

  it('jsonのデータを複数追加する', function (done) {
    var metalsmith = Metalsmith('test/fixtures/multi')
    metalsmith
      .use(jsonMetadata({
        files: 'three.json'
      }))
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 4)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'index':
              assert.deepEqual(files[file].one, { one: 'test' })
              assert.deepEqual(files[file].two, { two: 'test' })
              assert.deepEqual(files[file].three, { three: 'test' })
              break
          }
        })
        done()
      })
  })

  it('親ディレクトリにあるjsonのデータを追加する', function (done) {
    var metalsmith = Metalsmith('test/fixtures/parents')
    metalsmith
      .use(jsonMetadata())
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 2)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'index':
              assert.deepEqual(files[file].data, { one: 'test' })
              break
          }
        })
        done()
      })
  })
})
