import Route from '../Route'
import BlogView from 'views/Blog'
import BlogsCollection from 'collections/Blogs'





export default class Blog extends Route {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _getBlog (name) {
    return new Promise((resolve, reject) => {
      let blog = window.blogs.findWhere({
        title: name
      })

      if (blog && blog.get('loaded')) {
        this.viewOptions.model = blog

        resolve()

      } else if (blog) {
        blog.load()
        .then((blog) => {
          this.viewOptions.model = blog

          resolve()
        })
        .catch(reject)

      } else {
        reject('Couldn\'t find blog')
      }
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      let blog
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
