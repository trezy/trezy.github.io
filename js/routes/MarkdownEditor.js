import Route from '../Route'
import MarkdownEditorView from 'views/MarkdownEditor'
import BlogModel from 'models/Blog'





export default class MarkdownEditor extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow (params) {
    let model = new BlogModel

    this.view = MarkdownEditorView
    this.viewOptions.model = model
  }
}
