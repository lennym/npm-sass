var Package = require('./resolver/package');
var Import = require('./resolver/import');

exports.Resolver = function Resolver(requireFn) {
    /* Facilitate testing by allowing requireFn to be specified */
    requireFn = (requireFn || require) ;

    return function resolve(sassImportPath) {
        var _import = new Import(sassImportPath);
        var _package = new Package(_import.packageName(), requireFn);

        if (_import.isEntrypoint()) {
            return _package.resolveEntrypoint();
        } else {
            return _package.safeResolve(_import.specifiedFilePath());
        }
    }
}

