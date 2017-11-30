/**
 * Created by bingjian on 2017/3/14.
 */
// import * as bugmeExtension from '../extensions/bugmeServer';
import { addDispose } from './dispose';
import * as anyproxyExtension from '../extensions/anyproxy';
import * as vorlonExtension from '../extensions/vorlon';

export function startup() {
  // const bugmeProcess = bugmeExtension.forkStartBugMeServer();
  let vorlonProxy = null;
  let anyproxyProcess = null;
  let home = '~';
  addDispose(() => {
    anyproxyProcess && anyproxyProcess.kill('SIGHUP');
    vorlonProxy && vorlonProxy.kill('SIGHUP');
  });

  return new Promise((resolve, reject) => {
    anyproxyExtension.forkStartup(home).then((p) => {
      anyproxyProcess = p;
      vorlonProxy = vorlonExtension.forkStartup(home).then((p) => {
        vorlonProxy = p;
        resolve();
      });

    });

  });
}
