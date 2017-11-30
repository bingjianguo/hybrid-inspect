import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

let updateMenuInstance; // the reference to update menu
let agreeToUpdate = false; // indicate whether to

export function autoCheckUpdate () {
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new version of AnyProxy is now available, do you want update now?',
      buttons: ['Sure', 'No']
    }, (buttonIndex) => {
      // if agree to update
      if (buttonIndex === 0) {
        agreeToUpdate = true;
        autoUpdater.downloadUpdate()
      } else if (!!updateMenuInstance) {
        agreeToUpdate = false;
        updateMenuInstance.enabled = true
        updateMenuInstance = null
      }
    });
  });

  autoUpdater.on('update-not-available', () => {
    // if the update is checked by menu click, show message box
    if (!!updateMenuInstance) {
      dialog.showMessageBox({
        title: 'No Updates',
        message: 'Current version is up-to-date.'
      });
      updateMenuInstance.enabled = true
      updateMenuInstance = null
    }

  });

  /**
   * only quit and install when manually check update
   * or during auto checking prompt, click the agree button
   */
  autoUpdater.on('update-downloaded', () => {
    if (!!updateMenuInstance || agreeToUpdate) {
      setImmediate(() => autoUpdater.quitAndInstall())
    }
  });

  autoUpdater.on('error', (e) => {
    LogUtil.debug('update error happened: ' + e.message + e.stack);
  });

  autoUpdater.checkForUpdates();
}

// manually check update in menu
export function checkForUpdate (menuItem, focusedWindow, event) {
  updateMenuInstance = menuItem
  updateMenuInstance.enabled = false
  autoUpdater.checkForUpdates()
}

