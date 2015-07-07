module.exports = {
  options: {
    spawn: true,
    interrupt: true
  },

  //babel: {
  //  files: [
  //    'es6/**/*.js'
  //  ],
  //  tasks: [
  //    'newer:babel'
  //  ]
  //},

  sass: {
    files: [
      'scss/**/*.scss'
    ],
    tasks: [
      'sass',
      'autoprefixer'
    ]
  }
}
