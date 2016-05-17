import Backbone from 'backbone'

import HeaderView from 'views/Header'
import template from 'templates/Root.hbs'





export default class Root extends Backbone.Marionette.LayoutView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      el: 'body',
      regions: {
        footer: 'footer',
        header: 'header',
        main: 'main'
      },
      template: template
    })

    super(options)
  }

  initialize () {
    this.render()
  }

  onRender () {
    this.getRegion('header').show(new HeaderView, {
      replaceElement: true
    })
  }
}
