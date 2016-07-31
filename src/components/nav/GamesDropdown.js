import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown, { CloseDropdown } from 'components/common/dropdown/';
import Gravatar from 'components/common/Gravatar';
import gameStatusText from 'constants/gameStatusText';
import _ from 'lodash';

import styles from './navDropdown.css';
import navStyles from './nav.css';

export default class GamesDropdown extends React.Component {
  render() {
    const { games } = this.props;

    if (_.isEmpty(games)) {
      return (
        <Dropdown title="Games" nav activeClassName={navStyles.active}>
          <section className={styles.section}>
            <header className={`${styles.header} ${styles.headerOnly}`}>
              No games
            </header>
          </section>
        </Dropdown>
      );
    }

    const groupedByStatus = _.groupBy(games, 'status');

    return (
      <Dropdown title="Games" nav activeClassName={navStyles.active}>
        {
          _.map(groupedByStatus, (group, status) => (
            <section key={status} className={styles.section}>
              <header className={styles.header}>
                {gameStatusText(status)}
              </header>
              <ul className={styles.list}>
                {
                  _.map(group, game => (
                    <li key={game.id} className={styles.gameItem}>
                      <span className={styles.users}>
                        {
                          _.map(game.users, user => (
                            <Gravatar
                              inline
                              key={user.id}
                              emailHash={user.emailHash}
                              name={user.username}
                            />
                            )
                          )
                        }
                      </span>
                      <CloseDropdown>
                        <Link to={`/game/${game.id}`}>Open</Link>
                      </CloseDropdown>
                    </li>
                  ))
                }
              </ul>
            </section>
          ))
        }
      </Dropdown>
    );
  }
}

GamesDropdown.propTypes = {
  games: PropTypes.object.isRequired,
};
