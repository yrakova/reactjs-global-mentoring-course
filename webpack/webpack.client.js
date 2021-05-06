const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDevMod = process.env.NODE_ENV === 'development';

module.exports = merge(common, {
  name: 'client',
  target: 'web',
  entry: [isDevMod && 'webpack-hot-middleware/client', './src/index.js'].filter(Boolean),
  plugins: [
    new CleanWebpackPlugin(),
    isDevMod && new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/**/*', to: '[path][name].[ext]' },
        { from: '_redirects', to: '' },
      ],
    }),
  ].filter(Boolean),
});
