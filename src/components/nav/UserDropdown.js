import React, { PropTypes } from 'react';
import Dropdown, { CloseDropdown } from 'components/common/dropdown/';
import Gravatar from 'components/common/Gravatar';

import styles from './navDropdown.css';
import navStyles from './nav.css';

export default class UserDropdown extends React.Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.logOut();
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
                <a className={styles.itemLink} onClick={this.handleLogOut}>
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
};
