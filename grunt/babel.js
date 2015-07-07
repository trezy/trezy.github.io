module.exports = {
  options: {
    sourceMap: true
  },
  app: {
    files: [{
      expand: true,
      cwd: 'es6',
      src: '**/*.js',
      dest: 'js'
    }]
  }
}
