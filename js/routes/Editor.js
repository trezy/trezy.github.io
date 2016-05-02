import Route from '../Route'
import EditorView from 'views/Editor'
import BlogModel from 'models/Blog'





export default class Editor extends Route {
  onBeforeShow () {
    let model = new BlogModel

    this.view = EditorView
    this.viewOptions.model = model

    window.model = model

    return Promise.resolve()
  }
}
