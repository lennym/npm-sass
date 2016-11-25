var path = require('path');
var findup = require('findup');

/**
 * @param {string} importOriginPath Path of file that made @import reference
 */
module.exports = function nearestPackageRoot(importOriginPath, packageName) {
    var pathToFind = path.join('node_modules', packageName, 'package.json');
    var nearestPackageParent = findup.sync(path.dirname(importOriginPath), pathToFind);
    var packageJSONLocation = path.join(
        nearestPackageParent,
        'node_modules',
        packageName
    );

    return packageJSONLocation;
};
