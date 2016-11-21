var assert = require('assert');
var path = require('path');

var resolver = require('../../lib/resolver');

describe('resolver', function () {
  var fakeRequire = function (_sassImportPath) {
    // Simulate package.json
    return { sass: 'index.scss' };
  };

  fakeRequire.resolve = function (sassImportPath) {
    return path.join('a', 'b', 'c', sassImportPath);
  };

  describe('entrypoint import', function () {
    it('resolves the entrypoint path', function () {
      var resolve = resolver(fakeRequire);

      var result = resolve('package-name');

      assert.equal(path.join('a', 'b', 'c', 'package-name', 'index.scss'), result);
    });
  });

  describe('non entrypoint import', function () {
    it('resolves the correct path', function () {
      var resolve = resolver(fakeRequire);

      var result = resolve(path.join('package-name', 'specific-file-in-package'));

      assert.equal(path.join('a', 'b', 'c', 'package-name', 'specific-file-in-package'), result);
    });
  })
});
