import React, { PropTypes } from 'react';
import Chat from 'components/chat/Chat';

import styles from './mainPage.css';

export default class MainPage extends React.Component {
  render() {
    const { messages, sessionUserId } = this.props;
    return (
      <div>
        <h1>Main page</h1>
        <div className={styles.chat}>
          <Chat
            sendMessage={this.props.sendMessage}
            messages={messages}
            readOnly={!sessionUserId}
          />
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendMessage: PropTypes.func.isRequired,
  sessionUserId: PropTypes.string,
};
