'use strict';

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
