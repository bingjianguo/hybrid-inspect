'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by bingjian on 2017/5/15.
 */
var fork = require('child_process').fork;
var net = require('net');

var PORT = 5680;
var host = 'bugme.anyproxy.io';

var randomPort = function randomPort() {
  var cb,
      opts = {};

  if (arguments.length == 0) {
    throw "no callback";
  } else if (arguments.length == 1) {
    cb = arguments[0];
  } else {
    opts = arguments[0];
    cb = arguments[arguments.length - 1];
  }

  if (typeof cb != 'function') {
    throw "callback is not a function";
  }

  if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) != 'object') {
    throw "options is not a object";
  }

  var from = opts.from > 0 ? opts.from : 15000,
      port = from;

  /** @todo only root can listen to ports less than 1024 */

  var server = net.createServer();
  server.listen(port, function (err) {
    server.once('close', function () {
      cb(port);
    });
    server.close();
  });
  server.on('error', function (err) {
    opts.from = port + 1;
    randomPort(opts, cb);
  });
};

randomPort({
  from: PORT
}, function (port) {
  console.log(__dirname);
  process.env = _extends({}, process.env, {
    PORT: port,
    HOST: host,
    PROXY_HOST: host
  });

  require('../Server/server.js');
});