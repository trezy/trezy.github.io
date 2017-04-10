import Backbone from 'backbone'
import moment from 'moment'

import Route from '../Route'
import Seed from 'models/Seed'
import TourDatesView from 'views/TourDates'

import venues from '../../data/venues'





export default class TourDates extends Route {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _generateEvents () {
    let anchorPoint = moment().utc().startOf('month')

    let events = []

    for (let eventIndex = 0; eventIndex < 25; eventIndex++) {
      let event = {
        date: null,
        ticketCount: null,
        venue: null
      }

      let seed = new Seed(Math.abs((anchorPoint.valueOf() * (eventIndex + 1)).toString().toHash()))
      event.venue = venues[Math.round(seed.toPercentage() * venues.length)]
      events.push(event)
    }

    return events
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    this.viewOptions.model = new Backbone.Model

    return new Promise((resolve, reject) => {
      let monthsToGenerate = 3
      let tourDates = []

  //    for (let index = 0, length = monthsToGenerate; index < length; index++) {
  //      tourDates = tourDates.concat(this._generateMonth(index))
  //    }

      let startingPoint = moment().utc().endOf('week').add(6, 'days')

      let events = this._generateEvents()

      let startEvent = events.shift()
      let endEvent = events.pop()

      this.appChannel.request('route', {
        destination: endEvent.venue.location,
        optimizeWaypoints: true,
        origin: startEvent.venue.location,
        travelMode: 'DRIVING',
        waypoints: events.map(event => {
          return {
            location: event.venue.location,
            stopover: true
          }
        })
      })
      .then(results => {
        events = events.reorder(results.waypoint_order)
        events.unshift(startEvent)
        events.push(endEvent)

        events.forEach((event, index) => {
          event.date = startingPoint.clone().add(index * 7, 'days').format('DD MMM, YYYY')
        })

        this.viewOptions.model = new Backbone.Model({ events })

        resolve()
      })
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get title () {
    return 'Tour Dates'
  }

  get view () {
    return TourDatesView
  }
}
