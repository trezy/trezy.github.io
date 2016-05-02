import Route from '../Route'
import AboutView from 'views/About'





export default class About extends Route {
  onBeforeShow () {
    this.view = AboutView

    return Promise.resolve()
  }
}
