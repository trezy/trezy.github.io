import Backbone from 'backbone'





export default class Base extends Backbone.Model {
  constructor (model, options) {
    super(model, options)

    this.idAttribute = '_id'
    this.sync = new Backbone.Hoard.Control().getModelSync()
  }

  parse (response) {
    if (response.data) {
      return response.data[0]

    } else {
      return response
    }
  }
}
