import React, { PropTypes } from 'react';

import style from './modal.css';

export default class Modal extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  stopPropagation(e) {
    e.stopPropagation();
  }
  handleKeyDown(e) {
    if (e.keyCode === 27) { // 27 = escape key
      this.props.onClose();
    }
  }
  render() {
    return (
      <div className={style.overlay} onClick={this.props.onClose}>
        <div
          className={style.modal}
          onClick={this.stopPropagation}
          onKeyDown={this.handleKeyDown}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};