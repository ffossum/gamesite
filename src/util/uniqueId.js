// @flow

let counter = 0;

export function uniqueId(prefix: string = '') {
  counter++;
  return prefix + counter;
}

export function resetCounter() {
  counter = 0;
}

export default {
  uniqueId,
  resetCounter,
};
