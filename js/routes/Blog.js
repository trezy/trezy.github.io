import Route from '../Route'
import BlogView from 'views/Blog'
import BlogsCollection from 'collections/Blogs'





export default class Blog extends Route {
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

      } else {
        reject('Couldn\'t find blog')
      }
    })
  }

  onBeforeShow (params) {
    this.view = BlogView

    return new Promise((resolve, reject) => {
      if (!window.blogs) {
        window.blogs = new BlogsCollection
        window.blogs.once('sync', () => {
          this._getBlog(params.name)
          .then(resolve)
        })

      } else {
        this._getBlog(params.name)
        .then(resolve)
      }
    })
  }
}
