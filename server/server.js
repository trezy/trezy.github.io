'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

const config = require('./config')





/******************************************************************************\
  Initialize the app
\******************************************************************************/

// Start Koa
const app = new (require('koa'))

// Configure proxies
require('./config/proxy')(app, config)

// Configure middleware, et al
require('./config/koa')(app, config)

// Configure static file serving
require('./config/serve')(app, config)

// Configure the router
require('./config/router')(app, config)





/******************************************************************************\
  Create the server
\******************************************************************************/

let httpServ

if (config.http.ssl) {
  let fs = require('fs')
  let https = require('https')

  httpServ = https.createServer({
    key: fs.readFileSync(config.http.ssl.key),
    cert: fs.readFileSync(config.http.ssl.cert),
  }, app.callback()).listen(config.http.port)

} else {
  let http = require('http')

  httpServ = http.createServer(app.callback()).listen(config.http.port)
}





/******************************************************************************\
  Connect the socket server
\******************************************************************************/

require('./config/socket')(httpServ, config)





/******************************************************************************\
  Start the server
\******************************************************************************/

httpServ.listen(config.http.port)
console.log('Listening on port', config.http.port)
