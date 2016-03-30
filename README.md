# browserify-css-filter

browserify transform for filtering require css expression.

## Usage

replace all css/less/sass/scss require expression with empty string.

```js
var browserify = require('browserify');
var b = browserify('./entry.js');
var filterCssRequire = require('browserify-css-filter');

b.transform(filterCssRequire)
```

besides, you can provide `condition` and `replacement` options to do custom replacements:

```js
b.transform(filterCssRequire, {
  condition: function (args) {
    return args.length > 0 && args[args.length - 1].match(/\.css$/);
  },
  replacement: function () {
    return '\'\'';
  },
})
```
