const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const src = path.resolve(__dirname, '..', 'src');
const dist = path.resolve(__dirname, '..', 'dist');

const isDevMod = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,  
  output: {
    filename: 'js/[name].js',
    path: dist,
    publicPath: '/',
  },
  resolve: {
    alias: {
      '~': src,
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include: /src/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                minimize: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      },
    ],
  },  
};
