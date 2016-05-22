import Backbone from 'backbone'
import marked from 'marked'

import template from 'templates/MarkdownEditor.hbs'





export default class MarkdownEditor extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      events: {
        'submit form': 'onSubmit'
      },
      template: template
    })

    super(options)

    this.ui = {
      editor: '[role=textbox]',
      preview: 'output',
      title: '#title'
    }
  }

  onAttach () {
    this.ui.editor.focus()
    this.stickit()
  }

  onSubmit (event) {
    this.model.save({
      error: () => {
        console.log('Error!')
      },
      success: () => {
        console.log('Success!', this.model)
      }
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get bindings () {
    return {
      '[role=textbox]': {
        observe: 'content',
        getVal: ($el, event, options) => {
          return $el[0].innerText || ' '
        },
      },
      'output': {
        observe: 'renderedContent',
        updateMethod: 'html'
      },
      '#title': 'title'
    }
  }
}
