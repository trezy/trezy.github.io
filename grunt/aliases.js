module.exports = {
  default: [
    'server'
  ],

  server: [
    'build',
    'connect:dev',
    'watch'
  ],

  build: [
    'clean',
    'webpack',
    'sass',
    'autoprefixer'
  ],

  dist: [
    'build',
    'copy',
    'processhtml'
  ]
}
