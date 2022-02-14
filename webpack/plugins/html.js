const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) =>
  new HtmlWebpackPlugin({
    hash: true,
    filename: 'index.html',
    template: 'public/index.html',
  });
