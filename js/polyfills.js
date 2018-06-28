/* eslint-disable no-extend-native */

const string = String
if (!string.prototype.startsWith) {
  String.prototype.startsWith = (search, pos) => this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
}

if (!Set.prototype.difference) {
  Set.prototype.difference = otherSet => new Set([...this].filter(a => !otherSet.has(a)))
}
