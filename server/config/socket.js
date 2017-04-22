'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

let Twitter = require('twitter')





module.exports = function (server, config) {
  let tweetCache = []
  let twitter = new Twitter(config.twitter)
  let streamOptions = {
    follow: config.twitter.user_id
  }
  let RESTOptions = {
    count: config.twitter.limit,
    user_id: config.twitter.user_id
  }
  let ws = new (require('ws').Server)({
    server: server
  })





  try {
    twitter.get('statuses/user_timeline', RESTOptions, (error, tweets, response) => {
      console.log('Got Twitter log:', tweets.length, 'tweets')
      console.log('')

      tweets.forEach((tweet) => {
        tweetCache.push({
          message: tweet,
          status: 200
        })
      })
    })

    ws.on('connection', (client) => {
      console.log(`New websocket connection! Sending ${tweetCache.length} tweets...`)

      tweetCache.forEach((tweet) => {
        client.send(JSON.stringify(tweet))
      })
    })

    twitter.stream('statuses/filter', streamOptions, (stream) => {
      console.log('Connecting to Twitter feed')
      stream.on('data', (tweet) => {
        ws.clients.forEach((client) => {
          tweet = {
            message: tweet,
            status: 200
          }

          tweetCache.push(tweet)
          client.send(JSON.stringify(tweet))
        })

        while (tweetCache.length > config.twitter.limit) {
          tweetCache.shift()
        }
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
}
