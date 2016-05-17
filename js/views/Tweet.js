import Backbone from 'backbone'

import template from 'templates/Tweet.hbs'





export default class Tweeter extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      className: 'tweet',
      tagName: 'li',
      template: template
    })

    super(options)
  }
}
