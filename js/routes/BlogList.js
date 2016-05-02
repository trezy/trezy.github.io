import Route from '../Route'
import BlogListView from 'views/BlogList'
import BlogsCollection from 'collections/Blogs'





export default class BlogList extends Route {
  onBeforeShow (params) {
    if (!window.blogs) {
      window.blogs = new BlogsCollection
    }

    this.viewOptions = {
      collection: window.blogs
    }

    this.view = BlogListView

    return Promise.resolve()
  }
}
