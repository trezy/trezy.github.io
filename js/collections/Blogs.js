import _ from 'underscore'

import BaseAPICollection from 'collections/BaseAPI'
import Blog from 'models/Blog'





export default class Blogs extends BaseAPICollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return -model.get('date')
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return Blog
  }

  get url () {
    return '/api/cobject/v1/blog'
  }
}
