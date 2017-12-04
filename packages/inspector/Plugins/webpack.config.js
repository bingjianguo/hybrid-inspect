const webpack = require('atool-build/lib/webpack');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const serverConfig = require('../Server/config.json');

module.exports = function (webpackConfig) {
  webpackConfig.externals = Object.assign({},webpackConfig.module.externals, {
    'react': 'React',
    'react-dom': 'ReactDOM'
  });

  // remove CommonChunkPlugin
  let commonChunkPluginIndex = -1;
  webpackConfig.plugins.forEach((item, index) => {
    if (item.chunkNames === 'common') {
      commonChunkPluginIndex = index;
    }
  });

  if (commonChunkPluginIndex >= 0) {
    webpackConfig.plugins.splice(commonChunkPluginIndex, 1);
  }

  webpackConfig.babel.retainLines = true;
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', [{ 'libraryName': 'antd', style: true }]]);

  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach((loader) => {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      // loader.test = '/\\.global\\.less$/';
      loader.test = function (filePath) {
        return (/antd\-\/.*\.less$/.test(filePath) || /\.global\.less$/.test(filePath));
      };
      // 去除有module插件默认加上的：local，使用global的样式
      loader.loader = loader.loader.replace('&modules', '');
      // loader.loader = 'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!postcss!less-loader?{"sourceMap":true}';
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      // loader.test = /\.less$/;
      loader.test= function test (filePath) {
        return (/\.less$/.test(filePath) && !/\.global\.less$/.test(filePath) && !/antd\-\/.*\.less$/.test(filePath));
      };
    }
  });

  // 注入所有src下以 -index.jsx结尾的文件
  const files = glob.sync('./Plugins/entry/*.ts*');
  // ./Plugins/entry/
  const noPluginEntries = files.reduce(function (memo, file) {
    const name = file.replace('./Plugins/', '').replace(/\.tsx?$/, '');
    memo[name] = file;
    return memo;
  }, {});



  const pluginObjects = serverConfig.plugins.filter((item) => {
    return item.enabled
  });

  const plugins = pluginObjects.map((plugin) => {
    return plugin.foldername;
  });
  console.log(plugins);
  // ./Plugins/Vorlon/plugins/domExplorer/vorlon.domExplorer.client.ts
  const pluginEntries = {};
  plugins.forEach(function(plugin) {
    const entry = {};
    entry['plugins' + '/' + plugin + '/' + 'vorlon.' + plugin + '.client']
      = './Plugins/Vorlon/plugins/' + plugin + '/vorlon.' + plugin + '.client.ts';

    let filePath = './Plugins/Vorlon/plugins/' + plugin + '/vorlon.' + plugin + '.dashboard.ts';
    if ( !fs.existsSync(filePath) ) {
      filePath += 'x';
    }

    entry['plugins' + '/' + plugin + '/' + 'vorlon.' + plugin + '.dashboard'] = filePath;
    Object.assign(pluginEntries, entry);
  });


  webpackConfig.entry = Object.assign(
    {},
    webpackConfig.entry,
    noPluginEntries,
    pluginEntries
  );

  return webpackConfig;
};