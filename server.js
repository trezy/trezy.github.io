'use strict'

// IMPORT
// =============================================================================

// Import libraries
let _ = require('underscore')
let Twitter = require('twitter')
let WebSocketServer = require('ws').Server

// Import config
let config = require('./config')

let port = config.api.port || process.env.PORT





// SOCKET
// =============================================================================

let twitter = new Twitter(config.twitter)
let streamOptions = {
  follow: config.twitter.user_id
}
let RESTOptions = {
  count: 200,
  user_id: config.twitter.user_id
}
let ws = new (require('ws').Server)({
  port: port
})

try {
  ws.on('connection', (client) => {
    twitter.get('statuses/user_timeline', RESTOptions, (error, tweets, response) => {
      client.send(JSON.stringify(tweets))
    })
  })

  twitter.stream('statuses/filter', streamOptions, (stream) => {
    stream.on('data', (tweet) => {
      ws.clients.forEach((client) => {
        let json = {
          message: tweet,
          status: 200
        }

        client.send(JSON.stringify(json))
      })
    })
  })

} catch (error) {
  let json = {
    message: 'No Twitter connection available. Try again later.',
    status: 404
  }

  console.error(error)

  ws.clients.forEach((client) => {
    client.send(JSON.stringify(json))
    client.close()
  })
}
