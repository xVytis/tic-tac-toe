module.exports = () => {
  return {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
        transpileOnly: true,
    },
    exclude: /node_modules/,
  };
};
