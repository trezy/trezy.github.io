import Route from '../Route'
import BlogView from 'views/Blog'
import BlogsCollection from 'collections/Blogs'





export default class Blog extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      let blogs

      if (window.blogs) {
        blogs = window.blogs

      } else {
        blogs = new BlogsCollection
        window.blogs = blogs
      }

      if (blogs.length) {
        this.viewOptions.model = blogs.findWhere({
          id: params.id
        })

      } else {
        this.viewOptions.model = blogs.add({
          id: params.id
        })
      }

      console.log(params.id, this.viewOptions.model)

      if (this.viewOptions.model.get('loaded')) {
        resolve()

      } else {
        this.viewOptions.model.fetch({
          error: reject,
          success: resolve
        })
      }
    })
  }

  onBeforeShow (params) {
    this.replaceElement = false
    this.view = BlogView
  }

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return this.viewOptions.model.get('title')
  }
}
