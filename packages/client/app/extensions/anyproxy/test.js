const homedir = require('homedir');
const { forkStartup } = require('./index');
let home = homedir();

forkStartup(home).then((p) => {

});
