import React, {PropTypes} from 'react';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import Gravatar from 'components/common/Gravatar';
import _ from 'lodash';
import moment from 'moment';

export default class Chat extends React.Component {
  constructor() {
    super();

    this.state = {
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({message: ''});
  }
  render() {
    const {messages} = this.props;
    return (
      <div>
        <div>
          {
            _.map(messages, msg => {
              return (
                <div key={`${msg.user.username}${msg.time}`}>
                  {moment(msg.time).format('dddd MMMM Do, hh:mm:ss')} <Gravatar emailHash={msg.user.emailHash} /> {msg.user.username}: {msg.text}
                </div>
              );
            })
          }
        </div>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            value={this.state.message}
            onChange={this.handleChange}
            placeholder="Say something..."/>

          <Button>Send</Button>
        </form>

      </div>
    );
  }
}

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired
};
