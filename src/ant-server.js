/**
 * Created by bingjian on 2017/5/15.
 */
const fork = require('child_process').fork;
const net = require('net');

let PORT = 5680;
const host = 'bugme.anyproxy.io';

const randomPort = function() {
  var cb,
    opts = {};

  if (arguments.length == 0) {
    throw "no callback";
  }
  else if (arguments.length == 1) {
    cb = arguments[0];
  }
  else {
    opts = arguments[0];
    cb = arguments[arguments.length - 1];
  }

  if (typeof cb != 'function') {
    throw "callback is not a function";
  }

  if (typeof opts != 'object') {
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
}, (port) => {
  console.log(__dirname);
  process.env = {
    ...process.env,
    PORT: port,
    HOST: host,
    PROXY_HOST: host
  };

  require('../Server/server.js');

});






