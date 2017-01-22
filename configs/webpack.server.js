var webpack = require("webpack");
var path = require("path");
var fs = require('fs');

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  target: "node",
  cache: false,
  context: path.join(__dirname, '..'),
  entry: ["babel-polyfill", "./src/server/bluebirdPolyfill", "./src/server"],
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "server.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __DEVELOPMENT__: false,
      __DOCKER__: false
    }),
    new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}})
  ],
  module: {
    loaders: [
      {test: /\.json$/, loaders: ["json-loader"]},
      {test: /\.js$/, loaders: ["babel-loader"], exclude: /node_modules/},
      {test: /\.css$/, loader: "css-loader/locals?modules&localIdentName=[name]-[local]-[hash:base64:5]!postcss-loader"}
    ],
    noParse: /\.min\.js/
  },
  postcss: function () {
    return [require('postcss-import'), require('postcss-cssnext')];
  },
  externals: nodeModules,
  resolve: {
    modulesDirectories: [
      "src",
      "node_modules"
    ]
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
};
