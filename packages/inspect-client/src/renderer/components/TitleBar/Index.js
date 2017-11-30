import React from 'react';
import { ipcRenderer as ipc } from 'electron';
import styles from './Index.css';

export default (props) => {
  if (window.process.platform === 'darwin') {
    const handleDoubleClick = () => {
      if (window.process.platform === 'darwin') ipc.send('window:doubleClickTitleBar');
    };
    return (
      <div id="title-container">
        <div className={styles.titleBar} onDoubleClick={handleDoubleClick}>{props.children}</div>
        <div className={styles.titleBarBlank} />
      </div>
    );
  } else {
    return <div />;
  }
};
