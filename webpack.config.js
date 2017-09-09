var path = require('path');

module.exports = {
  entry: './client/src/index.js',
  devtool:'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  module: {
    rules: [
      //my regex could be more minimal. Meh.
      {test: /.*\.(hbs|handlebars)/, use: 'handlebars-loader'},
      {test: path.resolve(__dirname,'client/src/client-api.js'), use: [{
        loader: 'expose-loader',
        options: 'ajaxdata'
      }]}
    ]
  },
  externals: {
    jquery: 'jQuery'
  }
};
