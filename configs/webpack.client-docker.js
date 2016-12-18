var webpack = require("webpack");
var config = require("./webpack.client.js");

config.plugins.unshift(
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __DEVELOPMENT__: false,
    __DOCKER__: true
  })
);

module.exports = config;