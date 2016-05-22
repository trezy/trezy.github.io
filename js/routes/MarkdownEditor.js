import Route from '../Route'
import MarkdownEditorView from 'views/MarkdownEditor'
import BlogModel from 'models/Blog'





export default class MarkdownEditor extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow (params) {
    this.viewOptions.model = this.model
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    if (!this._model) {
      this._model = new BlogModel
    }

    return this._model
  }

  get view () {
    return MarkdownEditorView
  }
}
