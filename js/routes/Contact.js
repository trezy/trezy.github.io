import Route from '../Route'
import ContactView from 'views/Contact'





export default class Contact extends Route {
  onBeforeShow () {
    this.view = ContactView

    return Promise.resolve()
  }
}
