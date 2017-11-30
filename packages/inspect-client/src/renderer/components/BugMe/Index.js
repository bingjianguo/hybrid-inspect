/**
 * Created by bingjian on 2017/3/13.
 */
import { remote } from 'electron';
import React from 'react';
import { Button, Spin } from 'antd';
import styles from './Index.css';

const { bugme, localip } = remote.getGlobal('services');
let ip = '';
let BUGME_URL = '';


class BugMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugmeDisplay: 'hidden',
      bugmeUrl: '',
    };
  }

  componentDidMount() {
    bugme.startup()
      .then(() => {
        ip = localip.getIPAddress();
        BUGME_URL = `https://${ip}:5680`;
        this.onForceRefreshBugme();
      })
      .catch(() => {

      });
  }

  onForceRefreshBugme() {
    const timestamp = (new Date()).getTime();
    this.setState({
      bugmeUrl: `${BUGME_URL}?date=${timestamp}`,
      bugmeDisplay: 'visible',
    });
    // const webview = document.getElementById('bugme-webview');
    // webview.reloadIgnoringCache();
  }

  render() {
    const {
      bugmeDisplay,
      bugmeUrl,
    } = this.state;
    return (
      <div>
        <Spin spinning={bugmeDisplay === 'hidden'} size="large">
          <Button
            className={styles.bugmeForceFefresh}
            type="primary"
            onClick={this.onForceRefreshBugme.bind(this)}
          >有问题？试试强制刷新</Button>

          <div dangerouslySetInnerHTML={{ __html: `<webview id="bugme-webview" src=${bugmeUrl} style="width:100%;height:100vh;overflow: hidden"></webview>` }} />
        </Spin>
      </div>
    );
  }
}

BugMe.propTypes = {

};

export default BugMe;
