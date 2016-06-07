import React, { cloneElement, PropTypes } from 'react';

export default class KeepBottomScroll extends React.Component {
  constructor(props) {
    super(props);

    this.setElementRef = el => {
      this.element = el;
    };
  }
  componentDidMount() {
    this.scrollBottom();
  }
  componentWillUpdate() {
    this.shouldScrollBottom =
      (this.element.scrollTop + this.element.offsetHeight - this.element.scrollHeight) > -10;
  }
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      this.scrollBottom();
    }
  }
  scrollBottom() {
    this.element.scrollTop = this.element.scrollHeight;
  }
  render() {
    return cloneElement(this.props.children, {
      ref: this.setElementRef,
    });
  }
}

KeepBottomScroll.propTypes = {
  children: PropTypes.node.isRequired,
};
