import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './button.css';

export default class Button extends React.Component {
  render() {
    const { btnStyle } = this.props;

    const buttonClassNames = classNames({
      [styles[btnStyle]]: btnStyle,
    }, styles.btn);

    return (
      <button {...this.props} className={buttonClassNames}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  btnStyle: PropTypes.oneOf(['primary']),
  children: PropTypes.node.isRequired,
};
