import Backbone from 'backbone'

import NavView from 'views/Nav'
import template from 'templates/Header.hbs'





export default class Header extends Backbone.Marionette.LayoutView {
  constructor (options) {
    options = _.extend({
      className: 'application-header',
      regions: {
        brand: '.brand',
        nav: '.application-nav'
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
