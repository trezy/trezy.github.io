module.exports = {
  app: {
    entry: './es6/index.js',
    output: {
      path: 'js',
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel'
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }]
    },
    stats: {
      colors: true,
      modules: true,
      reasons: true
    }
  }
}
