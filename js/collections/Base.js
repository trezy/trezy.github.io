import Backbone from 'backbone'





export default class Base extends Backbone.Collection {
  parse (response) {
    return response.data
  }
}
