const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'development', // production
  entry: path.join(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      }
    ]
  }
};

module.exports = config;
