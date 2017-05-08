module.exports = function(Parent /*, ...mixins*/) {
  // Use slice as node 4 does not support param spread.
  let mixins = Array.prototype.slice.call(arguments, 1);
  class Mixed extends Parent {}
  for (let mixin of mixins) {
    for (let prop in mixin) {
      Mixed.prototype[prop] = mixin[prop];
    }
  }
  return Mixed;
};