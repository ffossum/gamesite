import React, {PropTypes} from 'react';
import classNames from 'classnames';

import styles from './button.css';

export default class Button extends React.Component {
  render() {
    const {type} = this.props;

    const buttonClassNames = classNames({
      [styles[type]]: type
    }, styles.btn);

    return (
      <button {...this.props} className={buttonClassNames}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary'])
};
