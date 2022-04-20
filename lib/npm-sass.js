var sass = require('sass');

var importerFunction = require('./importer');

var npmsass = function (src, options, callback) {

    var opts;

    if (arguments.length === 2 && typeof options === 'function') {
        callback = options;
        options = {};
    }

    function importer(url, file, done) {
      if (options.aliases && options.aliases[url]) {
          url = options.aliases[url];
      }
      return importerFunction(url, file, done);
    }

    opts = Object.assign({
        file: src,
        importer
    }, options);

    sass.render(opts, callback);

};

npmsass.importer = importerFunction;

module.exports = npmsass;
