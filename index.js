'use strict'

const { Status } = require('bob-streams')

const { crc32 } = require('crc')

class CRCTransform {
  constructor (buf) {
    this.sink = null
    this.source = null

    this.crc = null
    this.buf = buf
  }

  bindSource (source) {
    source.bindSink(this)
    this.source = source

    return this
  }

  bindSink (sink) {
    this.sink = sink
  }

  next (status, error, buffer, bytes) {
    if (status === Status.error || error !== null) {
      return this.sink.next(Status.error, error)
    }

    this.crc = crc32(buffer.slice(0, bytes), this.crc)

    if (status === Status.end) {
      this.sink.next(status, error, Buffer.from(this.crc.toString(16), 'hex'), 4)
    } else {
      this.source.pull(null, this.buf)
    }
  }

  pull (error) {
    this.source.pull(error, this.buf)
  }
}

module.exports = CRCTransform
