var sass = require('node-sass'),
    _ = require('lodash');

var importer = require('./importer')

var npmsass = function (src, options, callback) {

    var opts;

    if (arguments.length === 2 && typeof options === 'function') {
        callback = options;
        options = {};
    }

    opts = _.extend({
        file: src,
        importer: importer
    }, options);

    sass.render(opts, callback);

};

npmsass.importer = importer;

module.exports = npmsass;
