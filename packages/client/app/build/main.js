/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("electron-log");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var disposes = [];
module.exports = {
  addDispose: function addDispose(fn) {
    disposes.push(fn);
  },
  clearAll: function clearAll() {
    disposes.map(function (disposeFn) {
      return disposeFn();
    });
    disposes = [];
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// Project Tree Root Path
var ROOT_PATH = exports.ROOT_PATH = '.';

// Window Size
var PROJECT_WINDOW_WIDTH = exports.PROJECT_WINDOW_WIDTH = 1200;
var PROJECT_WINDOW_HEIGHT = exports.PROJECT_WINDOW_HEIGHT = 720;
var WELCOME_WINDOW_WIDTH = exports.WELCOME_WINDOW_WIDTH = 818;
var WELCOME_WINDOW_HEIGHT = exports.WELCOME_WINDOW_HEIGHT = 460;
var PROJECT_OPEN_WINDOW_WIDTH = exports.PROJECT_OPEN_WINDOW_WIDTH = 1024;
var PROJECT_OPEN_WINDOW_HEIGHT = exports.PROJECT_OPEN_WINDOW_HEIGHT = 700;
var PROJECT_CREATE_WINDOW_WIDTH = exports.PROJECT_CREATE_WINDOW_WIDTH = 960;
var PROJECT_CREATE_WINDOW_HEIGHT = exports.PROJECT_CREATE_WINDOW_HEIGHT = 560;
var BUGME_WINDOW_WIDTH = exports.BUGME_WINDOW_WIDTH = 1280;
var BUGME_WINDOW_HEIGHT = exports.BUGME_WINDOW_HEIGHT = 768;
// window title
var IDE_TITLE = exports.IDE_TITLE = '小程序开发者工具';

// Drag And Drop
var DND_PROJECTTREE_MOVE = exports.DND_PROJECTTREE_MOVE = 'DND/ProjectTree/Move';

// Chrome Debugger Remote
var PORT = exports.PORT = '9222';

// Settings
var APPLICATION_OEPN_SETTINGS = exports.APPLICATION_OEPN_SETTINGS = 'APPLICATION_OEPN_SETTINGS';

// Preview
var PREVIEW_ON_DEVICE_LOGS = exports.PREVIEW_ON_DEVICE_LOGS = 'PREVIEW_ON_DEVICE_LOGS';

// Publish
var PUBLISH_LOGS = exports.PUBLISH_LOGS = 'PUBLISH_LOGS';

// Window hash
var PROJECT_HASH = exports.PROJECT_HASH = '/project';
var PROJECT_CREATE_HASH = exports.PROJECT_CREATE_HASH = '/project/create';
var WELCOME_HASH = exports.WELCOME_HASH = '/welcome';
var BUGME_HASH = exports.BUGME_HASH = '/bugme';
var PROXYVORLON_HASH = exports.PROXYVORLON_HASH = '/proxyvorlon';

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;

var _windowsManager = __webpack_require__(12);

function init() {
  (0, _windowsManager.newProxyVorlonWindow)();
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIPAddress = getIPAddress;

var _os = __webpack_require__(24);

var _common = __webpack_require__(14);

/**
 * Created by bingjian on 2017/3/22.
 */
function getIPAddress() {
  var ip = (0, _common.getIPAddress)();
  console.log('ip=' + ip);
  return ip;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(16);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(18);

var _promise2 = _interopRequireDefault(_promise);

exports.startup = startup;
exports.stopAnyproxyProcess = stopAnyproxyProcess;
exports.startAnyproxyProcess = startAnyproxyProcess;
exports.stopVorlonProcess = stopVorlonProcess;
exports.startVorlonProcess = startVorlonProcess;
exports.isAnyproxyProcessRunning = isAnyproxyProcessRunning;
exports.isVorlonProcessRunning = isVorlonProcessRunning;

var _dispose = __webpack_require__(2);

var _anyproxy = __webpack_require__(13);

var anyproxyExtension = _interopRequireWildcard(_anyproxy);

var _vorlon = __webpack_require__(15);

var vorlonExtension = _interopRequireWildcard(_vorlon);

var _homedir = __webpack_require__(23);

var _homedir2 = _interopRequireDefault(_homedir);

var _electronLog = __webpack_require__(0);

var _electronLog2 = _interopRequireDefault(_electronLog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var home = (0, _homedir2.default)(); /**
                                      * Created by bingjian on 2017/3/14.
                                      */

var bInitialize = false;
var vorlonProcess = null;
var anyproxyProcess = null;
var bAnyproxyLogDisabled = false;
var bVorlonLogDisabled = false;

function startup() {

  (0, _dispose.addDispose)(function () {
    anyproxyProcess && anyproxyProcess.kill('SIGHUP');
    vorlonProcess && vorlonProcess.kill('SIGHUP');
  });
  _electronLog2.default.info('startup in service proxy vorlon');
  return new _promise2.default(function (resolve, reject) {

    if (bInitialize) {
      _electronLog2.default.info('startup in service bInitialize true');
      resolve();
      return;
    }
    _electronLog2.default.info('befor startup anyproxyExtension');
    anyproxyExtension.forkStartup({ home: home, bDisableLog: bAnyproxyLogDisabled }).then(function (p) {
      anyproxyProcess = p;

      vorlonProcess = vorlonExtension.forkStartup({ home: home, bDisableLog: bVorlonLogDisabled }).then(function (p) {
        vorlonProcess = p;
        bInitialize = true;
        resolve();

        vorlonProcess.on('exit', function (e) {
          vorlonProcess = null;
          console.log('vorlon process exit : ' + (0, _stringify2.default)(e));
        });
      });

      anyproxyProcess.on('exit', function (e) {
        anyproxyProcess = null;
        console.log('anyproxy process exit : ' + (0, _stringify2.default)(e));
      });
    });
  });
}

function stopAnyproxyProcess() {
  var resolve = null;
  anyproxyProcess && anyproxyProcess.on('exit', function (e) {
    anyproxyProcess = null;
    console.log('vorlon process exit : ' + (0, _stringify2.default)(e));
    resolve();
  });

  anyproxyProcess && anyproxyProcess.kill('SIGHUP');
  return new _promise2.default(function (rv) {
    resolve = rv;
  });
}

function startAnyproxyProcess() {
  var resolve = null;
  var bDisableLog = true;
  anyproxyExtension.forkStartup({ home: home, bDisableLog: bDisableLog }).then(function (p) {
    anyproxyProcess = p;
    resolve();
  });

  return new _promise2.default(function (rv) {
    resolve = rv;
  });
}

function stopVorlonProcess() {
  var resolve = null;
  vorlonProcess && vorlonProcess.on('exit', function (e) {
    vorlonProcess = null;
    console.log('vorlon process exit : ' + (0, _stringify2.default)(e));
    resolve();
  });

  vorlonProcess && vorlonProcess.kill('SIGHUP');

  return new _promise2.default(function (rv) {
    resolve = rv;
  });
}

function startVorlonProcess() {
  var resolve = null;
  vorlonProcess = vorlonExtension.forkStartup(home).then(function (p) {
    vorlonProcess = p;
    resolve();
  });

  return new _promise2.default(function (rv) {
    resolve = rv;
  });
}

function isAnyproxyProcessRunning() {
  return anyproxyProcess != null;
}

function isVorlonProcessRunning() {
  return vorlonProcess != null;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setImmediate2 = __webpack_require__(19);

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

exports.autoCheckUpdate = autoCheckUpdate;
exports.checkForUpdate = checkForUpdate;

var _electron = __webpack_require__(1);

var _electronUpdater = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateMenuInstance = void 0; // the reference to update menu
var agreeToUpdate = false; // indicate whether to

function autoCheckUpdate() {
  _electronUpdater.autoUpdater.on('update-available', function () {
    _electron.dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new version of AnyProxy is now available, do you want update now?',
      buttons: ['Sure', 'No']
    }, function (buttonIndex) {
      // if agree to update
      if (buttonIndex === 0) {
        agreeToUpdate = true;
        _electronUpdater.autoUpdater.downloadUpdate();
      } else if (!!updateMenuInstance) {
        agreeToUpdate = false;
        updateMenuInstance.enabled = true;
        updateMenuInstance = null;
      }
    });
  });

  _electronUpdater.autoUpdater.on('update-not-available', function () {
    // if the update is checked by menu click, show message box
    if (!!updateMenuInstance) {
      _electron.dialog.showMessageBox({
        title: 'No Updates',
        message: 'Current version is up-to-date.'
      });
      updateMenuInstance.enabled = true;
      updateMenuInstance = null;
    }
  });

  /**
   * only quit and install when manually check update
   * or during auto checking prompt, click the agree button
   */
  _electronUpdater.autoUpdater.on('update-downloaded', function () {
    if (!!updateMenuInstance || agreeToUpdate) {
      (0, _setImmediate3.default)(function () {
        return _electronUpdater.autoUpdater.quitAndInstall();
      });
    }
  });

  _electronUpdater.autoUpdater.on('error', function (e) {
    LogUtil.debug('update error happened: ' + e.message + e.stack);
  });

  _electronUpdater.autoUpdater.checkForUpdates();
}

// manually check update in menu
function checkForUpdate(menuItem, focusedWindow, event) {
  updateMenuInstance = menuItem;
  updateMenuInstance.enabled = false;
  _electronUpdater.autoUpdater.checkForUpdates();
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("electron-debug");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("electron-is-dev");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(1);

var _electronIsDev = __webpack_require__(9);

var _electronIsDev2 = _interopRequireDefault(_electronIsDev);

var _path = __webpack_require__(10);

var _electronLog = __webpack_require__(0);

var _electronLog2 = _interopRequireDefault(_electronLog);

var _application = __webpack_require__(4);

var application = _interopRequireWildcard(_application);

var _proxyVorlon = __webpack_require__(6);

var proxyVorlon = _interopRequireWildcard(_proxyVorlon);

var _localip = __webpack_require__(5);

var localip = _interopRequireWildcard(_localip);

var _dispose = __webpack_require__(2);

var _updater = __webpack_require__(7);

var _constants = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electronLog2.default.info('(index) app  start >>>>>>>>>>>>>>>>>>');

if (_electronIsDev2.default) {
  __webpack_require__(8)();
}

if (!_electronIsDev2.default) {
  try {
    // autoCheckUpdate();
  } catch (err) {}
}

// 初始化
_electron.app.on('ready', function () {
  _electronLog2.default.info('(index) app ready');
  // menu.init();
  application.init();

  // 注册项目类型，比如 fengdie
  // extension.registerExtensions();

  // 加载 devtools extension
  if (_electronIsDev2.default) {
    _electron.BrowserWindow.addDevToolsExtension((0, _path.join)(__dirname, '../../extensions/redux-devtools/2.11.1_0'));
    _electron.BrowserWindow.addDevToolsExtension((0, _path.join)(__dirname, '../../extensions/react-developer-tools/0.15.4_0'));
  }
});

// 放一个空绑定，保证无窗口时程序不会退出
_electron.app.on('window-all-closed', function () {});

_electron.app.on('quit', function () {
  global.appIsReadyToQuit = true;
  (0, _dispose.clearAll)();
  _electronLog2.default.info('(index) app quit <<<<<<<<<<<<<<<<<<<');
});

// remote chrome debug menu
_electron.app.commandLine.appendSwitch('remote-debugging-port', _constants.PORT);
_electron.app.commandLine.appendSwitch('--enable-touch-events');
_electron.app.commandLine.appendSwitch('--ignore-certificate-errors');

// 注册到 global，给 renderer 通过 remote.getGlobal 调
global.services = {
  proxyVorlon: proxyVorlon,
  application: application,
  localip: localip
};

global.configs = {};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(21);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(20);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _keys = __webpack_require__(17);

var _keys2 = _interopRequireDefault(_keys);

var _class, _temp, _initialiseProps;

var _electron = __webpack_require__(1);

var _url = __webpack_require__(25);

var _electronLog = __webpack_require__(0);

var _electronLog2 = _interopRequireDefault(_electronLog);

var _constants = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var singleton = true;

var manager = {
  windows: {},
  welcome: null,
  projectCreate: null,
  singleton: null,
  current: null
};

exports.setCurrent = function (win) {
  return manager.current = win;
};

exports.getCurrent = function () {
  return manager.current;
};

exports.getSizeOfWindows = function () {
  return (0, _keys2.default)(manager.windows).length;
};

exports.newWindow = function (options, callback) {
  return new Window(options, callback);
};

exports.Window = Window;

exports.newWelcomeWindow = function newWelcomeWindow() {
  _electronLog2.default.info('in new welcome window');
  return new Window({
    htmlHash: _constants.WELCOME_HASH,
    width: _constants.WELCOME_WINDOW_WIDTH,
    height: _constants.WELCOME_WINDOW_HEIGHT,
    resizable: false,
    webPreferences: {
      webSecurity: false
    }
  }, function () {
    checkLatest(false);
  });
};

exports.newProxyVorlonWindow = function newProxyVorlonWindow() {
  var proxyVorlonWindow = new Window({
    htmlHash: _constants.PROXYVORLON_HASH,
    width: _constants.BUGME_WINDOW_WIDTH,
    height: _constants.BUGME_WINDOW_HEIGHT,
    resizable: true,
    webPreferences: {
      webSecurity: false
    }
  }, function () {});
  // proxyVorlonWindow.webContents.openDevTools();
  return proxyVorlonWindow;
};

exports.closeWelcomeWindow = function () {
  manager.welcome.close();
};

exports.newProjectCreateWindow = function () {
  return new Window({
    htmlHash: _constants.PROJECT_CREATE_HASH,
    width: _constants.PROJECT_CREATE_WINDOW_WIDTH,
    height: _constants.PROJECT_CREATE_WINDOW_HEIGHT
  });
};

exports.closeProjectCreateWindow = function () {
  manager.projectCreate.close();
};

exports.closeCurrent = function (callback) {
  manager.current.close(function (win) {
    if (callback) return callback();
    defaultCloseCallBack(win);
  });
};

exports.getWindowById = function (id) {
  return manager.windows[id];
};

var getFocusedWindow = function getFocusedWindow() {
  var window = _electron.BrowserWindow.getFocusedWindow();
  return manager.windows[window.id];
};

var defaultCloseCallBack = function defaultCloseCallBack(win) {
  if (win.type === _constants.WELCOME_HASH && (0, _keys2.default)(manager.windows).length === 0) {
    _electron.app.quit();
  } else if (win.type === _constants.BUGME_HASH) {
    _electron.app.quit();
  } else if (win.type === _constants.PROXYVORLON_HASH) {
    _electron.app.quit();
  } else {
    // eslint-disable-next-line no-new
    new Window({
      htmlHash: _constants.WELCOME_HASH,
      width: _constants.WELCOME_WINDOW_WIDTH,
      height: _constants.WELCOME_WINDOW_HEIGHT,
      resizable: false
    });
  }
};

var Window = (_temp = _class = function Window(options, callback) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Window);

  _initialiseProps.call(this);

  var localOpt = {};
  var url = (0, _url.format)({
    protocol: 'file',
    pathname: options.pathName || __dirname + '/../pages/index.html',
    slashes: true,
    hash: options.htmlHash
  });

  this.type = options.htmlHash.split('?')[0];
  if (this.type === _constants.WELCOME_HASH && manager.welcome) return null;
  if (this.type === _constants.PROJECT_CREATE_HASH && manager.projectCreate) return null;

  if (process.platform === 'darwin') localOpt.titleBarStyle = 'hidden';
  this.browserWindow = new _electron.BrowserWindow((0, _extends3.default)({}, options, localOpt, {
    show: false,
    webPreferences: {
      allowRunningInsecureContent: true
    }
  }));

  this.on('ready-to-show', function () {
    _electronLog2.default.info('in ready to show');
    _this.show();
    if (callback) callback();
  });

  this.handleEvent();

  this.webContents = this.browserWindow.webContents;
  this.id = this.browserWindow.webContents.windowId = this.browserWindow.id;
  this.disposeFn = [];
  this.selfClosed = true;

  if (this.type === _constants.PROJECT_HASH) {
    if (singleton && manager.singleton) {
      manager.current.close(function () {
        manager.current = _this;
        if (singleton && _this.type === _constants.PROJECT_HASH) manager.singleton = _this;
      });
    }
    manager.windows[this.id] = this;
  }
  if (this.type === _constants.WELCOME_HASH) manager.welcome = this;
  if (this.type === _constants.PROJECT_CREATE_HASH) manager.projectCreate = this;

  this.browserWindow.loadURL(url);
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.show = function () {
    return _this2.browserWindow.show();
  };

  this.close = function (arg1) {
    if (_this2.browserWindow && !_this2.isDestroyed()) {
      _this2.closedCallback = arg1;
      _this2.browserWindow.close();
    }
  };

  this.destroy = function () {
    if (_this2.browserWindow && !_this2.isDestroyed()) {
      _this2.browserWindow.destroy();
    }
  };

  this.on = function (event, callback) {
    return _this2.browserWindow.on(event, callback);
  };

  this.once = function (event, callback) {
    return _this2.browserWindow.once(event, callback);
  };

  this.isDestroyed = function () {
    return _this2.browserWindow.isDestroyed();
  };

  this.loadURL = function (url, options) {
    return _this2.browserWindow.loadURL(url, options);
  };

  this.isMaximized = function () {
    return _this2.browserWindow.isMaximized();
  };

  this.maximize = function () {
    return _this2.browserWindow.maximize();
  };

  this.unmaximize = function () {
    return _this2.browserWindow.unmaximize();
  };

  this.addDispose = function (fn) {
    _this2.disposeFn.push(fn);
  };

  this.dispose = function () {
    _this2.disposeFn.map(function (dispose) {
      return dispose();
    });
  };

  this.handleEvent = function () {
    _this2.browserWindow.on('close', function (event) {
      try {
        _this2.dispose();
      } catch (error) {
        event.preventDefault();
        throw new Error(error);
      }
    });

    _this2.on('closed', function () {
      if (global.appIsReadyToQuit) return;
      if (_this2.type === _constants.PROJECT_CREATE_HASH) manager.projectCreate = null;
      if (_this2.type === _constants.WELCOME_HASH) manager.welcome = null;
      if (_this2.type === _constants.PROJECT_HASH) delete manager.windows[_this2.id];
      if (singleton) {
        manager.current = null;
      } else {
        manager.current = getFocusedWindow();
      }

      if (_this2.closedCallback) {
        _this2.closedCallback(_this2);
      } else {
        defaultCloseCallBack(_this2);
      }
    });
    _this2.on('focus', function () {
      manager.current = _this2;
    });
  };
}, _temp);

// ipc监听renderer线程

_electron.ipcMain.on('window:doubleClickTitleBar', function (e) {
  var window = manager.windows[e.sender.windowId];
  if (window && !window.isDestroyed()) {
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  }
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("../extensions/anyproxy");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("../extensions/common");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("../extensions/vorlon");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/set-immediate");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("electron-updater");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("homedir");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })
/******/ ]);