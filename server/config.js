module.exports = {
  socket: {
    port: process.env.TREZY_SOCKET_PORT,
    ssl: false,
  },
  http: {
    port: process.env.TREZY_WEB_PORT,
    ssl: false,
  },
  twitter: {
    access_token_key: process.env.TREZY_TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TREZY_TWITTER_ACCESS_TOKEN_SECRET,
    consumer_key: process.env.TREZY_TWITTER_ACCESS_CONSUMER_KEY,
    consumer_secret: process.env.TREZY_TWITTER_ACCESS_CONSUMER_SECRET,
    languages: [
      "en"
    ],
    limit: 10,
    screen_name: process.env.TREZY_TWITTER_SCREEN_NAME,
    user_id: process.env.TREZY_TWITTER_USER_ID,
  },
}
