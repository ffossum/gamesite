import PropTypes from 'prop-types';
import React from 'react';
import Message from './Message';
import InfoMessage from './InfoMessage';
import groupAdjacentBy from 'util/groupAdjacentBy';
import getTimestamp from 'util/getTimestamp';
import { keepBottomScroll } from 'components/common/KeepBottomScroll';
import { flatten, map } from 'lodash/fp';

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
  groupedMessages = map(group => (
    group.length === 1
      ? group
      : [{ ...group[0], text: map(msg => msg.text, group) }]
  ), groupedMessages);
  return flatten(groupedMessages);
}

class MessagesList extends React.Component {
  render() {
    const { messages } = this.props;
    const groupedMessages = groupMessages(messages);

    return (
      <div className={styles.messages}>
        {
          map(msg => (
            msg.key
            ? <InfoMessage key={`${msg.key}${msg.time}`} message={msg} />
            : <Message key={`${msg.user.id}${msg.time}`} message={msg} />
          ), groupedMessages)
        }
      </div>
    );
  }
}

export default keepBottomScroll(MessagesList);

MessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
};
