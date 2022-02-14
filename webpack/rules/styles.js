const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const loader = {
    production: MiniCSSExtractPlugin.loader,
    development: 'style-loader',
  };

  return {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      { loader: loader[env] },
      {
        loader: 'css-loader',
        options: {
          esModule: false,
        },
      },
      'postcss-loader',
    ],
  };
};
