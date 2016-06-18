import React, { PropTypes } from 'react';
import DownArrow from './DownArrow';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import _ from 'lodash';

import styles from './dropdown.css';
import navStyles from 'components/nav/nav.css';

class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      alignRight: false,
    };
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setContentEl = this.setContentEl.bind(this);
    this.setTriggerEl = this.setTriggerEl.bind(this);
    this.preventBodyOverflow = this.preventBodyOverflow.bind(this);
  }
  getChildContext() {
    return {
      closeDropdown: this.closeDropdown,
    };
  }
  componentDidUpdate() {
    this.preventBodyOverflow();
  }
  setContentEl(el) {
    this.contentEl = el;
  }
  setTriggerEl(el) {
    this.triggerEl = el;
  }
  handleTriggerClick(e) {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }
  closeDropdown() {
    this.setState({ expanded: false });
  }
  handleClickOutside() {
    this.closeDropdown();
  }
  preventBodyOverflow() {
    const { expanded, alignRight } = this.state;
    if (expanded) {
      const rightOverflow = (this.contentEl.offsetWidth + this.triggerEl.offsetLeft)
        > document.body.offsetWidth;

      const newState = {};

      if (rightOverflow !== alignRight) {
        newState.alignRight = rightOverflow;
      }

      if (!_.isEmpty(newState)) {
        this.setState(newState);
      }
    }
  }
  render() {
    let { children } = this.props;
    const { nav, activeClassName } = this.props;

    const linkClassName = classnames({
      [navStyles.navlink]: nav,
      [activeClassName]: this.state.expanded && activeClassName,
    });

    const expandedClassName = classnames({
      [styles.expanded]: true,
      [styles.right]: this.state.alignRight,
    });

    return (
      <div>
        <a
          className={linkClassName}
          href=""
          onClick={this.handleTriggerClick}
          aria-haspopup
          aria-expanded={this.state.expanded}
          ref={this.setTriggerEl}
        >
          {this.props.title} <DownArrow />
        </a>
        {
          this.state.expanded &&
            <div className={expandedClassName} ref={this.setContentEl}>
              {children}
            </div>
        }
      </div>

    );
  }
}

export default onClickOutside(Dropdown);

Dropdown.childContextTypes = {
  closeDropdown: PropTypes.func.isRequired,
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  nav: PropTypes.bool,
  activeClassName: PropTypes.string,
};
