import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from 'actions/mainChat';
import Chat from 'components/chat/Chat';

import styles from './mainPage.css';

class MainPage extends React.Component {
  render() {
    const {messages, loggedInUser} = this.props;

    return (
      <div>
        <h1>Main page</h1>
        <div className={styles.chat}>
          <Chat
            sendMessage={this.props.sendMessage}
            messages={messages}
            readOnly={!loggedInUser} />
        </div>
      </div>
    );
  }
}

class Wrapper extends React.Component {
  render() {
    const props = {
      ...this.props,
      messages: this.props.mainChat.get('messages').toJS()
    };

    return <MainPage {...props} />;
  }
}

export default connect(
  state => ({
    mainChat: state.get('mainChat'),
    loggedInUser: state.get('loggedInUser')
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Wrapper);
