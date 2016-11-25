var Package = require('./resolver/package');
var Import = require('./resolver/import');
var nearestPackageRoot = require('./resolver/nearest-package-root');

module.exports = function resolve(importUrl, referencePath, callback) {
    var _import = new Import(importUrl);

    Package.find(_import.packageName(), referencePath, function (err, _package) {
      if(err) {
          callback(err);
          return;
      }

      var pathToImporterFile;

      if (_import.isEntrypoint()) {
          pathToImporterFile = _package.fullPathToEntrypoint();
      } else {
          pathToImporterFile = _package.root(_import.specifiedFilePath());
      }

      callback(null, pathToImporterFile);
    });
}
