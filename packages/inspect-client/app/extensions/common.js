
function getIPAddress(){
  const interfaces = require('os').networkInterfaces();
  const keys = Object.keys(interfaces);

  for(let iIndex = 0; iIndex < keys.length; iIndex++) {
    const iface = interfaces[keys[iIndex]];
    for(let i=0; i < iface.length; i++) {
      var alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
  return '127.0.0.1';
}

const path = require('path');
const homeDir = require('homedir');
const EasyCert = require('./cert/index');
const { ensureDir } = require('fs-extra');
const exec = require('child_process').exec;
const rootDirPath = path.join(homeDir(), '.anyproxy', 'certificates');
ensureDir(rootDirPath);

const options = {
  rootDirPath,
  defaultCertAttrs: [
    { name: 'countryName', value: 'CN' },
    { name: 'organizationName', value: 'AnyProxy' },
    { shortName: 'ST', value: 'SH' },
    { shortName: 'OU', value: 'AnyProxy SSL Proxy' }
  ]
};


function openFolderOfFile(filePath) {
  const isWin = /^win/.test(process.platform);
  if (isWin) {
    exec('start .', { cwd: path.dirname(filePath) });
  } else {
    exec(`open -R ${filePath}`);
  }
}



function generateRootCA( cb ) {
  const easyCert = new EasyCert(options);

  easyCert.generateRootCA({
    commonName: 'AnyProxy',
    overwrite: true,
  }, (error, keyPath, crtPath) => {
    if (!error) {
      const certDir = path.dirname(keyPath);
      openFolderOfFile(crtPath);
      cb && cb();
      console.log(`The cert is generated at ${certDir}. Please trust the rootCA.crt.`);
      // TODO: console.log('guide to install');
    } else {
      console.error('failed to generate rootCA', error);
    }
  });
}

function getCertificate(host,  cb ) {
  const easyCert = new EasyCert(options);
  easyCert.getCertificate(host, (error, keyContent, crtContent) => {
    cb(error, keyContent, crtContent);
  })
}

module.exports = {
  getIPAddress,
  generateRootCA,
  getCertificate,
};
