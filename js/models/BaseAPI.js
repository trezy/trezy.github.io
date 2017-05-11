import Base from 'models/Base'





export default class extends Base {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    if (response.data) {
      return response.data[0]

    } else {
      return response
    }
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get idAttribute () {
    return '_id'
  }
}
