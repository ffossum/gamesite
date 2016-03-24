import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import actions from 'actions/gamesList';

import styles from './createGame.css';

export default class CreateGame extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createGame();
  }
  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            label="Comment"
          />
          <Button btnStyle="primary">Create game</Button> <Link to="/play">Cancel</Link>
        </form>
      </div>
    );
  }
}

CreateGame.propTypes = {
  createGame: PropTypes.func.isRequired,
};

class Wrapper extends React.Component {
  render() {
    return <CreateGame {...this.props} />;
  }
}

export default connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch)
)(Wrapper);
