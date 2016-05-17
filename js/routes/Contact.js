import Route from '../Route'
import ContactView from 'views/Contact'





export default class Contact extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow (params) {
    this.view = ContactView
  }

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'Contact Trezy'
  }
}
