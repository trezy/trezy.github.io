import Backbone from 'backbone'
import marked from 'marked'

import template from 'templates/MarkdownEditor.hbs'





export default class MarkdownEditor extends Backbone.Marionette.ItemView {
  constructor (options) {
    options = _.extend({
      tagName: 'main',
      template: template
    }, options || {})

    super(options)

    this.ui = {
      editor: '[role=textbox]',
      preview: 'output'
    }

    this.bindings = {
      '[role=textbox]': {
        observe: 'content',
        getVal: ($el, event, options) => {
          return $el[0].innerText || ' '
        },
      },
      'output': {
        observe: 'renderedContent',
        updateMethod: 'html'
      }
    }
  }

  onAttach () {
    this.ui.editor.focus()
    this.stickit()
  }
}
