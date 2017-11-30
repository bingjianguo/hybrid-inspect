const spawn = require('pty.js').spawn;

let logger = null;
const join = require('path').join;
const tracer = require('tracer');
const platform = require('os').platform;
const BrowserWindow = require('electron').BrowserWindow;
const npmRunPath = require('npm-run-path');
const os = require('os');
const addDispose = require('./dispose').addDispose;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();

  logger = tracer.colorConsole({
    format: '{{timestamp}} <{{title}}> {{message}}',
    dateformat: 'yyyy-MM-dd HH:MM:ss',
  });
} else {
  logger = tracer.dailyfile({
    root: os.tmpdir(),
    maxLogFiles: 10,
    allLogsFileName: 'AlipayCommand',
    format: '{{timestamp}} <{{title}}> {{message}}',
    dateformat: 'yyyy-MM-dd HH:MM:ss',
  });
}

// 后续需要优化不要使用 global 方式
function makeRandomHexString(length) {
  const chars = ['0', '1', '2', '3', '4', '5', '6', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  let result = '';
  for (let i = 0; i < length; i += 1) {
    const idx = Math.floor(chars.length * Math.random());
    result += chars[idx];
  }

  return result;
}

module.exports = {
  run({
    command = '',
    args = [],
    dispose = true,
    options = {},
  } = {}) {
    let nodePath = '';
    const p = platform();
    if (p === 'darwin') {
      nodePath = join($dirname, '..', 'assets', 'node');
    } else if (p === 'win32') {
      nodePath = join($dirname, '..', 'assets', 'node.exe');
    }
    const finalArgs = [command].concat(args, '--scripts-prepend-node-path=auto');
    const finalOpts = {};
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        finalOpts[key] = options[key];
      }
    }
    finalOpts.silent = true;
    const randomName = `ide-${makeRandomHexString(40)}`;

    logger.info(`(command) final command ${nodePath} ${finalArgs}`);
    const term = spawn(nodePath, finalArgs, finalOpts);
    global[randomName] = {
      pid: term.pid,
      command: finalArgs.join(' '),
      term,
      logs: '',
    };

    term.on('data', (data) => {
      global[randomName].logs += data.toString();
    });

    term.on('exit', (code) => {
      logger.info(`(command) ${randomName} exit`);
      BrowserWindow.getAllWindows()[0].webContents.send('install:exit', code);
      delete global[randomName];
    });

    if (process.platform === 'win32') {
      term.on('end', () => {
        logger.info(`(command) ${randomName} exit`);
        delete global[randomName];
      });
    } else {
      term.on('close', () => {
        logger.info(`(command) ${randomName} close`);
        delete global[randomName];
      });
    }

    if (dispose) {
      addDispose(() => {
        term.removeAllListeners();
        term.kill();
      });
    }

    return {
      name: randomName,
    };
  },
  kill({ pid = '', name = '' } = {}) {
    if (name === '') return;
    logger.info(`(command) ${pid} ${name} kill`);
    const term = pid ? global[name][pid] : global[name];
    if (!term.kill) {
      term.term.kill('SIGHUP');
    } else {
      term.kill('SIGHUP');
    }
  },

  install(opts) {
    const { installPath, global } = opts;
    const command = join($dirname, '..', 'node_modules', 'npm', 'bin', 'npm-cli.js');
    logger.info('(command) install deps');
    logger.info(`(command) ${command}`);
    const args = [
      'install',
    ];
    if (global) args.push(`${global} --global`);
    args.push('--registry=https://registry.npm.taobao.org');
    const options = {
      env: npmRunPath.env(),
      cwd: installPath,
    };

    return this.run({
      command,
      args,
      options,
    });
  },

  npm(args, opts) {
    const { installPath, global } = opts;
    const command = join($dirname, '..', 'node_modules', 'npm', 'bin', 'npm-cli.js');

    if (global) args.push(`${global} --global`);
    args.push('--registry=https://registry.npm.taobao.org');
    const options = {
      env: npmRunPath.env(),
      cwd: installPath,
    };

    return this.run({
      command,
      args,
      options,
    });
  },
};
