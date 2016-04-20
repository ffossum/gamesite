import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/login';
import Nav from 'components/nav/Nav';

class NavContainer extends React.Component {
  render() {
    const props = {
      ...this.props,
      user: this.props.user && this.props.user.toJS(),
      games: this.props.games && this.props.games.toJS(),
    };

    return <Nav {...props} />;
  }
}

NavContainer.propTypes = {
  user: PropTypes.object,
  games: PropTypes.object,
};

export default connect(
  state => {
    const sessionUserId = state.getIn(['session', 'userId']);
    const games = state.getIn(['data', 'games']).filter(game => (
      game.get('users').has(sessionUserId)
    ));

    return {
      user: state.getIn(['data', 'users', sessionUserId]),
      games,
    };
  },
  dispatch => bindActionCreators(actions, dispatch)
)(NavContainer);
