import React, { PropTypes } from 'react';
import styles from './hands.css';
import classnames from 'classnames';

export default function Rock(props) {
  const className = classnames({
    [styles.big]: true,
    [styles.right]: props.direction === 'right',
    [styles.left]: props.direction === 'left',
  });
  return <img className={className} alt={props.type} src={`/static/games/rps/${props.type}.svg`} />;
}

Rock.propTypes = {
  type: PropTypes.oneOf(['rock', 'paper', 'scissors']).isRequired,
  direction: PropTypes.oneOf(['left', 'right']),
};
