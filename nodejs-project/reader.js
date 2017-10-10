fs = require('fs')
fs.readFile('./dist/how-long-till-lunch.esm.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});