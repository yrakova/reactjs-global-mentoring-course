const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "main.js",
    path: dist,
  },
  resolve: {
    alias: {
      "~": src,
    },
    extensions: [".js", ".jsx", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          { loader: "css-loader", options: { modules: true } },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/",
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "ReactJS App",
      template: "./src/assets/index-template.html",
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public/**/*", to: "[path][name].[ext]" }],
    }),
  ],
};
