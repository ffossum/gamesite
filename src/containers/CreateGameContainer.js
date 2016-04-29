import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateGame from 'components/CreateGame';
import actions from 'actions/gamesList';

class Wrapper extends React.Component {
  render() {
    return <CreateGame {...this.props} />;
  }
}

Wrapper.propTypes = {
  createGame: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch)
)(Wrapper);
