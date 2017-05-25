import PropTypes from 'prop-types';
import React from 'react';
import { map, zip } from 'lodash/fp';
import Hand from './hands/Hand';
import Gravatar from 'components/common/Gravatar';
import KeepBottomScroll from 'components/common/KeepBottomScroll';

import styles from './handHistory.css';

export default class HandHistory extends React.Component {
  render() {
    const { players } = this.props;

    const history = zip(...map(player => player.history, players));
    return (
      <div>
        <div className={`${styles.row} ${styles.header}`}>
          {
            map(player => (
              <span key={player.id} className={styles.cell}>
                <Gravatar emailHash={player.emailHash} name={player.username} />
              </span>
            ), players)
          }
        </div>
        <KeepBottomScroll>
          <div className={styles.body}>
              {
                history.map((hands, rowIndex) => (
                  <div key={rowIndex} className={styles.row}>
                    {
                      hands.map((hand, cellIndex) => (
                        <span key={cellIndex} className={styles.cell}>
                          <Hand
                            small
                            type={hand}
                            direction={cellIndex === 0 ? 'right' : 'left'}
                          />
                        </span>
                      ))
                    }
                  </div>
                ))
              }
          </div>
        </KeepBottomScroll>
        <div className={`${styles.row} ${styles.footer}`}>
          {
            map(player => (
              <span key={player.id} className={styles.cell}>
                {player.score}
              </span>
            ), players)
          }
        </div>
      </div>
    );
  }
}

HandHistory.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    emailHash: PropTypes.string,
    username: PropTypes.string,
    score: PropTypes.number.isRequired,
    history: PropTypes.array.isRequired,
  })).isRequired,
};
