var path = require('path');
var findup = require('findup');

/**
 * @param {string} importOriginPath Path of file that made @import reference
 */
module.exports = function nearestPackageRoot(importOriginPath, packageName) {
    var pathToFind = path.join('node_modules', packageName, 'package.json');
    var packageJSONLocation = path.join(
      findup.sync(path.dirname(importOriginPath), pathToFind),
      'node_modules',
      packageName
    );

    return packageJSONLocation;
};
