/**
 * Created by bingjian on 2017/3/10.
 */
import dva from 'dva';
import { message } from 'antd';
import './index.css';
import Vorlon from '../models/vorlon';

function handleErrorMessage(errorMessage) {
  if (errorMessage.indexOf('target exists') > -1) {
    return '目标文件已存在';
  }
  return errorMessage;
}

const app = window.g_app = dva({
  onError(err) {
    message.error(handleErrorMessage(err.message), 3);
    console.error(err.stack);
  },
});

// window关闭的时候会首先通知renderer线程，告诉前台执行一些清理的操作，
// 目前将这个dispose函数数组挂在window上面。
window.Disposes = [];
window.onbeforeunload = () => {
  console.log('unload');
  // command.dispose();
  window.Disposes.map(dispose => dispose());
};

app.model(Vorlon);
app.router(require('../routes/index'));

app.start('#electron_container');
