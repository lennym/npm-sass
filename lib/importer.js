var findup = require('findup'),
    path = require('path');

var local = require('./local');

function find(dir, file, callback) {
    var name = file.split('/')[0],
        modulePath = './node_modules/' + name + '/package.json';

    findup(dir, modulePath, function (err, moduleDir) {
        if (err) { return callback(err); }

        var root = path.dirname(path.resolve(moduleDir, modulePath));
        var location;
        // if import is just a module name
        if (file.split('/').length === 0) {
            var json = require(path.resolve(moduleDir, modulePath));
            // look for "style" declaration in package.json
            if (json.style) {
                location = json.style;
            // otherwise assume ./styles.scss
            } else {
                location = './styles';
            }
        // if a full path is provided
        } else {
            location = path.join('../', file);
        }
        callback(null, path.resolve(root, location));
    });
}

function importer(url, file, done) {
    local(url, file, function (err, isLocal) {
        if (err || isLocal) {
            done({
                file: url
            });
        } else {
            find(path.dirname(file), url, function (err, location) {
                if (err) {
                    done({
                        file: url
                    });
                } else {
                    done({
                        file: location
                    });
                };
            });
        }
    })
}

module.exports = importer;

