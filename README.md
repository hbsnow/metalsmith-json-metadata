# metalsmith-json-metadata

[![Build Status](https://travis-ci.org/hbsnow/metalsmith-json-metadata.svg?branch=master)](https://travis-ci.org/hbsnow/metalsmith-json-metadata)

Metalsmith plugin that add metadata by jsonfile.


## Install

```
npm install metalsmith-json-metadata
```

## Usage

### `build.js`

```
var Metalsmith = require('metalsmith')
var jsonMetadata = require('metalsmith-json-metadata')

Metalsmith(__dirname)
  .use(jsonMetadata())
  .build()
```

### `index.html`

```
---
jsonMetadata: ['data.json']
---
<p>Hello, world!</p>
```

## Options

| name      | description           | default        |
|-----------|-----------------------|----------------|
| `files`   | all files load        | `[]`           |
| `keyname` | front-matter key name | `jsonMetadata` |

## License

MIT
