import Route from '../Route'
import AboutView from 'views/About'





export default class About extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow (params) {
    this.view = AboutView
  }

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'About Trezy'
  }
}
