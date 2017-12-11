import { app, BrowserWindow, ipcMain as ipc } from 'electron';
import { format } from 'url';
import {
  WELCOME_WINDOW_WIDTH,
  WELCOME_WINDOW_HEIGHT,
  PROJECT_CREATE_WINDOW_WIDTH,
  PROJECT_CREATE_WINDOW_HEIGHT,
  WELCOME_HASH,
  PROJECT_CREATE_HASH,
  PROJECT_HASH,
  BUGME_HASH,
  BUGME_WINDOW_HEIGHT,
  BUGME_WINDOW_WIDTH,
  PROXYVORLON_HASH,
} from '../../shared/constants';

const singleton = true;

const manager = {
  windows: {},
  welcome: null,
  projectCreate: null,
  singleton: null,
  current: null,
};

exports.setCurrent = win => (manager.current = win);

exports.getCurrent = () => manager.current;

exports.getSizeOfWindows = () => Object.keys(manager.windows).length;

exports.newWindow = (options, callback) => new Window(options, callback);

exports.Window = Window;

exports.newWelcomeWindow = function newWelcomeWindow() {
  console.log('in new welcome window');
  return new Window({
    htmlHash: WELCOME_HASH,
    width: WELCOME_WINDOW_WIDTH,
    height: WELCOME_WINDOW_HEIGHT,
    resizable: false,
    webPreferences: {
      webSecurity: false,
    }
  }, () => {
    checkLatest(false);
  });
};

exports.newProxyVorlonWindow = function newProxyVorlonWindow() {
  const proxyVorlonWindow = new Window({
    htmlHash: PROXYVORLON_HASH,
    width: BUGME_WINDOW_WIDTH,
    height: BUGME_WINDOW_HEIGHT,
    resizable: true,
    webPreferences: {
      webSecurity: false,
    }
  }, () => {

  });
  return proxyVorlonWindow;
};


exports.closeWelcomeWindow = () => {
  manager.welcome.close();
};

exports.newProjectCreateWindow = () => {
  return new Window({
    htmlHash: PROJECT_CREATE_HASH,
    width: PROJECT_CREATE_WINDOW_WIDTH,
    height: PROJECT_CREATE_WINDOW_HEIGHT,
  });
};

exports.closeProjectCreateWindow = () => {
  manager.projectCreate.close();
};

exports.closeCurrent = (callback) => {
  manager.current.close((win) => {
    if (callback) return callback();
    defaultCloseCallBack(win);
  });
};

exports.getWindowById = id => manager.windows[id];

const getFocusedWindow = () => {
  const window = BrowserWindow.getFocusedWindow();
  return manager.windows[window.id];
};

const defaultCloseCallBack = (win) => {
  if (win.type === WELCOME_HASH && Object.keys(manager.windows).length === 0) {
    app.quit();
  } else if (win.type === BUGME_HASH) {
    app.quit();
  }  else if (win.type === PROXYVORLON_HASH ) {
    app.quit();
  } else {
    // eslint-disable-next-line no-new
    new Window({
      htmlHash: WELCOME_HASH,
      width: WELCOME_WINDOW_WIDTH,
      height: WELCOME_WINDOW_HEIGHT,
      resizable: false,
    });
  }
};

class Window {
  constructor(options, callback) {
    const localOpt = {};
    const url = format({
      protocol: 'file',
      pathname: options.pathName || `${$dirname}/../pages/index.html`,
      slashes: true,
      hash: options.htmlHash,
    });

    this.type = options.htmlHash.split('?')[0];
    if (this.type === WELCOME_HASH && manager.welcome) return null;
    if (this.type === PROJECT_CREATE_HASH && manager.projectCreate) return null;

    if (process.platform === 'darwin') localOpt.titleBarStyle = 'hidden';
    this.browserWindow = new BrowserWindow({
      ...options,
      ...localOpt,
      show: false,
      webPreferences: {
        allowRunningInsecureContent: true
      }
    });

    this.on('ready-to-show', () => {
      console.log('in ready to show');
      this.show();
      if (callback) callback();
    });

    this.handleEvent();

    this.webContents = this.browserWindow.webContents;
    this.id = this.browserWindow.webContents.windowId = this.browserWindow.id;
    this.disposeFn = [];
    this.selfClosed = true;

    if (this.type === PROJECT_HASH) {
      if (singleton && manager.singleton) {
        manager.current.close(() => {
          manager.current = this;
          if (singleton && this.type === PROJECT_HASH) manager.singleton = this;
        });
      }
      manager.windows[this.id] = this;
    }
    if (this.type === WELCOME_HASH) manager.welcome = this;
    if (this.type === PROJECT_CREATE_HASH) manager.projectCreate = this;

    this.browserWindow.loadURL(url);
  }

  show = () => this.browserWindow.show();

  close = (arg1) => {
    if (this.browserWindow && !this.isDestroyed()) {
      this.closedCallback = arg1;
      this.browserWindow.close();
    }
  }

  destroy = () => {
    if (this.browserWindow && !this.isDestroyed()) {
      this.browserWindow.destroy();
    }
  }

  on = (event, callback) => this.browserWindow.on(event, callback);

  once = (event, callback) => this.browserWindow.once(event, callback);

  isDestroyed = () => this.browserWindow.isDestroyed();

  loadURL = (url, options) => this.browserWindow.loadURL(url, options);

  isMaximized = () => this.browserWindow.isMaximized();

  maximize = () => this.browserWindow.maximize();

  unmaximize = () => this.browserWindow.unmaximize();

  addDispose = (fn) => {
    this.disposeFn.push(fn);
  }

  dispose = () => {
    this.disposeFn.map(dispose => dispose());
  }

  handleEvent = () => {
    this.browserWindow.on('close', (event) => {
      try {
        this.dispose();
      } catch (error) {
        event.preventDefault();
        throw new Error(error);
      }
    });

    this.on('closed', () => {
      if (global.appIsReadyToQuit) return;
      if (this.type === PROJECT_CREATE_HASH) manager.projectCreate = null;
      if (this.type === WELCOME_HASH) manager.welcome = null;
      if (this.type === PROJECT_HASH) delete manager.windows[this.id];
      if (singleton) {
        manager.current = null;
      } else {
        manager.current = getFocusedWindow();
      }

      if (this.closedCallback) {
        this.closedCallback(this);
      } else {
        defaultCloseCallBack(this);
      }
    });
    this.on('focus', () => {
      manager.current = this;
    });
  }
}

// ipc监听renderer线程
ipc.on('window:doubleClickTitleBar', (e) => {
  const window = manager.windows[e.sender.windowId];
  if (window && !window.isDestroyed()) {
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  }
});
