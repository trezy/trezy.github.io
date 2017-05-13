import Backbone from 'backbone'

import template from 'templates/Nav.hbs'





export default class Nav extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get events () {
    return this._events || (this._events = {
      'click a': () => {
        document.querySelector('#nav-control').checked = false
      },
      'keyup': event => {
        console.log(event.which)
//        if (event.which === 0) {}
      }
    })
  }

  get tagName () {
    return 'nav'
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }
}
