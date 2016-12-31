import React, { PropTypes } from 'react';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import { isEmpty } from 'lodash/fp';

import styles from './chat.css';

export default class ChatInput extends React.Component {
  constructor() {
    super();

    this.state = {
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!isEmpty(this.state.message)) {
      this.props.sendMessage(this.state.message);
      this.setState({
        message: '',
      });
    }
  }
  render() {
    const { disabled } = this.props;

    return (
      <form className={styles.chatForm} onSubmit={this.handleSubmit}>
        <div className={styles.messageInput}>
          <TextInput
            compact
            value={this.state.message}
            onChange={this.handleChange}
            placeholder="Say something..."
            disabled={disabled}
          />
        </div>
        <div>
          <Button
            btnStyle="primary"
            disabled={disabled}
          >
            Send
          </Button>
        </div>
      </form>
    );
  }
}

ChatInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
