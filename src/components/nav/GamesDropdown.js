import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown, { CloseDropdown } from 'components/common/dropdown/';
import _ from 'lodash';

import styles from './gamesDropdown.css';

export default class GamesDropdown extends React.Component {
  render() {
    const { games } = this.props;
    return (
      <Dropdown title="Games" nav>
        <ul className={styles.list}>
          {
            _.map(games, game => (
              <li key={game.id} className={styles.item}>
                <CloseDropdown>
                  <Link to={`/game/${game.id}`}>{game.id}</Link>
                </CloseDropdown>
              </li>
            ))
          }
        </ul>
      </Dropdown>
    );
  }
}

GamesDropdown.propTypes = {
  games: PropTypes.object.isRequired,
};
