var sass = require('node-sass');

module.exports = function (src, callback) {

    var paths;

    if (require.main === module) {
        paths = module.paths;
    } else {
        paths = require.main.paths;
    }

    sass.render({
        file: src,
        includePaths: paths
    }, callback);

};