import Backbone from 'backbone'

import template from 'templates/Blog.hbs'





export default class Blog extends Backbone.Marionette.ItemView {
  constructor (options) {
    options = _.extend({
      tagName: 'main',
      template: template
    }, options || {})

    super(options)
  }
}
