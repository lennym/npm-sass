var Package = require('./resolver/package');
var Import = require('./resolver/import');

module.exports = function resolve(importUrl, refPath) {
    var _import = new Import(importUrl);
    var _package = new Package(_import.packageName(), refPath);

    if (_import.isEntrypoint()) {
        return _package.fullPathToEntrypoint();
    } else {
        return _package.root(_import.specifiedFilePath());
    }
}
