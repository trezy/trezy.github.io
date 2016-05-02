import marked from 'marked'
import moment from 'moment'

import BaseModel from 'models/Base'





export default class Blog extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.on('change:content', this._renderContent)
  }

  _renderContent () {
    let content = this.get('content')

    if (content) {
      this.set('renderedContent', marked(content))
    }
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (model, options) {
    if (model && model.date) {
      model.date = new moment(model.date)
    }

    super(model, options)

    this._renderContent()
    this._bindEvents()
  }

  defaults () {
    return {
      content: '',
      loaded: false,
      renderedContent: ''
    }
  }

  load () {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3001/blogs' + this.get('date').format('/YYYY/MM/DD/') + this.get('filename'))
      .then((response) => {
        response.json()
        .then((response) => {
          Object.keys(response.data).forEach((key) => {
            this.set(key, response.data[key])
          })

          this.set('loaded', true)

          resolve(this)
        })
      })
    })
  }
}
