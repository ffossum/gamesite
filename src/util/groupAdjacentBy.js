// @flow

import { identity, last } from 'lodash/fp';

const defaultIgnoreFunc = () => false;

type Options = {
  ignore?: Function,
}

export default function groupAdjacentBy<T>(
  arr: T[],
  func: Function = identity,
  options: Options = {}
): T[][] {
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
