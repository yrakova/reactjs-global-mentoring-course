const { merge } = require('webpack-merge');
const commonClient = require('./webpack.client.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(commonClient, {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
});
