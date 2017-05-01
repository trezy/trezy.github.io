import Backbone from 'backbone'
import moment from 'moment'

import template from 'templates/TourDates.hbs'

import venues from '../../data/venues'





export default class TourDates extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)

    this.checkout = StripeCheckout.configure({
      bitcoin: true,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      key: 'pk_test_OygaX8csOevuyeSayisllVva',
      locale: 'auto',
      token: () => {}
    })

    // Close Checkout on page navigation:
    window.addEventListener('popstate', this.checkout.close)
  }

  onRender () {
    let ticketButtons = this.el.querySelectorAll('.buy-tickets')

    for (let i = 0, length = ticketButtons.length; i < length; i++) {
      let ticketButton = ticketButtons[i]

      ticketButton.addEventListener('click', event => {
        // Open Checkout with further options:
        this.checkout.open({
          name: 'Trezy.com',
          description: ticketButton.getAttribute('data-description'),
          amount: parseInt(ticketButton.getAttribute('data-amount'))
        })

        event.preventDefault()
      })
    }
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get className () {
    return 'invert laser-beams'
  }

  get tagName () {
    return 'main'
  }

  get venueIncrement () {
    if (!this._venueIncrement) {
      this._venueIncrement = 1
    } else {
      this._venueIncrement++
    }

    return this._venueIncrement
  }
}
