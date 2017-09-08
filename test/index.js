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
          assert.deepEqual(files[file].data, { data: 'test' })
        })
        done()
      })
  })

  it('jsonのデータを複数追加する', function (done) {
    var metalsmith = Metalsmith('test/fixtures/multi')
    metalsmith
      .use(jsonMetadata())
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 1)
        keys.forEach(function (file) {
          assert.deepEqual(files[file].one, { one: 'test' })
          assert.deepEqual(files[file].two, { two: 'test' })
          assert.deepEqual(files[file].three, { three: 'test' })
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
        assert.equal(keys.length, 1)
        keys.forEach(function (file) {
          assert.deepEqual(files[file].data, { one: 'test' })
        })
        done()
      })
  })

  it('使用したjsonのデータをノードから除外しない', function (done) {
    var metalsmith = Metalsmith('test/fixtures/no-except')
    metalsmith
      .use(jsonMetadata({
        except: false
      }))
      .build(function (err, files) {
        if (err) return done(err)

        const keys = Object.keys(files)
        assert.equal(keys.length, 3)
        keys.forEach(function (file) {
          switch (files[file].title) {
            case 'no-except':
              assert.deepEqual(files[file].one, { one: 'test' })
              break
          }
        })
        done()
      })
  })
})
