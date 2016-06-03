import Backbone from 'backbone'

import template from 'templates/Tweet.hbs'





export default class Tweet extends Backbone.Marionette.LayoutView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get regions () {
    return this._regions = {
      media: '.media'
    }
  }

  get tagName () {
    return 'li'
  }

  get template () {
    return template
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set regions (value) {
    this._regions = value
  }
}
