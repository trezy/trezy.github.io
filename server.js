'use strict'

// IMPORT
// =============================================================================

// Import libraries
let _ = require('underscore')
let bodyParser = require('body-parser')
//let cors = require('cors')
let express = require('express')
let fs = require('fs')
let http = require('http')
let path = require('path')
let Twitter = require('twitter')
let WebSocketServer = require('ws').Server

// Import config
let config = require('./config')


// MIDDLEWARE
// =============================================================================

let app = express()

//app.use(cors())
app.use(function (request, response, next) {
  response.set('Access-Control-Allow-Origin', '*')
  next()
})

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.set('json spaces', 2)
app.set('x-powered-by', false)

let port = config.server.port || process.env.PORT

// Combine query parameters with the request body, prioritizing the body
app.use(function (request, response, next) {
  request.body = _.extend(request.query, request.body)

  response.model = {
    data: {},
    errors: [],
    links: {
      self: request.originalUrl
    },
    meta: {
      method: request.method,
      params: _.extend(request.query, request.body),
      timing: {
        start: new Date().toISOString()
      }
    }
  }

  next()
})

// Add logging
app.use(function (request, response, next) {
  console.log('')
  console.log('TIMESTAMP:', Date.now())
  console.log('ENDPOINT:', request.originalUrl)
  console.log('METHOD:', request.method)
  console.log('DATA:', response.model.meta.params)
  next()
})




// ROUTER
// =============================================================================

// Create router
let router = express.Router()




// ROUTES
// =============================================================================

router.get('/blogs', function (request, response, next) {
  let blogDir = path.resolve(__dirname, 'blogs')
  let fileReads = []

  fs.readdirSync(blogDir).forEach((year) => {
    let yearPath = path.resolve(blogDir, year)

    fs.readdirSync(yearPath).forEach((month) => {
      let monthPath = path.resolve(yearPath, month)

      fs.readdirSync(monthPath).forEach((day) => {
        let dayPath = path.resolve(monthPath, day)

        fs.readdirSync(dayPath).forEach((blog) => {
          let blogPath = path.resolve(dayPath, blog)

          fileReads.push(new Promise((resolve, reject) => {
            fs.readFile(blogPath, 'utf8', (error, content) => {
              if (error) {
                return reject()
              }

              // Remove the file extension
              blog = blog.replace(path.extname(blog), '')

              resolve({
                date: [year, month, day].join('-'),
                filename: blog,
                title: decodeURIComponent(blog)
              })
            })
          }))
        })
      })
    })
  })

  Promise.all(fileReads)
  .then((results) => {
    response.model.data = results

    next()
  })
})

router.get('/blogs/:year/:month/:day/:blog', function (request, response, next) {
  let year = request.params.year
  let month = request.params.month
  let day = request.params.day
  let blog = request.params.blog

  let blogPath = path.resolve(__dirname, 'blogs', year, month, day, encodeURIComponent(blog) + '.md')

  fs.readFile(blogPath, 'utf8', (error, content) => {
    if (error) {
      response.model.errors.push(error)

    } else {
      response.model.data = {
        content: content,
        date: [year, month, day].join('-'),
        filename: blog,
        title: decodeURIComponent(blog)
      }

      next()
    }
  })
})

// Register routes
app.use('/', router)


// Send the response
app.use(function (request, response) {
  if (response.model.errors.length) {
    delete response.model.data
  } else {
    delete response.model.errors
  }

  response.model.meta.timing.end = new Date().toISOString()

//  setTimeout(() => {
    response.send(response.model)
//  }, 5000)
})





// START THE SERVER
// =============================================================================

let httpServer = http.Server(app)

let server = httpServer.listen(port, function () {
  console.log('Listening on port', port)
})





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
let wss = new WebSocketServer({server: server})

try {
  wss.on('connection', (client) => {
    twitter.get('statuses/user_timeline', RESTOptions, (error, tweets, response) => {
      client.send(JSON.stringify(tweets))
    })
  })

  twitter.stream('statuses/filter', streamOptions, (stream) => {
    stream.on('data', (tweet) => {
      wss.clients.forEach((client) => {
        console.log('Tweet:', tweet.text)
        client.send(JSON.stringify(tweet))
      })
    })
  })

} catch (error) {
  console.error(error)

  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      message: 'No Twitter connection available. Stay tuned.'
    }))
  })
}
