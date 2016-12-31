import { identity, last } from 'lodash/fp';

const defaultIgnoreFunc = () => false;

export default function groupAdjacentBy(arr, func = identity, options = {}) {
  const { ignore = defaultIgnoreFunc } = options;
  const result = [];

  let prev;
  arr.forEach(value => {
    const current = func(value);

    if (prev === current && !ignore(value)) {
      last(result).push(value);
    } else {
      result.push([value]);
      prev = current;
    }
  });
  return result;
}
