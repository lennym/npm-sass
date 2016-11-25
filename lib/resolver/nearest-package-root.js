var path = require('path');
var findup = require('findup');

/**
 * @param {string} importOriginPath Path of file that made @import reference
 */
module.exports = function nearestPackageRoot(packageName, importOriginPath, callback) {
    var pathToFind = path.join('node_modules', packageName, 'package.json');

    findup(path.dirname(importOriginPath), pathToFind, function (err, nearestPackageParent) {
      if(err) {
        callback(err);
      }

      var packageJSONLocation = path.join(
          nearestPackageParent,
          'node_modules',
          packageName
      );

      callback(null, packageJSONLocation);
    });
};
