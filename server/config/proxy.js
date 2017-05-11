'use strict'





const proxy = require('koa-proxies')





module.exports = function (app, config) {

  /******************************************************************************\
    Proxy image requests
  \******************************************************************************/

  app.use(proxy('/img', {
    changeOrigin: true,
    rewrite: path => path.replace(/^\/img/, '/trezy-image'),
    target: 'https://s3.amazonaws.com',
  }))





  /******************************************************************************\
    Proxy API requests
  \******************************************************************************/

  let apiContexts = [
    '/api',
    '/auth',
  ]

  apiContexts.forEach(context => {
    app.use(proxy(context, {
      changeOrigin: true,
      target: 'https://trezy.stamplayapp.com',
    }))
  })
}