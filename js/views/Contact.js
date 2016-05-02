import Backbone from 'backbone'

import template from 'templates/Contact.hbs'





export default class Contact extends Backbone.Marionette.ItemView {
  constructor (options) {
    options = _.extend({
      className: 'application-main',
      tagName: 'main',
      template: template
    }, options || {})

    super(options)
  }
}
