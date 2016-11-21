var path = require('path');

module.exports = Import;

function Import(sassImportPath) {
    this.sassImportPath = sassImportPath;
};

Import.prototype.isScoped = function isScoped() {
    return this.sassImportPath[0] === '@';
};

Import.prototype.packageName = function packageName() {
    if (this.isScoped()) {
        return this.sassImportPath.split(path.sep, 2).join(path.sep);
    } else {
        return this.sassImportPath.split(path.sep, 1)[0];
    }
};

Import.prototype.isEntrypoint = function isEntrypoint() {
    var safePathSplitPattern = new RegExp(path.sep + '.');
    var pathSegmentCount = this.sassImportPath.split(safePathSplitPattern).length;

    if (this.isScoped()) {
        return pathSegmentCount === 2;
    } else {
        return pathSegmentCount === 1;
    }
};

Import.prototype.specifiedFilePath = function specifiedFilePath() {
    return this.sassImportPath.slice(this.packageName().length);
};
