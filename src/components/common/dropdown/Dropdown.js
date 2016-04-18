import React, { PropTypes } from 'react';
import DownArrow from './DownArrow';
import _ from 'lodash';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';

import styles from './dropdown.css';
import navStyles from 'components/nav.css';

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
    children = _.isArray(children) ? children : [children];

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
        >
          {this.props.title} <DownArrow />
        </a>
        {
          this.state.expanded &&
          <ul className={expandedClassName}>
            {
              _.map(children, (child, index) => (
                <li className={styles.item} key={index}>
                  <span onClick={this.closeDropdown}>{child}</span>
                </li>
              ))
            }
          </ul>
        }
      </div>

    );
  }
}

export default onClickOutside(Dropdown);

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  right: PropTypes.bool,
  nav: PropTypes.bool,
};
