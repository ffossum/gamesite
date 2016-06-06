import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateGame from 'components/CreateGame';
import actions from 'actions/gamesList';

class Wrapper extends React.Component {
  render() {
    return (
      <CreateGame
        createGame={this.props.createGame}
        disabled={!this.props.userId}
      />
    );
  }
}

Wrapper.propTypes = {
  createGame: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default connect(
  state => ({
    userId: state.getIn(['session', 'userId']),
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Wrapper);
