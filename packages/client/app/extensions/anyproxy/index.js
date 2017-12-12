// 获取ip地址后，在启动anyproxy脚本，用来将vorlon的js注入
const { join } = require('path');
const { fork } = require('child_process');
const log = require('electron-log');
const { outputFileSync, existsSync, readFileSync, ensureDir, outputJsonSync, readJsonSync } = require('fs-extra');
const { getIPAddress } = require('../common');

const cwd = join(__dirname, '..', '..');

const anyproxyCommand = join(cwd, 'node_modules', 'anyproxy', 'bin', 'anyproxy');
const anyproxycaCommand = join(cwd, 'node_modules', 'anyproxy', 'bin', 'anyproxy-ca');

module.exports = {
  forkStartup: ({ home, bDisableLog }) => {
    const caPath = join(home, '.anyproxy', 'certificates', 'rootCA.crt');
    let outerResolve = null;
    log.info('anyproxy extension forkstartup');
    const forkAnyproxyProcess = () => {
      log.info(`anyproxy command=${anyproxyCommand}`);
      const anyproxyProcess = fork(anyproxyCommand, [
        '--rule',
        'extensions/anyproxy/inject-rule.js',
        //'-i'
      ],{
        silent: true,
        cwd,
        env: {
          HOME: home,
          IPADDRESS: getIPAddress()
        },
      });

      anyproxyProcess.stdout.on('data', function(data) {
        const str = data.toString();
        if ( !bDisableLog ) {
          // anyproxy打印信息不显示
          log.info(`${data.toString()}`);
        }
        if ( str.indexOf('Http proxy started on port') >= 0 )
          outerResolve && outerResolve(anyproxyProcess);
      });

      anyproxyProcess.stderr.on('data', function(data) {
        log.info(`error = ${data.toString()}`);
      });

      // anyproxyProcess.on('exit',  (e) => {
      //   console.log('anyproxy process exit : ' + JSON.stringify(e));
      // });

      anyproxyProcess.on('error',  (err) => {
        log.info('main process err : ' + JSON.stringify(err));
      });
    }
    if ( existsSync(caPath) ) {
      forkAnyproxyProcess();
    } else {
      const anyproxycaProcess = fork(anyproxycaCommand, [
        '-g'
      ], {
        silent: false,
        cwd,
        env: {
          HOME: home
        },
      });
      anyproxycaProcess.on('exit',  (e) => {
        forkAnyproxyProcess();
      });
    }

    return new Promise((resolve) => {
      outerResolve = resolve;
    });
  }
};
