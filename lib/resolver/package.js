var path = require('path');

module.exports = Package;

function Package(name, requireFn) {
    this.requireFn = requireFn;

    this.path = path.join.bind(null, name);
};

Package.prototype.json = function packageJSON() {
    return this.requireFn(this.path('package.json'));
};

Package.prototype.resolve = function resolve(path) {
    return this.requireFn.resolve(this.path(path));
};

Package.prototype.safeResolve = function safeResolve(potentiallyNonExistentPath) {
    return path.join(this.dir(), potentiallyNonExistentPath);
};

Package.prototype.dir = function dir() {
    return path.dirname(this.resolve('package.json'));
};

Package.prototype.entrypoint = function entrypoint() {
    var packageJson = this.json();

    if (packageJson.sass) {
        return packageJson.sass;
    // look for "style" declaration in package.json
    } else if (packageJson.style) {
        return packageJson.style;
    // look for a css/sass/scss file in the "main" declaration in package.json
    } else if (/\.(sa|c|sc)ss$/.test(packageJson.main)) {
        return packageJson.main;
    // otherwise assume ./styles.scss
    } else {
        return 'styles';
    }
};

Package.prototype.resolveEntrypoint = function resolveEntrypoint() {
    return this.safeResolve(this.entrypoint());
};
