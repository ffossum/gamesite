// @flow
import {
  NOT_STARTED,
  IN_PROGRESS,
  ENDED,
  CANCELED,
} from './gameStatus';
import type { GameStatus } from './gameStatus';

export default function getText(status: GameStatus): string {
  switch (status) {
    case NOT_STARTED: status; return 'Not started';
    case IN_PROGRESS: return 'In progress';
    case ENDED: return 'Ended';
    case CANCELED: return 'Canceled';
    default: return '';
  }
}
