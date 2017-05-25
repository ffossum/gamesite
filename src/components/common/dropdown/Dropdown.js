import PropTypes from 'prop-types';
import React from 'react';
import DownArrow from './DownArrow';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { isEmpty } from 'lodash/fp';
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
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  getChildContext() {
    return {
      closeDropdown: this.closeDropdown,
    };
  }
  componentWillMount() {
    if (__CLIENT__) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }
  componentDidUpdate() {
    this.preventBodyOverflow();
  }
  componentWillUnmount() {
    if (__CLIENT__) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
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
  handleKeyDown(e) {
    if (e.keyCode === 27) { // 27 = escape key
      this.closeDropdown();
    }
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

      if (!isEmpty(newState)) {
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
          <span className={styles.title}>{this.props.title}</span>
          <DownArrow />
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
