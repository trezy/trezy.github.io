import Route from '../Route'
import TweeterView from 'views/Tweeter'
import TweetsCollection from 'collections/Tweets'





export default class Tweeter extends Route {
  onBeforeShow (params) {
    if (!window.tweets) {
      window.tweets = new TweetsCollection
    }

    this.viewOptions = {
      collection: window.tweets
    }

    this.view = TweeterView

    return Promise.resolve()
  }
}
