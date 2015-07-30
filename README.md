# npm sass

Compile sass files with installed node modules automatically included in the the includePaths.

Because of the way npm installs modules in a nested tree structure, there is no reliable way to ensure the location of locally installed dependencies. In particular - modules are not necessarily installed into ./node_modules. This causes trouble when trying to use npm dependencies in sass files where `--includePath ./node_modules` can fail unexpectedly if a dependency is shared with an ancestor (and so installed further up the tree).

This module will automatically allow access to all locally installed npm modules, irrespective of their install location.

## Install

```
npm install npm-sass [-g]
```

## Usage

From the command line:

```
npm-sass ./assets/styles/app.scss > ./public/css/output.css
```

Programmatically:

```javascript
require('npm-sass')('./assets/sass/app.scss', function (err, result) {
    ...
});
```
