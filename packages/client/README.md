ide-electron
============

支付宝web开发调试工具，基于electorn构建。

### 代码结构

主要关注`app`和`src`两个文件夹即可。

* `app`：该文件夹下是一个electron应用，入口文件`trigger.js`会启动一个窗口去加载`index.html`，而`index.html`文件内加载的js、css文件则是由`src`目录下的文件编译生成的。
* `src`：该目录下包括`editor`和`ide`，分别对应编辑器功能和IDE内除编辑器以外的功能，这个目录下的文件会由webpack来处理，编译结果会输出到`app/dist`供electron的入口html调用！

### 开发

* `tnpm i`，使用tnpm4需要手动切换到`app`目录下，再运行一次`tnpm i`
* `npm run dev` 以开发模式运行IDE

### 在各种环境上运行

* 使用环境变量`ALIPAY_ENV`，值可以为 `stable`，`sit`，`online`，默认为线上环境
* 例如可以使用`ALIPAY_ENV=stable npm run dev`来启动stable环境的IDE
* 如何测试预发环境？
  * 绑定预发host
  ```
    110.76.8.21 authweb.alipay.com
    110.76.8.21 openhome.alipay.com
    110.76.8.21 open.alipay.com
    110.76.8.21 hpmweb.alipay.com
    110.75.140.20 auth.alipay.com authpreprod.alipay.com authzth.alipay.com authgtj.alipay.com authpreprod.alipay.com authpreprod.alipay.com
    110.75.140.234 a.alipayobjects.com as.alipayobjects.com
    110.76.8.200 antprocess.alipay.com
    110.76.8.78 nebulamng.alipay.com
    110.75.144.190 nebula.alipay.com
    110.75.140.17 appstore.alipay.com app.alipay.com #appstore
  ```
  * 使用online环境的IDE包（release出去的包）进行测试即可，打开后会提示“获取二维码失败”，这是预发环境的https证书问题引起的，需要手动忽略掉证书问题才行
        * dev环境：直接调试窗口的console中输入`process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"`，然后IDE里点击“重新获取”
        * release环境：使用快捷键`shift+cmd+A+N+T`(mac)或`shift+ctrl+A+N+T`(windows)开启调试窗口，其他操作同上
  * 手机支付宝需要连预发环境，使用`alipay-pre`的WIFI即可。

### 打包

* `npm run build` 构建，为打包做准备
* `npm run pack` 打包出未打包的app（macOS）或文件夹（Windows）
* `npm run dist` 打包出最终的dmg（macOS）或exe（Windows）安装包

打包后的可运行文件会放在`release`目录下。

> Windows平台上建议在打包前运行`tnpm i --arch=ia32 electron`，否则打包时会一直卡在下载这一步。

### 签名

* 在本机设置两个环境变量即可：
    * `CSC_LINK`: base64过的证书字符串，macOS上可通过命令`base64 -i yourFile.p12`得到。
    * `CSC_KEY_PASSWORD`: 上面的证书对应的密码。

在打包过程中如果检测到有这两个环境变量，则会自动进行签名。如果没有设置，打出来的包为未签名版。

> 详细教程请参考[electron-builder的文档](https://github.com/electron-userland/electron-builder/wiki/Code-Signing)。

### 发布流程

* 打好各个平台的包以后上传到蜻蜓上。
* 拿到地址后到凤蝶上更新[这个区块](https://fengdie.alipay.com/data/edit/254)，注意各个平台是分开管理的，所以如果同时发布macOS和windows，你需要在上线的区块里新增两条记录。
* 自`0.1.3-beta`后的版本每次打开会自动检查更新，有新版本会提醒用户。

### 提交代码

本项目的commit message遵循[Angular Commit Guielines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)，建议先简单阅读。配合`commitizen`可以方便的完成commit message的编辑：

* 全局安装 `tnpm i -g commitizen`
* 在项目目录下配置 `commitizen init cz-conventional-changelog --save --save-exact`
* 使用`git cz`代替`git commit`进行代码提交

> 参考[阮老师的教程](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html) 


### 在IDE中调试AlipayJSBridge 

* 切换到“调试”tab
* 在右侧的console中输入代码即可
* 如设置标题

  ```
  AlipayJSBridge.call("setTitle", {
    title: 'Hello',
    subtitle: '杭州'  //8.2
  });
  ```
* 查看效果
 
  ```
  document.addEventListener('titleClick', function () {
    console.log('ceshi');
  }, false);
  ```

--------------------

## Contributors(2)

Ordered by date of first contribution, by [ali-contributors](http://gitlab.alibaba-inc.com/node/ali-contributors).

- ![](https://work.alibaba-inc.com/photo/106498.30x30.jpg) [@死侍](https://work.alibaba-inc.com/work/u/106498)<a target="_blank" href="http://amos.im.alisoft.com/msg.aw?v=2&site=cntaobao&s=2&charset=utf-8&uid=%E6%AD%BB%E4%BE%8D"><img src="http://amos.alicdn.com/online.aw?v=2&uid=%E6%AD%BB%E4%BE%8D&site=cntaobao&s=1&charset=utf-8"></a>
- ![](https://work.alibaba-inc.com/photo/113225.30x30.jpg) [@一尔](https://work.alibaba-inc.com/work/u/113225)<a target="_blank" href="http://amos.im.alisoft.com/msg.aw?v=2&site=cntaobao&s=2&charset=utf-8&uid=%E4%B8%80%E5%B0%94"><img src="http://amos.alicdn.com/online.aw?v=2&uid=%E4%B8%80%E5%B0%94&site=cntaobao&s=1&charset=utf-8"></a>

--------------------


## 留有的问题(我去，还不知道原因)

+ vpn之后，页面无法打开
