String.prototype.capitalize = function () {
  let splitString = this.split('')

  return splitString.unshift(splitString.shift().toUpperCase()).join('')
}

String.prototype.capitalizeAll = function () {
  return this.split(' ').map(word => word.capitalize()).join(' ')
}
