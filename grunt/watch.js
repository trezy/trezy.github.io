module.exports = {
  options: {
    interrupt: true,
    livereload: true,
    spawn: true
  },

  appJS: {
    files: [
      'bower.json',
      'config.json',
      'package.json',
      'js/**/*.js',
      'templates/**/*.hbs'
    ],
    tasks: [
      'buildJS'
    ]
  },

  appCSS: {
    files: [
      'scss/**/*.scss',
      '!scss/lib.scss'
    ],
    tasks: [
      'buildAppCSS'
    ],
    options: {
      livereload: true
    }
  },

  libCSS: {
    files: [
      'scss/lib.scss'
    ],
    tasks: [
      'buildLibCSS'
    ],
    options: {
      livereload: true
    }
  }
}
