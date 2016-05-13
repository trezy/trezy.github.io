import _ from 'underscore'

import BaseCollection from 'collections/Base'
import Blog from 'models/Blog'





export default class Blogs extends BaseCollection {
  comparator (model) {
    return -model.get('date')
  }

  constructor (options) {
    options = _.extend({
      model: Blog
    }, options || {})

    super(options)

    this.model = Blog
    this.url = 'http://localhost:3001/blogs'
  }
}
