import Route from '../Route'
import TweeterView from 'views/Tweeter'
import TweetsCollection from 'collections/Tweets'





export default class Tweeter extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      this.viewOptions.collection = new TweetsCollection

      if (!window.tweets) {
        window.tweets = this.viewOptions.collection
      }

      let timer = setTimeout(reject, 5000)

      this.viewOptions.collection.once('add', () => {
        clearTimeout(timer)
        resolve()
      })
    })
  }

  onBeforeShow (params) {
    this.replaceElement = false
    this.view = TweeterView
  }

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'Tweets'
  }
}
