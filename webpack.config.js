const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "main.js"),
  output: {
    filename: "bundle=[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]_[local]--[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin("UM007"),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin("dist/*.*", {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.tmpl.html"
    })
  ],
  resolve: {
    extensions: ["json", ".js", ".jsx", ".css"]
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    port: 8081,
    hot: true,
    inline: true
  }
};
