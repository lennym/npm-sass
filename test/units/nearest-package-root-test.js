var nearestPackageRoot = require('../../lib/resolver/nearest-package-root');
var assert = require('assert');
var path = require('path');

var fixturesPath = path.resolve.bind(null,
  __dirname,
  '..',
  'fixtures',
  'nearest-modules-root-fixtures'
)

describe('nearestPackageRoot', function () {
  it('finds the nearest module folder based on the import origin', function () {
    var result = nearestPackageRoot(fixturesPath('index.scss'), 'test-module');

    assert.equal(result, fixturesPath('node_modules', 'test-module'));

    var result2 = nearestPackageRoot(fixturesPath('node_modules', 'test-module', 'index.scss'), 'nested-module');

    assert.equal(result2, fixturesPath('node_modules', 'test-module', 'node_modules', 'nested-module'));
  });
});
