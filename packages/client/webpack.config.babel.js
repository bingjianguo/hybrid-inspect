const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const cssImport = require('postcss-import');
const cssNested = require('postcss-nested');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 打点
// require('atool-monitor').emit();

const outputPath = path.join(__dirname, 'app', 'build');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = [
  {
    devtool: isProd ? '' : 'source-map',
    entry: {
      renderer: './src/renderer/entries/index.js',
    },
    output: {
      path: outputPath,
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    externals(context, request, callback) {
      let isExternal = false;
      const load = [
        'electron',
      ];
      if (load.includes(request)) {
        isExternal = `require("${request}")`;
      }
      callback(null, isExternal);
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]&minimize!postcss-loader'
          ),
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?minimize!postcss-loader'
          ),
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!postcss-loader!less-loader?sourceMap'
          ),
        }
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': { // eslint-disable-line quote-props
          NODE_ENV: JSON.stringify(nodeEnv),
        },
        $dirname: '__dirname',
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: __dirname,
          postcss() {
            return [
              cssImport,
              cssNested
            ];
          },
        },
      }),
      new ExtractTextPlugin('[name].css'),
      new LiveReloadPlugin(),
    ],
    target: 'web',
  },
  {
    devtool: isProd ? '' : 'source-map',
    entry: {
      main: './src/main/index.js',
    },
    target: 'electron',
    output: {
      path: outputPath,
      filename: '[name].js',
    },
    node: {
      __dirname: true,
    },
    externals(context, request, callback) {
      if (/^..\/extension/.test(request)) {
        callback(null, `require("${request}")`);
      } else {
        callback(null, request.charAt(0) === '.' ? false : `require("${request}")`);
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        $dirname: '__dirname',
      }),
    ],
  },
];
