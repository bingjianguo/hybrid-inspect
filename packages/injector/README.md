# cli工具集成了所需要的anyproxy的rules
+ 通过package.json的anyproxy属性来配置 rules相关内容
  + assets(配置本地开发调试的资源文件代理规则)
    + sourceRegString: 正则匹配url的地址进行本地映射
    + destUrlPath: 本地资源的链接地址域名前缀
    + enable: 是否启用该规则脚本
  + mock(mock数据的配置)
    + serverAddress: mock的远程服务器地址配置
    + scene: 场景唯一标识, 来配置仅从该场景下进行对应的mock数据选择
    + enable: 是否启用该规则脚本
+ 配置实例
{
  ...
  "anyproxy": {
    "assets": {
      "sourceRegString": "/industryprod/(mbillexprod|eindustrycenter)/\\d+(\\.\\d+){2}",
      "destUrlPath": "http://127.0.0.1:8000/",
      "enable": true
    },
    "mock": {
      "serverAddress": "http://anymock.dockerlab.alipay.net",
      "scene": "",
      "enable": true
    }
  }
  ...
}