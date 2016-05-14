import React, { PropTypes } from 'react';
import Chat from 'components/chat/Chat';

import styles from './mainPage.css';

export default class MainPage extends React.Component {
  render() {
    const { messages, sessionUserId } = this.props;
    return (
      <article className={styles.main}>
        <header>
          <h1>Main page</h1>
        </header>
        <Chat
          sendMessage={this.props.sendMessage}
          messages={messages}
          readOnly={!sessionUserId}
        />
      </article>
    );
  }
}

MainPage.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendMessage: PropTypes.func.isRequired,
  sessionUserId: PropTypes.string,
};
