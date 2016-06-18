import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown, { CloseDropdown } from 'components/common/dropdown/';
import gameStatusText from 'constants/gameStatusText';
import _ from 'lodash';

import styles from './gamesDropdown.css';
import navStyles from './nav.css';

export default class GamesDropdown extends React.Component {
  render() {
    const { games } = this.props;
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
                    <li key={game.id} className={styles.item}>
                      <CloseDropdown>
                        <Link to={`/game/${game.id}`}>{game.id}</Link>
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
