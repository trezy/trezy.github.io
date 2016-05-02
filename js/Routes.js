import AboutRoute from 'routes/About'
import BlogListRoute from 'routes/BlogList'
import BlogRoute from 'routes/Blog'
import ContactRoute from 'routes/Contact'
import EditorRoute from 'routes/Editor'
import HomeRoute from 'routes/Home'
import TweeterRoute from 'routes/Tweeter'





export default {
  routes: {
    'about(/)': new AboutRoute,
    'blog/new(/)': new EditorRoute,
    'blog/:name(/)': new BlogRoute,
    'blog(/)': new BlogListRoute,
    'contact(/)': new ContactRoute,
    'tweeter(/)': new TweeterRoute,
    '*notfound': new HomeRoute
  }
}
