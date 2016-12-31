import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown, { CloseDropdown } from 'components/common/dropdown/';
import Gravatar from 'components/common/Gravatar';
import gameStatusText from 'constants/gameStatusText';
import { groupBy, isEmpty, map } from 'lodash/fp';

import styles from './navDropdown.css';
import navStyles from './nav.css';

export default class GamesDropdown extends React.Component {
  render() {
    const { games } = this.props;

    if (isEmpty(games)) {
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

    const groupedByStatus = groupBy('status', games);

    return (
      <Dropdown title="Games" nav activeClassName={navStyles.active}>
        {
          map(group => {
            const status = group[0].status;
            return (
              <section key={status} className={styles.section}>
                <header className={styles.header}>
                  {gameStatusText(status)}
                </header>
                <ul className={styles.list}>
                  {
                    map(game => (
                      <li key={game.id} className={styles.gameItem}>
                        <span className={styles.users}>
                          {
                            map(user => (
                              <Gravatar
                                inline
                                key={user.id}
                                emailHash={user.emailHash}
                                name={user.username}
                              />
                            ), game.users)
                          }
                        </span>
                        <CloseDropdown>
                          <Link to={`/game/${game.id}`}>Open</Link>
                        </CloseDropdown>
                      </li>
                    ), group)
                  }
                </ul>
              </section>
            );
          }, groupedByStatus)
        }
      </Dropdown>
    );
  }
}

GamesDropdown.propTypes = {
  games: PropTypes.object.isRequired,
};
