import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { min } from 'lodash/fp';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import Incrementer from 'components/common/incrementer/Incrementer';
import CreateGameOptions from 'games/rps/options/CreateGameOptions';
import defaultOptions from 'games/rps/options/defaultValues';
import gameInfo from 'games/rps/info';

import styles from './createGame.css';
import formStyles from 'containers/forms/form.css';

export default class CreateGame extends React.Component {
  constructor() {
    super();

    this.state = {
      playerCount: {
        required: min(gameInfo.playerCount),
        optional: 0,
      },
      comment: '',
      options: defaultOptions,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeComment = this.handleChange.bind(this, 'comment');
    this.handleChangeOptions = options => this.setState({ options });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createGame(this.state);
  }
  handleChange(field, e) {
    this.setState({
      [field]: e.target.value,
    });
  }
  render() {
    const { disabled } = this.props;
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit}>
          <div className={formStyles.formInput}>
            <Incrementer
              label="Players"
              value={2} disabled // TODO adjust based on game info
            />
          </div>

          <CreateGameOptions
            onChange={this.handleChangeOptions}
            values={this.state.options}
          />

          <TextInput
            label="Comment"
            onChange={this.handleChangeComment}
          />

          <Button
            disabled={disabled}
            btnStyle="primary"
          >
            Create game
          </Button> <Link to="/play">Cancel</Link>
        </form>
      </div>
    );
  }
}

CreateGame.propTypes = {
  createGame: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
