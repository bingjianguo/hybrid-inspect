/**
 * Created by bingjian on 2017/3/23.
 */
const fork = require('child_process').fork;
const util = require('util');
const color = require('colorful');
const log = require('electron-log');

const { getIPAddress, getCertificate } = require('../common');
const PORT = 5680;

const forkStartup = ({ home, bDisableLog }) => {
  process.env.HOME = home;
  const host = getIPAddress();
  let outerResolve = null;
  
  log.info('home:' + home);
  getCertificate(host,  (error, keyContent, crtContent)  => {
    const vorlonProcess = fork(require.resolve('hybrid-inspect/Server/server.js'), [], {
      silent: true,
      env: {
        PORT: PORT,
        HOST: host,
        PROXY_HOST: host,
        SSLkey: keyContent,
        SSLcert: crtContent,
      },
    });

    vorlonProcess.stdout.on('data', function(data) {
      const str = data.toString();
      if ( str.indexOf('Vorlon.js SERVER with SSL listening at') >= 0) {
        outerResolve && outerResolve(vorlonProcess);
      }
      if ( !bDisableLog ) {
        log.info(`[vorlon] ${data.toString()}`);
      }
    });

    vorlonProcess.stderr.on('data', function(data) {
      // console.log(`[vorlon error] ${data.toString().split(' ').join('\n')}`);
      log.info(data.toString());
    });

  });

  return new Promise((resolve) => {
    outerResolve = resolve;
  });

}

module.exports = {
  forkStartup: forkStartup

};

