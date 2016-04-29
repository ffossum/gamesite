import {
    NOT_STARTED,
    IN_PROGRESS,
} from './gameStatus';

export default function getText(status) {
  switch (status) {
    case NOT_STARTED: return 'Not started';
    case IN_PROGRESS: return 'In progress';
    default: return '';
  }
}
