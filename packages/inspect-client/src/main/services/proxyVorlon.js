/**
 * Created by bingjian on 2017/3/14.
 */
import { addDispose } from './dispose';
import * as anyproxyExtension from '../extensions/anyproxy';
import * as vorlonExtension from '../extensions/vorlon';
import homedir from 'homedir';

let home = homedir();
let bInitialize = false;
let vorlonProcess = null;
let anyproxyProcess = null;

export function startup() {

  addDispose(() => {
    anyproxyProcess && anyproxyProcess.kill('SIGHUP');
    vorlonProcess && vorlonProcess.kill('SIGHUP');
  });

  return new Promise((resolve, reject) => {

    if ( bInitialize ) {
      resolve();
      return;
    }
    const bAnyproxyLogDisabled = false;
    anyproxyExtension.forkStartup({ home, bDisableLog: bAnyproxyLogDisabled }).then((p) => {
      anyproxyProcess = p;
      const bVorlonLogDisabled = true;
      vorlonProcess = vorlonExtension.forkStartup({ home, bDisableLog: bVorlonLogDisabled }).then((p) => {
        vorlonProcess = p;
        bInitialize = true;
        resolve();

        vorlonProcess.on('exit',  (e) => {
          vorlonProcess = null;
          console.log('vorlon process exit : ' + JSON.stringify(e));
        });

      });

      anyproxyProcess.on('exit',  (e) => {
        anyproxyProcess = null;
        console.log('anyproxy process exit : ' + JSON.stringify(e));
      });

    });
  });
}

export function stopAnyproxyProcess () {
  let resolve = null;
  anyproxyProcess && anyproxyProcess.on('exit',  (e) => {
    anyproxyProcess = null;
    console.log('vorlon process exit : ' + JSON.stringify(e));
    resolve();
  });

  anyproxyProcess && anyproxyProcess.kill('SIGHUP');
  return new Promise((rv) => {
    resolve = rv;
  })
}

export function startAnyproxyProcess () {
  let resolve = null;
  const bDisableLog = true;
  anyproxyExtension.forkStartup({ home, bDisableLog}).then((p) => {
    anyproxyProcess = p;
    resolve();
  });

  return new Promise((rv) => {
    resolve = rv;
  })
}

export function stopVorlonProcess () {
  let resolve = null;
  vorlonProcess && vorlonProcess.on('exit',  (e) => {
    vorlonProcess = null;
    console.log('vorlon process exit : ' + JSON.stringify(e));
    resolve();
  });

  vorlonProcess && vorlonProcess.kill('SIGHUP');

  return new Promise((rv) => {
    resolve = rv;
  })
}

export function startVorlonProcess () {
  let resolve = null;
  vorlonProcess = vorlonExtension.forkStartup(home).then((p) => {
    vorlonProcess = p;
    resolve();
  });

  return new Promise(( rv ) => {
    resolve = rv;
  })
}

export function isAnyproxyProcessRunning () {
  return anyproxyProcess != null;
}


export function isVorlonProcessRunning () {
  return vorlonProcess != null;
}
