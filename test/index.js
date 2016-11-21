'use strict';

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const sass = require('../');
const css = require('css');

const root = path.resolve(__dirname, './test-cases');
const cases = fs.readdirSync(root);

before((done) => {
  cp.exec('npm install', { cwd: path.resolve(__dirname, 'fixtures') }, (err) => {
    done(err);
  });
});

cases.forEach((test) => {
  describe(test, () => {
    it('can compile from code without error', (done) => {
      sass(path.resolve(root, test, './index.scss'), (err, output) => {
        css.parse(output.css.toString());
        done(err);
      });
    });

    it('can compile from cli without error', (done) => {
      cp.exec(path.resolve(__dirname, '../bin/npm-sass') + ' index.scss', {
        cwd: path.resolve(root, test)
      }, (err, stdout) => {
        css.parse(stdout);
        done(err);
      });
    });

    try {// to load test cases from within test case
      assertions = require(path.resolve(root, test, './test'));
    } catch (e) {}
  });
});
