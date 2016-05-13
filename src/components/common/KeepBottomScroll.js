import React, { cloneElement, PropTypes } from 'react';

export default class KeepBottomScroll extends React.Component {
  constructor(props) {
    super(props);

    this.elementRef = this.props.children.ref || 'element';
    this.scrollBottom = this.scrollBottom.bind(this);
  }
  componentDidMount() {
    this.scrollBottom();
  }
  componentWillUpdate() {
    const node = this.refs[this.elementRef];
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight - node.scrollHeight > -10;
  }
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      this.scrollBottom();
    }
  }
  scrollBottom() {
    const node = this.refs[this.elementRef];
    node.scrollTop = node.scrollHeight;
  }
  render() {
    return cloneElement(this.props.children, {
      ref: this.elementRef,
    });
  }
}

KeepBottomScroll.propTypes = {
  children: PropTypes.node.isRequired,
};
