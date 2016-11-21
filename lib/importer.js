var findup = require('findup'),
    path = require('path');

var local = require('./local');
var resolve = require('./resolver')();

function importer(url, file, done) {
    local(url, file, function (err, isLocal) {
        if (err || isLocal) {
            done({ file: url });
        } else {
            done({ file: resolve(url) });
        }
    });
}

module.exports = importer;
