const path = require('path');
const child = require('child_process').spawn;
var executablePath = 'open /Applications/ProxyVorlon.app';
var parameters = [];// ["--incognito"];

// const id = child(executablePath, parameters, {}, function(err, data) {
//   console.log(err)
//   console.log(data.toString());
// });


const spawn = require('child_process').spawn;
const ls = spawn('open', ['/Applications/ProxyVorlon.app', '-nW']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});