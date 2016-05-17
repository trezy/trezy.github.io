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
  }

  onBeforeShow (params) {
    this.view = Backbone.Marionette.ItemView
  }

  onError (error) {
    console.error(error)
  }

  show (params) {
    return new Promise((resolve, reject) => {
      if (this.onBeforeShow) {
        this.onBeforeShow(params)
      }

      if (this.loadData) {
        this.loadData(params)
        .then(() => {
          this._show()

          resolve()
        })
        .catch((error) => {
          reject(error)
          this.onError(error)
        })

      } else {
        this._show()

        resolve()
      }
    })
  }
}
