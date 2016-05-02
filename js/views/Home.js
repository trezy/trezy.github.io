import Backbone from 'backbone'

import template from 'templates/Home.hbs'





export default class Home extends Backbone.Marionette.LayoutView {
  constructor (options) {
    options = _.extend({
      className: 'application-main',
      tagName: 'main',
      template: template
    }, options || {})

    super(options)
  }
}