import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './button.css';

export default class Button extends React.Component {
  render() {
    const { btnStyle, left, right, ...otherProps } = this.props;

    const buttonClassNames = classNames({
      [styles[btnStyle]]: btnStyle,
      [styles.left]: left,
      [styles.right]: right,
    }, styles.btn);

    return (
      <button {...otherProps} className={buttonClassNames}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  btnStyle: PropTypes.oneOf(['primary']),
  children: PropTypes.node.isRequired,
  left: PropTypes.bool,
  right: PropTypes.bool,
};
