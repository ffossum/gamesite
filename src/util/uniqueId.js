let counter = 0;

export function uniqueId(prefix = '') {
  counter++;
  return prefix + counter;
}

export function resetCounter() {
  counter = 0;
}

export default {
  uniqueId,
  resetCounter
};
