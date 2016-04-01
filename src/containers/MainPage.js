import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/mainChat';
import Chat from 'components/chat/Chat';

import styles from './mainPage.css';

class MainPage extends React.Component {
  render() {
    const { messages, loggedInUser } = this.props;
    return (
      <div>
        <h1>Main page</h1>
        <div className={styles.chat}>
          <Chat
            sendMessage={this.props.sendMessage}
            messages={messages}
            readOnly={!loggedInUser}
          />
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  loggedInUser: PropTypes.string,
};

class Wrapper extends React.Component {
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

Wrapper.propTypes = {
  mainChat: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    mainChat: state.get('mainChat'),
    loggedInUser: state.get('loggedInUser'),
    userData: state.getIn(['data', 'users']),
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Wrapper);
