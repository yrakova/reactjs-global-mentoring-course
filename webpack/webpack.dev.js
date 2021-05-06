const { merge } = require('webpack-merge');
const parts = require('./webpack.parts.js');

module.exports = merge(parts, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '/dist',
    hot: true,
    host: 'localhost',
    port: 8081,
    historyApiFallback: true,
  },
});
