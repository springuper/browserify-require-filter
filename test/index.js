var filterCssRequireTransform = require('..')
var test = require('tap').test
var sink = require('sink-transform')
var path = require('path')
var fs = require('fs')

function fixtures() {
  return path.resolve
    .bind(path, __dirname, 'fixtures')
    .apply(null, arguments)
}

test('replace by default', function (t) {
  t.plan(1)

  var file = fixtures('css.js')
  var tr = filterCssRequireTransform(file)

  fs.createReadStream(file)
    .pipe(tr)
    .pipe(sink.str(function (body, done) {
      t.equal(body, '"";\n"";\nvar css = "";\n')
      done()
    }))
})

test('replace according to options', function (t) {
  t.plan(1)

  var file = fixtures('css.js')
  var tr = filterCssRequireTransform(file, {
    condition: function (args) {
      return args.length > 0 && args[args.length - 1].match(/\.css$/)
    },
    replacement: function () {
      return '\'\''
    },
  })

  fs.createReadStream(file)
    .pipe(tr)
    .pipe(sink.str(function (body, done) {
      t.equal(body, '\'\';\nrequire(\'path/to/\' + \'style.scss\');\nvar css = require(\'path/to/style.less\');\n')
      done()
    }))
})
