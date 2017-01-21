import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';

import style from './modal.css';

class ModalInner extends React.Component {
  handleClickOutside() {
    this.props.onClose();
  }
  render() {
    return (
      <div role="dialog" className={style.modal}>
        {this.props.children}
      </div>
    );
  }
}

ModalInner.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const WrappedInner = onClickOutside(ModalInner);

export default class Modal extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentWillMount() {
    if (__CLIENT__) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }
  componentWillUnmount() {
    if (__CLIENT__) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }
  handleKeyDown(e) {
    if (e.keyCode === 27) { // 27 = escape key
      this.props.onClose();
    }
  }
  render() {
    return (
      <div role="presentation" className={style.overlay}>
        <WrappedInner onClose={this.props.onClose}>
          {this.props.children}
        </WrappedInner>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
