import Route from '../Route'
import ContactView from 'views/Contact'





export default class Contact extends Route {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'Contact Trezy'
  }

  get view () {
    return ContactView
  }
}
