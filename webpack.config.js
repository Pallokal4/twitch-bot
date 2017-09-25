 var webpack = require('webpack');
    var path = require('path');

module.exports = {
  entry: ['babel-polyfill', 'regenerator-runtime/runtime','./src/client.js'],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
