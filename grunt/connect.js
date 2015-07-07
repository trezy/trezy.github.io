module.exports = {
  dev: {
    options: {
      port: 9001
    }
  },
  dist: {
    options: {
      base: 'dist',
      keepalive: true,
      port: 9001
    }
  }
}
