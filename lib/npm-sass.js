var sass = require('node-sass'),
    _ = require('lodash');

module.exports = function (src, options, callback) {

    var paths, opts;

    if (arguments.length === 2 && typeof options === 'function') {
        callback = options;
        options = {};
    }

    if (require.main === module) {
        paths = module.paths;
    } else {
        paths = require.main.paths;
    }

    opts = _.extend({
        file: src,
        includePaths: paths
    }, options);

    sass.render(opts, callback);

};