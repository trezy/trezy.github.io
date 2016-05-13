import Backbone from 'backbone'

import Router from './Router'
import Routes from './Routes'
import RootView from 'views/Root'





export default class App extends Backbone.Marionette.Application {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.routerChannel.on('before:navigate', () => {
      this.main.empty()
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor () {
    super()

    // We need to use `.extend()` to pass in the routes because ES6 doesn't
    // allow properties to be set before initialization
    this.Router = new (Router.extend(Routes))

    // Grab the application channel so we can use it to handle most events
    this.channel = Backbone.Radio.channel('application')

    // Grab the router channel so we can react to routing events
    this.routerChannel = Backbone.Radio.channel('router')
  }

  onStart () {
    // The RootView will render itself so that we don't need to do it manually
    this.RootView = new RootView

    // The `main` region is where we'll show pretty much every view so we'll
    // attach it to the app object for easy access
    this.main = this.RootView.getRegion('main')

    // Start the router with push routing
    Backbone.history.start({
      pushState: true
    })

    // Backbone.Intercept prevents anchors and form submissions from changing
    // the URL
    Backbone.Intercept.start()

    this._bindEvents()
  }
}
