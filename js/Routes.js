import Route from './Route'

import AboutRoute from 'routes/About'
import BlogListRoute from 'routes/BlogList'
import BlogRoute from 'routes/Blog'
import ContactRoute from 'routes/Contact'
import GifsRoute from 'routes/Gifs'
import MarkdownEditorRoute from 'routes/MarkdownEditor'
import TweeterRoute from 'routes/Tweeter'





export default {
  routes: {
    'about(/)': new AboutRoute,
    'blog/edit(/)': new MarkdownEditorRoute,
    'blog/edit/:id(/)': new MarkdownEditorRoute,
    'blog/:id(/)': new BlogRoute,
    'blog(/)': new BlogListRoute,
    'contact(/)': new ContactRoute,
    'gifs(/)': new GifsRoute,
    'tweeter(/)': new TweeterRoute,
    '*notfound': new AboutRoute
  }
}
