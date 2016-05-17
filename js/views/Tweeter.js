import Backbone from 'backbone'

import TweetView from 'views/Tweet'
import template from 'templates/Tweeter.hbs'





export default class Tweeter extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
//      childViewContainer: '#tweets',
      childView: TweetView,
      className: 'tweets',
      tagName: 'ol',
      template: template
    })

    super(options)
  }
}
