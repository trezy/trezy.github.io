import Backbone from 'backbone'

import template from 'templates/Gifs.hbs'





export default class Gifs extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get tagName () {
    return 'main'
  }
}
