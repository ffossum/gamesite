import React, { PropTypes } from 'react';
import {
  map,
  zip,
} from 'lodash';
import Hand from './hands/Hand';
import Gravatar from 'components/common/Gravatar';
import KeepBottomScroll from 'components/common/KeepBottomScroll';

import styles from './handHistory.css';

export default class HandHistory extends React.Component {
  render() {
    const { players } = this.props;

    const history = zip(...map(players, player => player.history));
    return (
      <div>
        <div className={`${styles.row} ${styles.header}`}>
          {
            map(players, player => (
              <span key={player.id} className={styles.cell}>
                <Gravatar emailHash={player.emailHash} name={player.username} />
              </span>
            ))
          }
        </div>
        <KeepBottomScroll>
          <div className={styles.body}>
              {
                map(history, (hands, rowIndex) => (
                  <div key={rowIndex} className={styles.row}>
                    {
                      map(hands, (hand, cellIndex) => (
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
            map(players, player => (
              <span key={player.id} className={styles.cell}>
                {player.score}
              </span>
            ))
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
