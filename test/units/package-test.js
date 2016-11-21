var Package = require('../../lib/resolver/package');
var sinon = require('sinon');
var assert = require('assert');

describe('Package', function () {
  var subject;

  describe('#json', function () {
    it('returns the package.json file for the package', function () {
      var requireStub = sinon.stub();
      var result;

      requireStub.withArgs('test-package/package.json')
        .returns('the package.json object');

      subject = new Package('test-package', requireStub);

      result = subject.json();

      assert(requireStub.calledWith('test-package/package.json'));
      assert.equal(result, 'the package.json object');
    });
  });

  describe('#resolve', function () {
    it('resolves a path that is local to the package', function () {
      var requireMock = {
        resolve: sinon.stub()
      };

      requireMock.resolve.withArgs('test-package/given-path').returns('npm resolved path');

      var subject = new Package('test-package', requireMock);

      var result = subject.resolve('given-path');

      assert.equal(result, 'npm resolved path');
      assert(requireMock.resolve.calledWith('test-package/given-path'));
    });
  });

  describe('#safeResolve', function () {
    it('resolves a path that is local to the package (but does not error out if it cannot find it)', function () {
      var requireMock = {
        resolve: sinon.stub()
      };

      requireMock.resolve.withArgs('test-package/package.json').returns('/a/b/c/test-package/package.json');

      var subject = new Package('test-package', requireMock);

      var result = subject.safeResolve('given-path');

      assert.equal(result, '/a/b/c/test-package/given-path');
    });
  });

  describe('#dir', function () {
    it('returns the directory of the package', function () {
      var requireMock = {
        resolve: sinon.stub()
      };

      requireMock.resolve.withArgs('test-package/package.json').returns('/a/b/c/test-package/package.json');

      var subject = new Package('test-package', requireMock);

      var result = subject.dir();

      assert.equal(result, '/a/b/c/test-package');
    });
  });

  describe('#entrypoint', function () {
    var requireStub

    beforeEach(function () {
      requireStub = sinon.stub();
      requireStub.withArgs('test-package/package.json');
    });

    describe('sass', function () {
      it('returns the entrypoint file', function () {
        requireStub.returns({ sass: 'package-entrypoint' });

        var subject = new Package('test-package', requireStub);

        var result = subject.entrypoint();

        assert.equal(result, 'package-entrypoint');
      });
    });

    describe('style', function () {
      it('returns the entrypoint file', function () {
        requireStub.returns({ sass: null, style: 'package-entrypoint' });

        var subject = new Package('test-package', requireStub);

        var result = subject.entrypoint();

        assert.equal(result, 'package-entrypoint');
      });
    });

    describe('main', function () {
      it('works with scss', function () {
        requireStub.returns({ sass: null, style: null, main: 'index.scss' });

        var subject = new Package('test-package', requireStub);

        var result = subject.entrypoint();

        assert.equal(result, 'index.scss');
      });

      it('works with css', function () {
        requireStub.returns({ sass: null, style: null, main: 'index.css' });

        var subject = new Package('test-package', requireStub);

        var result = subject.entrypoint();

        assert.equal(result, 'index.css');
      });

      it('works with sass', function () {
        requireStub.returns({ sass: null, style: null, main: 'index.sass' });

        var subject = new Package('test-package', requireStub);

        var result = subject.entrypoint();

        assert.equal(result, 'index.sass');
      });
    });

    describe('not specified', function () {
      it('falls back to styles', function () {
        requireStub.returns({ sass: null, style: null, main: null });

        var subject = new Package('test-package', requireStub);

        var result = subject.entrypoint();

        assert.equal(result, 'styles');
      });
    });
  });
});
