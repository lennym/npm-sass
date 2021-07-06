var local = require('./local');
var resolve = require('./resolver');

function importer(url, file, done) {
    local(url, file, function (err, isLocal) {
        if (err || isLocal) {
            done({ file: url });
        } else {
            resolve(url, file)
            .catch(function () { return url; })
            .then(function (path) {
                path = path.replace(/\.css$/, '');
                return { file: path };
            })
            .then(done);
        }
    });
}

module.exports = importer;
