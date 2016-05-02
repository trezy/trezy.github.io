import Backbone from 'backbone'

import BlogListItemView from 'views/BlogListItem'
import template from 'templates/BlogList.hbs'





export default class BlogList extends Backbone.Marionette.CompositeView {
  constructor (options) {
    options = _.extend({
      childViewContainer: '#blog-list',
      childView: BlogListItemView,
      className: 'application-main',
      tagName: 'main',
      template: template
    }, options || {})

    super(options)
  }
}
