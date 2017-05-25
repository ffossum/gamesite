import PropTypes from 'prop-types';
import React from 'react';
import Dropdown, { CloseDropdown } from 'components/common/dropdown/';
import Gravatar from 'components/common/Gravatar';

import styles from './navDropdown.css';
import navStyles from './nav.css';

export default class UserDropdown extends React.Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
  }
  handleLogOut(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.logOut();
  }
  handleSettingsClick(e) {
    e.preventDefault();
    this.props.openSettings();
  }
  render() {
    const { user } = this.props;
    const dropdownTitle = (
      <span>
        <Gravatar inline emailHash={user.emailHash} name={user.username} />{user.username}
      </span>
    );

    return (
      <Dropdown title={dropdownTitle} nav activeClassName={navStyles.active}>
        <section className={styles.section}>
          <ul className={styles.list}>
            <CloseDropdown>
              <li className={styles.item}>
                <a href="" className={styles.itemLink} onClick={this.handleSettingsClick}>
                  Settings
                </a>
              </li>
            </CloseDropdown>
            <CloseDropdown>
              <li className={styles.item}>
                <a href="" className={styles.itemLink} onClick={this.handleLogOut}>
                  Log out
                </a>
              </li>
            </CloseDropdown>
          </ul>
        </section>
      </Dropdown>
    );
  }
}

UserDropdown.propTypes = {
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  openSettings: PropTypes.func.isRequired,
};
