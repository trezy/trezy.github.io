import Route from '../Route'
import GifsView from 'views/Gifs'





export default class Gifs extends Route {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'Gifs'
  }

  get view () {
    return GifsView
  }
}
