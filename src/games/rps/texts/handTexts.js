import {
  ROCK, PAPER, SCISSORS,
} from '../constants';

export default function getHandText(hand) {
  switch (hand) {
    case ROCK: return 'Rock';
    case PAPER: return 'Paper';
    case SCISSORS: return 'Scissors';
    default: return '';
  }
}
