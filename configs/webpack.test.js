var path = require('path');
var glob = require('glob');

var config = require("./webpack.server.js");

config.devtool = 'source-map';
config.entry = ["babel-polyfill", ...glob.sync("./src/**/*.spec.js")];
config.output = {
  path: path.join(__dirname, "../test"),
  filename: "test.js"
};

module.exports = config;
