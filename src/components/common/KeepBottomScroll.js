import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default class KeepBottomScroll extends React.Component {
  componentDidMount() {
    this.element = findDOMNode(this);
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
    return this.props.children;
  }
}

KeepBottomScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

export function keepBottomScroll(Component) {
  return (
    class extends React.Component {
      static displayName = `KeepBottomScroll(${Component.displayName || Component.name})`;
      componentDidMount() {
        this.element = findDOMNode(this);
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
        return <Component {...this.props} />;
      }
    }
  );
}
