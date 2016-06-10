'use strict'

let serveStatic = require('serve-static')

let config = require('../config')





module.exports = {
  app: {
    options: {
      keepalive: config.server.keepalive,

      middleware: function (connect, options) {
        let middlewares = [
          require('connect-livereload')({
            rules: [{
              match: /<\/head>(?![\s\S]*<\/head>)/i,
              fn: function (match, script) {
                return script + match
              }
            }]
          }),
          require('grunt-connect-proxy/lib/utils').proxyRequest,
          require('connect-pushstate')()
        ]

        if (!Array.isArray(options.base)) {
          options.base = [options.base]
        }

        options.base.forEach(function (base) {
          middlewares.push(serveStatic(base))
        })

        return middlewares
      },
      port: config.server.port
    },

    proxies: [
      {
        context: [
          '/api',
          '/auth'
        ],
        headers: {
          host: 'trezy.stamplayapp.com'
        },
        host: 'trezy.stamplayapp.com',
        https: true
      }
    ]
  }
}
