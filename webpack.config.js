const path = require('path');

module.exports = {
  entry: './web/app.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'app_min.js',
    libraryTarget: 'window',
  },
};
