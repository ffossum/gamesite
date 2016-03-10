import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from 'actions/mainChat';
import Chat from 'components/chat/Chat';

import styles from './mainPage.css';

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Main page</h1>
        <div className={styles.chat}>
          <Chat
            sendMessage={this.props.sendMessage}
            messages={this.props.messages}
            readOnly={!this.props.loggedInUser} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.mainChat,
    loggedInUser: state.loggedInUser
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Main);
