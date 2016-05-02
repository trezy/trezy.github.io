import Route from '../Route'
import HomeView from 'views/Home'





export default class Home extends Route {
  onBeforeShow () {
    this.view = HomeView

    return Promise.resolve()
  }
}
