'use strict'

var transformTools = require('browserify-transform-tools')

var options = {
  jsFilesOnly: true,
  evaluateArguments: true,
}

module.exports = transformTools.makeRequireTransform(
  'filterCssRequireTransform',
  options,
  function (args, opts, cb) {
    opts.opts = opts.opts || {}
    var condition = opts.opts.condition || function (params) {
      return params.length > 0 && params[params.length - 1].match(/\.(css|less|sass|scss)$/)
    }
    if (condition(args)) {
      return cb(null, opts.opts.replacement ? opts.opts.replacement(args) : '""')
    }
    return cb()
  }
)
