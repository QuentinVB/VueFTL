'use strict';

 exports.getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
 exports.getRandomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
}
 exports.getRandomIntInclusive=function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
