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
    it('resolves the entrypoint path', function () {
      var result = resolve(
        'test-package',
        fixturePath('index.scss')
      );

      assert.equal(result, fixturePath('node_modules', 'test-package', 'test-package-entrypoint.scss'));
    });
  });

  describe('non entrypoint import', function () {
    it('resolves the correct path', function () {
      var result = resolve(
        path.join('test-package', 'specific-file-in-package'),
        fixturePath('index.scss')
      );

      assert.equal(result, fixturePath('node_modules', 'test-package', 'specific-file-in-package'));
    });
  })
});
