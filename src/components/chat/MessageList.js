import React, { PropTypes } from 'react';
import _ from 'lodash';
import Message from './Message';
import InfoMessage from './InfoMessage';

import styles from './chat.css';

export default class MessagesList extends React.Component {
  constructor() {
    super();
    this.scrollBottom = this.scrollBottom.bind(this);
  }
  componentDidMount() {
    this.scrollBottom();
  }
  componentWillUpdate() {
    const node = this.refs.chatMessages;
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight - node.scrollHeight > -10;
  }
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      this.scrollBottom();
    }
  }
  scrollBottom() {
    const node = this.refs.chatMessages;
    node.scrollTop = node.scrollHeight;
  }
  render() {
    const { messages } = this.props;
    return (
      <div className={styles.messagesContainer}>
        <div className={styles.messages} ref="chatMessages">
          {
            _.map(messages, msg => (
              msg.key
              ? <InfoMessage key={`${msg.key}${msg.time}`} message={msg} />
              : <Message key={`${msg.user.id}${msg.time}`} message={msg} />
            ))
          }
        </div>
      </div>
    );
  }
}

MessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
};
