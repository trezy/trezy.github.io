import Backbone from 'backbone'





export default class Route extends Backbone.Marionette.Object {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _show () {
    app.main.show(new this.view(this.viewOptions), {
      replaceElement: this.replaceElement
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    super()

    this.appChannel = Backbone.Radio.channel('application')
    this.routerChannel = Backbone.Radio.channel('router')

    this.replaceElement = true
    this.viewOptions = {
      tagName: 'main',
      template: false
    }
    this.view = Backbone.Marionette.ItemView
  }

  // no-op, always return a Promise
  loadData () {
    return Promise.resolve()
  }

  // no-op
  onBeforeShow (params) {
    return
  }

  show (params) {
    this.onBeforeShow(params)

    return new Promise((resolve, reject) => {
      this.loadData(params)
      .then(() => {
        this._show()

        resolve()
      })
      .catch(reject)
    })
  }
}
