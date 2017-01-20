// @flow
import type { Hand } from '../types';
import {
  ROCK, PAPER, SCISSORS,
} from '../constants';

export default function getHandText(hand: Hand) {
  switch (hand) {
    case ROCK: return 'Rock';
    case PAPER: return 'Paper';
    case SCISSORS: return 'Scissors';
    default: return '';
  }
}
