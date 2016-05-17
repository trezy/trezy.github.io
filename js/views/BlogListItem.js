import Backbone from 'backbone'

import template from 'templates/BlogListItem.hbs'





export default class BlogListItem extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      className: 'blog',
      tagName: 'li',
      template: template
    })

    super(options)
  }
}
