var findup = require('findup'),
    path = require('path');

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
            // look for styles declaration in package.json
            if (json.styles) {
                location = json.styles;
            // otherwise assume ./styles.scss
            } else {
                location = './styles';
            }
        // if a full path is provided
        } else {
            location = path.join('../', file);
        }
        callback(path.resolve(root, location));
    });
}

function importer(url, file, done) {
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

module.exports = importer;

