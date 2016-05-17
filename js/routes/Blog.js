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
      if (!window.blogs) {
        let blogs = new BlogsCollection

        window.blogs = blogs

        blogs.fetch({
          error: reject,
          success: () => {
            this._getBlog(params.name)
            .then(resolve)
            .catch(reject)
          }
        })

      } else {
        this._getBlog(params.name)
        .then(resolve)
        .catch(reject)
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
