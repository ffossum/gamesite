import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/gamesList';

export default class Play extends React.Component {
  componentDidMount() {
    this.props.joinLobby();
  }
  componentWillUnmount() {
    this.props.leaveLobby();
  }
  render() {
    return (
    <div>
      <h1>Play</h1>
      <section>
        { this.props.children || <Link to="/play/create">Create game</Link> }
      </section>
    </div>
    );
  }
}

Play.propTypes = {
  children: PropTypes.node,
  joinLobby: PropTypes.func.isRequired,
  leaveLobby: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch)
)(Play);
