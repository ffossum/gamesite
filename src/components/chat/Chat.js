import React, { PropTypes } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

import styles from './chat.css';

export default class Chat extends React.Component {
  render() {
    const { sendMessage, messages, readOnly } = this.props;
    return (
      <div className={styles.chat}>
        <div className={styles.messagesContainer}>
          <MessageList messages={messages} />
        </div>
        <ChatInput sendMessage={sendMessage} disabled={readOnly} />
      </div>
    );
  }
}

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.array,
  readOnly: PropTypes.bool,
};
