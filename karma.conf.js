var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'src/**/*.spec.js',
    ],
    preprocessors: {
      'src/**/*.js': ['webpack'],
    },
    reporters: ['mocha', 'coverage'],
    webpack: {
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules',
        ],
        extensions: ['', '.json', '.js'],
      },
      module: {
        preLoaders: [
          {
            test: /\.spec\.js$/,
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            loader: 'babel',
          },
          {
            test: /\.js?$/,
            include: path.join(__dirname, 'src'),
            exclude: /(node_modules|\.spec\.js$)/,
            loader: 'babel-istanbul',
          },
        ],
        loaders: [
          { test: /\.json$/, loaders: ['json'] },
          { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
          { test: /\.css$/, loader: 'css-loader/locals!postcss-loader' },
        ],
      },
      postcss() {
        return [require('postcss-import'), require('postcss-cssnext')];
      },
    },
    webpackServer: {
      noInfo: true,
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'test/coverage/',
      subdir: '.',
    },
  });
};
