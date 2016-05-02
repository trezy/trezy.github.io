import BaseModel from 'models/Base'





export default class Tweet extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (model, options) {
    super(model, options)
  }

  parse (response) {
    response.timestamp = new Date(response.timestamp_ms)
    return response
  }
}
