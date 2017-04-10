export default class {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  compile () {
    return this.value.toString().split('').reduce((acc, val) => parseInt(acc) + parseInt(val))
  }

  constructor (value) {
    this.value = value
  }

  toDecimal () {
    return parseFloat('0.' + this.value)
  }

  toPercentage () {
    let seed = this.value

    while (seed.toString().length > 2) {
      seed = this.compile(seed)
    }

    // convert the compiledSeed to a decimal/percentage
    return seed / 100
  }
}
