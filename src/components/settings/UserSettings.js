import React, { PropTypes } from 'react';
import AccountSettings from './account/AccountSettings';
import LocaleSettings from './locale/LocaleSettings';
import classnames from 'classnames';
import { map } from 'lodash/fp';

import styles from './userSettings.css';

export default class UserSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 'account',
    };

    this.getSection = this.getSection.bind(this);
    this.handleLinkClicked = this.handleLinkClicked.bind(this);
  }
  getSection() {
    switch (this.state.active) {
      case 'account': return <AccountSettings user={this.props.user} />;
      case 'locale': return <LocaleSettings />;
      default: return null;
    }
  }
  handleLinkClicked(e) {
    e.preventDefault();
    this.setState({
      active: e.target.name,
    });
  }
  sections = {
    account: 'Account',
    locale: 'Locale',
  }
  render() {
    return (
      <article>
        <div className={styles.body}>
          <nav className={styles.nav}>
            <h2>Settings</h2>
            <ul className={styles.sectionList}>
              {
                map((value, key) => (
                  <li key={key}>
                    <a
                      className={classnames({ [styles.active]: key === this.state.active })}
                      name={key}
                      onClick={this.handleLinkClicked}
                    >
                      {value}
                    </a>
                  </li>
                ), this.sections)
              }
            </ul>
          </nav>
          <div className={styles.sectionContainer}>
            {this.getSection()}
          </div>
        </div>
      </article>
    );
  }
}

UserSettings.propTypes = {
  user: PropTypes.object,
};
