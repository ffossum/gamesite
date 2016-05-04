import React, { PropTypes } from 'react';
import DownArrow from './DownArrow';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';

import styles from './dropdown.css';
import navStyles from 'components/nav/nav.css';

class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  getChildContext() {
    return {
      closeDropdown: this.closeDropdown,
    };
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
  render() {
    let { children } = this.props;
    const { right, nav } = this.props;

    const expandedClassName = classnames({
      [styles.expanded]: true,
      [styles.left]: !right,
      [styles.right]: right,
    });
    return (
      <div className={styles.container}>
        <a
          className={nav && navStyles.navlink}
          href=""
          onClick={this.handleTriggerClick}
          aria-haspopup
          aria-expanded={this.state.expanded}
        >
          {this.props.title} <DownArrow />
        </a>
        {
          this.state.expanded &&
            <div className={expandedClassName}>
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
  right: PropTypes.bool,
  nav: PropTypes.bool,
};
