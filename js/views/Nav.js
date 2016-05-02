import Backbone from 'backbone'

import template from 'templates/Nav.hbs'





export default class Nav extends Backbone.Marionette.ItemView {
  constructor (options) {
    options = _.extend({
      className: 'application-nav',
      tagName: 'nav',
      template: template
    }, options || {})

    super(options)
  }
}
