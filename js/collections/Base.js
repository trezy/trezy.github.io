import Backbone from 'backbone'





export default class Base extends Backbone.Collection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    return response.data
  }
}
