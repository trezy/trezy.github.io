import Backbone from 'backbone'

import template from 'templates/Blog.hbs'





export default class Blog extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      tagName: 'article',
      template: template
    })

    super(options)
  }
}
