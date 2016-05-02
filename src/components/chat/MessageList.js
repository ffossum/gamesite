import React, { PropTypes } from 'react';
import _ from 'lodash';
import Message from './Message';
import InfoMessage from './InfoMessage';
import groupAdjacentBy from 'util/groupAdjacentBy';
import getTimestamp from 'util/getTimestamp';

import styles from './chat.css';

/*
Group messages together if they are from the same user within the same minute
with no other messages between them.
*/
function groupMessages(messages) {
  let groupedMessages = groupAdjacentBy(messages,
    msg => `${msg.user && msg.user.id}${getTimestamp(msg.time)}`,
    { ignore: msg => msg.key }
  );
  groupedMessages = _.map(groupedMessages, group => (
    group.length === 1
      ? group
      : [{ ...group[0], text: _.map(group, msg => msg.text) }]
    )
  );
  return _.flatten(groupedMessages);
}

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
    const groupedMessages = groupMessages(messages);

    return (
      <div className={styles.messagesContainer}>
        <div className={styles.messages} ref="chatMessages">
          {
            _.map(groupedMessages, msg => (
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
