import React, { PropTypes } from 'react';
import Hand from './Hand';

export default function Rock(props) {
  return <Hand type="scissors" direction={props.direction} />;
}

Rock.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
};
