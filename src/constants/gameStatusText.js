import {
    NOT_STARTED,
    IN_PROGRESS,
    ENDED,
    CANCELED,
} from './gameStatus';

export default function getText(status) {
  switch (status) {
    case NOT_STARTED: return 'Not started';
    case IN_PROGRESS: return 'In progress';
    case ENDED: return 'Ended';
    case CANCELED: return 'Canceled';
    default: return '';
  }
}
