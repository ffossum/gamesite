import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/mainChat';
import MainPage from 'components/MainPage';

class MainPageContainer extends React.Component {
  render() {
    const { userData } = this.props;
    let messages = this.props.mainChat.get('messages');
    messages = messages.map(message => {
      const userId = message.get('user');
      return message.set('user', userData.get(userId) || { id: userId });
    });

    const props = {
      ...this.props,
      messages: messages.toJS(),
    };

    return <MainPage {...props} />;
  }
}

MainPageContainer.propTypes = {
  mainChat: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    mainChat: state.get('mainChat'),
    sessionUserId: state.getIn(['session', 'userId']),
    userData: state.getIn(['data', 'users']),
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(MainPageContainer);
