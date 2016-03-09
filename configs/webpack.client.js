var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  target: "web",
  cache: false,
  context: path.join(__dirname, '..'),
  debug: false,
  devtool: false,
  entry: ["babel-polyfill", "./src/client"],
  output: {
    path: path.join(__dirname, "../static/dist"),
    filename: "client.js",
    chunkFilename: "[name].[id].js"
  },
  plugins: [
    new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: true,  __DEVELOPMENT__: false}),
    new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [
      {test: /\.json$/, loaders: ["json"]},
      {test: /\.js$/, loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"], exclude: /node_modules/},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]!postcss-loader")}
    ],
    noParse: /\.min\.js/
  },
  postcss: function () {
    return [require('postcss-import'), require('postcss-cssnext')];
  },
  externals: {
    "lodash": "_",
    "moment": "moment",
    "react": "React",
    "react-dom": "ReactDOM"
  },
  resolve: {
    modulesDirectories: [
      "src",
      "node_modules",
      "web_modules"
    ],
    extensions: ["", ".json", ".js"]
  },
  node: {
    __dirname: true,
    fs: "empty"
  }
};
