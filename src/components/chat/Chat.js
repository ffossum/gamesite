import React, {PropTypes} from 'react';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import Gravatar from 'components/common/Gravatar';
import _ from 'lodash';
import moment from 'moment';

import styles from './chat.css';

export default class Chat extends React.Component {
  constructor() {
    super();

    this.state = {
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollBottom = this.scrollBottom.bind(this);
  }
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!_.isEmpty(this.state.message)) {
      this.props.sendMessage(this.state.message);
      this.setState({message: ''});
    }
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
  componentDidMount() {
    this.scrollBottom();
  }
  scrollBottom() {
    const node = this.refs.chatMessages;
    node.scrollTop = node.scrollHeight;
  }

  render() {
    const {messages, readOnly} = this.props;
    return (
      <div className={styles.chat}>
        <div className={styles.messagesContainer}>
          <div className={styles.messages} ref="chatMessages">
            {
              _.map(messages, msg => {
                return (
                  <div key={`${msg.user.username}${msg.time}`} className={styles.message}>
                    {moment(msg.time).format('dddd MMMM Do, hh:mm:ss')} <Gravatar emailHash={msg.user.emailHash} /> {msg.user.username}: {msg.text}
                  </div>
                );
              })
            }
          </div>
        </div>
        <form className={styles.chatForm} onSubmit={this.handleSubmit}>
          <div className={styles.messageInput}>
            <TextInput
              value={this.state.message}
              onChange={this.handleChange}
              placeholder="Say something..."
              disabled={readOnly}/>
          </div>
          <div>
            <Button
              btnStyle="primary"
              disabled={readOnly}>
              Send
            </Button>
          </div>
        </form>

      </div>
    );
  }
}

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  readOnly: PropTypes.bool
};
