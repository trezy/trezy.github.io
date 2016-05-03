import Backbone from 'backbone'

import TweetView from 'views/Tweet'
import template from 'templates/Tweeter.hbs'





export default class Tweeter extends Backbone.Marionette.CompositeView {
  constructor (options) {
    options = _.extend({
      childViewContainer: '#tweet-list',
      childView: TweetView,
      tagName: 'main',
      template: template
    }, options || {})

    super(options)
  }
}
