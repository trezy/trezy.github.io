import Backbone from 'backbone'





export default class Router extends Backbone.BaseRouter {
  _bindEvents () {
    this.channel.on('route', this.navigate)
  }

  constructor () {
    super()

    this.channel = Backbone.Radio.channel('router')
  }

  onNavigate (routeData) {
    this.channel.trigger('before:navigate')

    routeData.linked.show(routeData.params)

    this.channel.trigger('navigate')
  }
}
