import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/login';
import Nav from 'components/Nav';

class NavContainer extends React.Component {
  render() {
    const props = {
      ...this.props,
      user: this.props.user && this.props.user.toJS(),
    };

    return <Nav {...props} />;
  }
}

NavContainer.propTypes = {
  user: PropTypes.object,
};

export default connect(
  state => {
    const sessionUserId = state.getIn(['session', 'userId']);

    return {
      user: state.getIn(['data', 'users', sessionUserId]),
    };
  },
  dispatch => bindActionCreators(actions, dispatch)
)(NavContainer);
