import BaseCollection from 'collections/Base'





export default class extends BaseCollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    return response.data
  }
}
