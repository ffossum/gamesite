// @flow

import moment from 'moment';

export default function getTimestamp(time: string) {
  return moment(time).calendar();
}
