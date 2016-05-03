import Backbone from 'backbone'

import NavView from 'views/Nav'
import template from 'templates/Header.hbs'





export default class Header extends Backbone.Marionette.LayoutView {
  constructor (options) {
    options = _.extend({
      attributes: {
        role: 'banner'
      },
      regions: {
        brand: '.brand',
        nav: 'nav'
      },
      tagName: 'header',
      template: template
    }, options || {})

    super(options)
  }

  onBeforeShow () {
    this.getRegion('nav').show(new NavView, {
      replaceElement: true
    })
  }
}
