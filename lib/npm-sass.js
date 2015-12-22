var sass = require('node-sass'),
    findup = require('findup'),
    path = require('path'),
    fs = require('fs'),
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
        includePaths: paths,
        importer: function (url, file, done) {
            var mod = url.split('/')[0];
            try {
                require.resolve(mod);
                done({
                    file: url
                });
            } catch (e) {
                // handle case where file is not a local dependency
                // findup from the file doing the import to the package.json
                // then check the ./node_modules there
                findup(file, 'package.json', function (err, dir) {
                    var npmpath = path.resolve(dir, './node_modules', './' + url);
                    fs.stat(path.dirname(npmpath), function (err, stat) {
                        if (err || !stat) {
                            done({
                                file: url
                            });
                        } else {
                            done({
                                file: npmpath
                            });
                        }
                    });

                });
            }
        }
    }, options);

    sass.render(opts, callback);

};