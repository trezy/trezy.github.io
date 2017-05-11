'use strict'





const proxy = require('koa-proxies')





module.exports = function (app, config) {

  /******************************************************************************\
    Proxy Imgur requests
  \******************************************************************************/

  app.use(proxy('/imgur', {
    changeOrigin: true,
    headers: {
      Authorization: `Client-ID ${process.env.TREZY_IMGUR_CLIENT_ID}`
    },
    rewrite: path => path.replace(/^\/imgur/, '/'),
    target: 'https://api.imgur.com/3',
  }))





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
