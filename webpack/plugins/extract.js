const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const plugin = {
    production: new MiniCssExtractPlugin({ filename: '[name].bundle.css', chunkFilename: '[id].css' }),
  };

  return plugin[env];
};
