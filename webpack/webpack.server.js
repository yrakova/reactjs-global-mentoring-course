const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
  name: 'server',
  target: 'node',
  entry: ['./src/serverRenderer.js'],
  externals: [nodeExternals()],
  output: {
    filename: 'js/serverRenderer.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/**/*', to: '[path][name].[ext]' },
        { from: '_redirects', to: '' },
      ],
    }),
  ],
});
