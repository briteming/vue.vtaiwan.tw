const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
var OfflinePlugin = require('offline-plugin');

var pathToBourbon = require('node-bourbon').includePaths //???

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/client-entry.js',
    vendor: ['vue', 'vue-router', 'vuex', 'lru-cache', 'es6-promise']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'client-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test:/\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: vueConfig
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [pathToBourbon]
        }
      }
    }),
    //new ServiceWorkerWebpackPlugin({
    //  entry: path.join(__dirname, '../src/sw.js'),
    //}),
    new OfflinePlugin()
  ]
}
