import Backbone from 'backbone'

import template from 'templates/Contact.hbs'





export default class Contact extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }
}
