import marked from 'marked'
import moment from 'moment'

import BaseModel from 'models/Base'





export default class Blog extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.on('change:content', this._renderContent)

    this.on('sync', () => {
      this.set('loaded', true)
    })
  }

  _renderContent () {
    let content = this.get('content')

    if (content) {
      this.set('renderedContent', marked(content) || '')
    }
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (model, options) {
    super(model, options)

    if (!this.isNew()) {
      this.set('created_at', moment(model.dt_create))
    }

    this.set('raw', model)

    this.url = '/api/cobject/v1/blog'

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

  toJSON () {
    let json = _.clone(this.attributes)

    delete json.loaded
    delete json.renderedContent

    return json
  }
}
