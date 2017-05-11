import BaseAPICollection from 'collections/BaseAPI'





export default class TourDates extends BaseCollection {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _generateTourDates () {
    return []
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return -model.get('date')
  }

  initialize () {
    this.add(this._generateTourDates())
  }
}
