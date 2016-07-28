var webpack = require("webpack");
var config = require("./webpack.client.js");
var hostname = "localhost";
var port = 3000;

config.cache = true;
config.debug = true;
config.devtool = "#inline-source-map";
config.externals = {};

config.entry.unshift(
  "source-map-support/register",
  "webpack-dev-server/client?http://" + hostname + ":" + port,
  "webpack/hot/only-dev-server"
);

config.output.publicPath = "http://" + hostname + ":" + port + "/dist/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
  new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: false,  __DEVELOPMENT__: true}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

config.module.loaders = [
  {test: /\.json$/, loaders: ["json"]},
  {test: /\.js$/, loaders: ["babel?cacheDirectory&presets[]=es2015&presets[]=stage-0&presets[]=react&presets[]=react-hmre"], exclude: /node_modules/},
  {test: /\.css$/, loader: "style-loader!css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]!postcss-loader"}
];

config.devServer = {
  publicPath: config.output.publicPath,
  hot: true,
  inline: false,
  lazy: false,
  quiet: false,
  noInfo: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
  },
  stats: {colors: true},
  host: hostname,
  port
};

module.exports = config;
