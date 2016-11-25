var assert = require('assert');
var path = require('path');

var resolve = require('../../lib/resolver');

var fixturePath = path.resolve.bind(
  null,
  __dirname,
  '..',
  'fixtures',
  /* Re-use package-test fixutres */
  'package-test'
);

describe('resolver', function () {
  describe('entrypoint import', function () {
    it('resolves the entrypoint path', function (done) {
      resolve('test-package', fixturePath('index.scss'), function (err, result) {
        assert.equal(result, fixturePath('node_modules', 'test-package', 'test-package-entrypoint.scss'));
        done();
      });
    });
  });

  describe('non entrypoint import', function () {
    it('resolves the correct path', function (done) {
      var importPath = path.join('test-package', 'specific-file-in-package');
      resolve(importPath, fixturePath('index.scss'), function (err, result) {
        assert.equal(result, fixturePath('node_modules', 'test-package', 'specific-file-in-package'));
        done();
      });
    });
  });
});
