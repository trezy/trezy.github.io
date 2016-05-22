import Backbone from 'backbone'

import template from 'templates/Tweet.hbs'





export default class Tweeter extends Backbone.Marionette.ItemView {

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
    return 'li'
  }
}
