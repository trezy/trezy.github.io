Array.prototype.reorder = function (mapping) {
  return mapping.map(index => this[index])
}
