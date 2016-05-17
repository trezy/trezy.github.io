import Backbone from 'backbone'

import BlogListItemView from 'views/BlogListItem'
import template from 'templates/BlogListGroup.hbs'





export default class BlogListGroup extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      childViewContainer: 'dd',
      childView: BlogListItemView,
      tagName: 'dl',
      template: template
    })

    super(options)

    this.collection = new Backbone.Collection(_.toArray(this.model.attributes))
    this.model.set('year', this.collection.at(0).get('date').format('YYYY'))
  }
}
