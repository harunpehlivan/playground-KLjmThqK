const pkg = require('./package.json');
const fs = require('fs')


fs.readFile(pkg.demoOne, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
