String.prototype.capitalize = function () {
  let splitString = this.split('')

  splitString.unshift(splitString.shift().toUpperCase())

  return splitString.join('')
}

String.prototype.capitalizeAll = function () {
  return this.split(' ').map(word => word.capitalize()).join(' ')
}
