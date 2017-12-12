import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import { join } from 'path';
import log from 'electron-log';
import * as application from './services/application';
import * as proxyVorlon from './services/proxyVorlon';
import * as localip from './services/localip';
import { clearAll } from './services/dispose';
import { autoCheckUpdate } from './updater';

import { PORT } from '../shared/constants';

log.info('(index) app  start >>>>>>>>>>>>>>>>>>');

if (isDev) {
  require('electron-debug')();
}

if ( !isDev ) {
  try {
    // autoCheckUpdate();
  } catch (err) {
    
  }
  
}

// 初始化
app.on('ready', () => {
  log.info('(index) app ready');
  // menu.init();
  application.init();

  // 注册项目类型，比如 fengdie
  // extension.registerExtensions();

  // 加载 devtools extension
  if (isDev) {
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/redux-devtools/2.11.1_0'),
    );
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/react-developer-tools/0.15.4_0'),
    );
  }
});

// 放一个空绑定，保证无窗口时程序不会退出
app.on('window-all-closed', () => {});

app.on('quit', () => {
  global.appIsReadyToQuit = true;
  clearAll();
  log.info('(index) app quit <<<<<<<<<<<<<<<<<<<');
});

// remote chrome debug menu
app.commandLine.appendSwitch('remote-debugging-port', PORT);
app.commandLine.appendSwitch('--enable-touch-events');
app.commandLine.appendSwitch('--ignore-certificate-errors');

// 注册到 global，给 renderer 通过 remote.getGlobal 调
global.services = {
  proxyVorlon,
  application,
  localip,
};

global.configs = {

};
