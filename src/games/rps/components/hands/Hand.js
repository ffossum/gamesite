import React, { PropTypes } from 'react';
import styles from './hands.css';
import classnames from 'classnames';
import {
  ROCK, PAPER, SCISSORS,
} from '../../constants';
import getHandText from '../../texts/handTexts';

function getFilename(hand) {
  switch (hand) {
    case ROCK: return 'rock';
    case PAPER: return 'paper';
    case SCISSORS: return 'scissors';
    default: return '';
  }
}

export default function Hand(props) {
  const handText = getHandText(props.type);
  const className = classnames({
    [styles.big]: true,
    [styles.right]: props.direction === 'right',
    [styles.left]: props.direction === 'left',
  });

  const filename = getFilename(props.type);
  return (
    <img
      className={className}
      alt={handText}
      src={`/static/games/rps/${filename}.svg`}
    />
  );
}

Hand.propTypes = {
  type: PropTypes.oneOf([ROCK, PAPER, SCISSORS]).isRequired,
  direction: PropTypes.oneOf(['left', 'right']),
};
