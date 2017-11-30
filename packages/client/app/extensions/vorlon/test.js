const homedir = require('homedir');
const { forkStartup } = require('./index');

forkStartup(homedir());

