import Backbone from 'backbone'

import template from 'templates/Tweet.hbs'





export default class Tweeter extends Backbone.Marionette.ItemView {
  constructor (options) {
    options = _.extend({
      className: 'tweet',
      tagName: 'li',
      template: template
    }, options || {})

    super(options)
  }
}
