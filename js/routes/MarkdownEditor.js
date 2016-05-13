import Route from '../Route'
import MarkdownEditorView from 'views/MarkdownEditor'
import BlogModel from 'models/Blog'





export default class MarkdownEditor extends Route {
  onBeforeShow () {
    let model = new BlogModel

    this.view = MarkdownEditorView
    this.viewOptions.model = model

    window.model = model

    return Promise.resolve()
  }
}
