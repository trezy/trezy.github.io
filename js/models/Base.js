import Backbone from 'backbone'





export default class Base extends Backbone.Model {
  constructor (model, options) {
    super(model, options)

    this.sync = new Backbone.Hoard.Control().getModelSync()
  }
}
