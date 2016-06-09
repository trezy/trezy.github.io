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
  count: 10,
  user_id: config.twitter.user_id
}
let ws = new (require('ws').Server)({
  port: port
})

try {
  ws.on('connection', (client) => {
    console.log('New websocket connection!')

    twitter.get('statuses/user_timeline', RESTOptions, (error, tweets, response) => {
      console.log('Got Twitter log:', tweets.length, 'tweets')
      console.log('')
      tweets.forEach((tweet) => {
        client.send(JSON.stringify({
          message: tweet,
          status: 200
        }))
      })
    })
  })

  twitter.stream('statuses/filter', streamOptions, (stream) => {
    console.log('Connecting to Twitter feed')
    stream.on('data', (tweet) => {
      console.log('tweet', tweet.text)
      console.log('')
      ws.clients.forEach((client) => {
        client.send(JSON.stringify({
          message: tweet,
          status: 200
        }))
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
