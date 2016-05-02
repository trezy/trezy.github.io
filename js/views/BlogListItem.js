import Backbone from 'backbone'

import template from 'templates/BlogListItem.hbs'





export default class BlogListItem extends Backbone.Marionette.ItemView {
  constructor (options) {
    options = _.extend({
      className: 'blog',
      tagName: 'li',
      template: template
    }, options || {})

    super(options)
  }
}
