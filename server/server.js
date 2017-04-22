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
  Start the server
\******************************************************************************/

let httpServ = config.http.ssl ? require('https') : require('http')

console.log('Listening on port', config.http.port)
httpServ.createServer(app.callback()).listen(config.http.port)
