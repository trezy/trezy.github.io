String.prototype.toColor = function () {
  // str to hash
  for (var i = 0, hash = 0; i < this.length; hash = this.charCodeAt(i++) + ((hash << 5) - hash))

  // int/hash to hex
  for (var i = 0, color = '#'; i < 3; colour += ('00' + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2))

  return color
}
