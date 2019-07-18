'use strict'

const tap = require('tap')

const {
  AssertionSink,
  AssertionSource,
  Stream
} = require('bob-streams')

const CRC = require('../')

tap.test('test file read', t => {
  t.plan(1)
  const source = new AssertionSource([
    'Chunk 1\n',
    'Chunk 2\n',
    'Chunk 3\n',
    'Chunk 4\n'
  ])
  const sink = new AssertionSink([
    Buffer.from((0xb52161e7).toString(16), 'hex')
  ])

  const stream = new Stream(source, new CRC(Buffer.alloc(8)), sink)
  stream.start(error => {
    t.error(error, 'Exit Callback received unexpected error')
    t.end()
  })
})
