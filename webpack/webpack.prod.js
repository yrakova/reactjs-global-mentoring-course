const { merge } = require('webpack-merge');
const parts = require('./webpack.parts.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(parts, {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
});
