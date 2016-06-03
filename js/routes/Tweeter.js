import Route from '../Route'
import TweeterView from 'views/Tweeter'





export default class Tweeter extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      this.viewOptions.collection = this.appChannel.request('tweets')

      let timer = setTimeout(() => {
        reject(new Error('Couldn\'t load Tweets'))
      }, 5000)

      this.viewOptions.collection.once('add', () => {
        clearTimeout(timer)
        resolve()
      })
    })
  }

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get replaceElement () {
    return false
  }

  get title () {
    return 'Tweets'
  }

  get view () {
    return TweeterView
  }
}
