import Backbone from 'backbone'





export default class Router extends Backbone.BaseRouter {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.channel.on('route', this.navigate)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor () {
    super()

    this.channel = Backbone.Radio.channel('router')
  }

  onNavigate (routeData) {
    this.channel.trigger('before:navigate', routeData.linked)

    routeData.linked.show(routeData.params)
    .then(() => {
      this.channel.trigger('navigate', routeData.linked)
    })
    .catch(() => {
      this.channel.trigger('error')
    })
  }
}
