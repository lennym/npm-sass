# npm sass

Compile sass files with installed node modules automatically included in the the includePaths.

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
