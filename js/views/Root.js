import Backbone from 'backbone'

import HeaderView from 'views/Header'
import template from 'templates/Root.hbs'





export default class Root extends Backbone.Marionette.LayoutView {
  constructor (options) {
    options = _.extend({
      el: 'body',
      regions: {
        footer: '.application-footer',
        header: '.application-header',
        main: '.application-main'
      },
      template: template
    }, options || {})

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
