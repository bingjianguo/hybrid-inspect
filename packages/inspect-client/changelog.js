var fs = require('fs');
var conventionalChangelog = require('conventional-changelog');
const writeStream = fs.createWriteStream('./CHANGELOG.md');

conventionalChangelog({
  preset: 'angular'
}).pipe(writeStream); // or any writable stream
