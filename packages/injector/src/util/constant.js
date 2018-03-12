const path = require('path');
const defaultPath = path.join(__dirname, '..', '..', 'package.json');
const { workingRoot } = process.env;
const { anyproxy: defaultAnyproxyConfig } = require(defaultPath);
const fs = require('fs');

let anyproxyConfig = {}
if (workingRoot) {
  const pkgPath = path.join(workingRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const packageConfig = require(pkgPath);
    anyproxyConfig = packageConfig.anyproxy;
  }
}

anyproxyConfig = Object.assign({}, defaultAnyproxyConfig, anyproxyConfig); 
if (!anyproxyConfig) {
  anyproxyConfig = defaultAnyproxyConfig;
}

console.log(anyproxyConfig);
exports.anyproxyConfig = anyproxyConfig;