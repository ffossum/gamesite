import _ from 'lodash';

const defaultIgnoreFunc = () => false;

export default function groupAdjacentBy(arr, func = _.identity, options = {}) {
  const { ignore = defaultIgnoreFunc } = options;
  const result = [];

  let prev;
  _.forEach(arr, value => {
    const current = func(value);

    if (prev === current && !ignore(value)) {
      _.last(result).push(value);
    } else {
      result.push([value]);
      prev = current;
    }
  });
  return result;
}
