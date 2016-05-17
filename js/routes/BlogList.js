import Route from '../Route'
import BlogListView from 'views/BlogList'
import BlogsCollection from 'collections/Blogs'





export default class BlogList extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      if (!window.blogs) {
        let blogs = new BlogsCollection

        window.blogs = blogs
      }

      this.viewOptions.collection = blogs
      this.view = BlogListView

      blogs.fetch({
        error: reject,
        success: resolve
      })
    })
  }

  onBeforeShow (params) {
    this.replaceElement = false
  }

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'Blogs'
  }
}
