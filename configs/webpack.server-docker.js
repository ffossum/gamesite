var webpack = require("webpack");
var config = require("./webpack.server.js");

config.plugins.unshift(
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __DEVELOPMENT__: false,
    __DOCKER__: true
  })
);

module.exports = config;