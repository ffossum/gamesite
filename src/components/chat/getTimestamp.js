import moment from 'moment';

export default function getTimestamp(time) {
  return moment(time).format('HH:mm');
}
