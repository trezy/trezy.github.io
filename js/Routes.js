import Route from './Route'

import AboutRoute from 'routes/About'
import BlogListRoute from 'routes/BlogList'
import BlogRoute from 'routes/Blog'
import ContactRoute from 'routes/Contact'
import MarkdownEditorRoute from 'routes/MarkdownEditor'
import TweeterRoute from 'routes/Tweeter'





export default {
  routes: {
    'about(/)': new AboutRoute,
    'blog/new(/)': new MarkdownEditorRoute,
    'blog/:name(/)': new BlogRoute,
    'blog(/)': new BlogListRoute,
    'contact(/)': new ContactRoute,
    'tweeter(/)': new TweeterRoute,
    '*notfound': new AboutRoute
  }
}
