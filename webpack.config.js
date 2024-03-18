const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^net$/,
      contextRegExp: /mysql2$/,
    }),
  ],
};
