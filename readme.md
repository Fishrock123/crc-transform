# CRC Transform (BOB)

A [Cyclic Redundancy Check](https://en.wikipedia.org/wiki/Cyclic_redundancy_check) Transform for the [BOB](https://github.com/Fishrock123/bob) streaming protocol.

## Usage

```js
const CRC = require('crc-transform')
new CRC(Buffer.alloc(size))
```

Implements a [BOB transform](https://github.com/Fishrock123/bob/blob/master/reference-buffered-transform.js) which uses the [crc](https://www.npmjs.com/package/crc) library to compute a 32-bit crc.

### Example

```js
const CRC = require('crc-transform')

const {
  Stream,
  StdoutSink
} = require('bob-streams')
const FileSource = require('fs-source')

const source = new FileSource(process.argv[2])
const sink = new StdoutSink('hex')

const stream = new Stream(
  source,
  new CRC(Buffer.alloc(64 * 1024)),
  sink
)
stream.start(error => {
  if (error) {
    console.error('Stream error ->', error)
  }
})
```

See [test-basic](test/test-basic) for a good working example.

## License

[MIT Licensed](license) — _[Contributions via DCO 1.1](contributing.md#developers-certificate-of-origin)_
