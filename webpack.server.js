const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
  name: 'server',
  target: 'node',
  entry: ['./src/serverRenderer'],
  externals: [nodeExternals()],
  output: {
    filename: 'js/serverRenderer.js',
    libraryTarget: 'commonjs2',
  }
});
