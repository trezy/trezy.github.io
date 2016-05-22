import moment from 'moment'

import BaseCollection from 'collections/Base'
import Tweet from 'models/Tweet'

import config from '../../config.json'





export default class Tweets extends BaseCollection {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.socket.onmessage = this.onMessage.bind(this)
//    this.on('add', this._limit)
  }

  _limit () {
    if (this.length > 100) {
      this.remove(this.min((model) => {
        return model.attributes.timestamp_ms
      }))
    }
  }

  _renderEntities (text, entities) {
    let allEntities = []

    if (entities['hashtags']) {
      allEntities = allEntities.concat(this._renderHashtags(entities['hashtags']))
    }

    if (entities['media']){
      allEntities = allEntities.concat(this._renderURLs(entities['media']))
    }

    if (entities['urls']){
      allEntities = allEntities.concat(this._renderURLs(entities['urls']))
    }

    if (entities['user_mentions']){
      allEntities = allEntities.concat(this._renderUserMentions(entities['user_mentions']))
    }

    allEntities.sort((a, b) => {
      let start1 = a.start
      let start2 = b.start

      if (start1 < start2) {
        return 1
      }

      if (start1 > start2) {
        return -1
      }

      return 0
    })

    allEntities.forEach((entity) => {
      text = text.substring(0, entity.start) + entity.replacement + text.substring(entity.end)
    })

    return text
  }

  _renderHashtag (hashtag) {
    return {
      end: hashtag.indices[1],
      replacement: `<a href="http://twitter.com/hashtag/${hashtag.text}">#${hashtag.text}</a>`,
      start: hashtag.indices[0]
    }
  }

  _renderHashtags (hashtags) {
    let ret = []

    hashtags.forEach((hashtag) => {
      ret.push(this._renderHashtag(hashtag))
    })

    return ret
  }

  _renderURL (url) {
    return {
      end: url.indices[1],
      replacement: `<a href="${url.expanded_url}">${url.display_url}</a>`,
      start: url.indices[0]
    }
  }

  _renderURLs (urls) {
    let ret = []

    urls.forEach((url) => {
      ret.push(this._renderURL(url))
    })

    return ret
  }

  _renderUserMention (userMention) {
    return {
      end: userMention.indices[1],
      replacement: `<a href="http://twitter.com/${userMention.screen_name}">@${userMention.screen_name}</a>`,
      start: userMention.indices[0]
    }
  }

  _renderUserMentions (userMentions) {
    let ret = []

    userMentions.forEach((userMention) => {
      ret.push(this._renderUserMention(userMention))
    })

    return ret
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    -model.get('date')
  }

  constructor (models, options) {
    options = _.extend(options || {}, {
      model: Tweet
    })

    super(models, options)

    try {
      this.socket = new WebSocket(this.url)

      this._bindEvents()

    } catch (error) {
      this.trigger('error', error)
    }
  }

  onMessage (event) {
    if (event.status == 200) {
      this.add(this.parse(event.data.message))

    } else {
      this.trigger('error', event.data)
    }
  }

  parse (tweets) {
    if (typeof tweets === 'string') {
      tweets = JSON.parse(tweets)
    }

    if (!Array.isArray(tweets)) {
      tweets = [tweets]
    }

    tweets.forEach((tweet, index) => {
      let adorableAvatar = `//api.adorable.io/avatars/48/${tweet.user.screen_name}.png`
      let eightBitAvatar = `//eightbitavatar.herokuapp.com/?id=${tweet.user.screen_name}&s=male&size=48`

      tweets[index] = {
        date: moment(new Date(tweet.created_at)).fromNow(),
        id: tweet.id_str,
        gallery: [],
        raw: tweet,
        renderedText: this._renderEntities(tweet.text, tweet.entities),
        text: tweet.text,
        user: {
          avatar: tweet.user.profile_image_url || adorableAvatar,
          description: tweet.user.description,
          name: tweet.user.name,
          screen_name: tweet.user.screen_name
        }
      }

      if (tweet.entities.extended_entities || tweet.entities.expanded_entities) {
        console.log(tweet)
      }
    })

    return tweets
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get url () {
    let url = `ws://${location.host}`

    if (location.port) {
      url += `:${location.port}`
    }

    return url
  }
}
