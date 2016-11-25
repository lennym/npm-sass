var findup = require('findup'),
    path = require('path');

var local = require('./local');
var resolve = require('./resolver');

function importer(url, file, done) {
    local(url, file, function (err, isLocal) {
        if (err || isLocal) {
            done({ file: url });
        } else {
            resolve(url, file, function (err, path) {
              if(err) {
                done({ file: url });
                return;
              }

              done({ file: path });
            });
        }
    });
}

module.exports = importer;
