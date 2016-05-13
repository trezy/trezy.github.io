import Backbone from 'backbone'





export default class Route extends Backbone.Marionette.Object {
  show (params) {
    this.onBeforeShow(params)
    .then(() => {
      if (!this.view) {
        this.view = Backbone.Marionette.ItemView
      }

      app.main.show(new this.view(this.viewOptions), {
        replaceElement: true
      })
    })
  }

  onBeforeShow (params) {
    return Promise.resolve()
  }

  onError (error) {
    console.error(error)
  }

  constructor (options) {
    super(options || {})

    this.appChannel = Backbone.Radio.channel('application')
    this.routerChannel = Backbone.Radio.channel('router')

    this.viewOptions = {
      tagName: 'main',
      template: false
    }
  }
}
