import Backbone from 'backbone'

import template from 'templates/Editor.hbs'





export default class Editor extends Backbone.Marionette.ItemView {
  constructor (options) {
    options = _.extend({
      className: 'application-main',
      tagName: 'main',
      template: template
    }, options || {})

    super(options)

    this.ui = {
      editor: '#editor',
      preview: '#preview'
    }

    this.bindings = {
      '#editor': 'content',
      '#preview': 'renderedContent'
    }
  }

  onAttach () {
    this.stickit()
  }
}
