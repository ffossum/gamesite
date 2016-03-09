import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from 'actions/mainChat';
import Chat from 'components/chat/Chat';

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Main page</h1>
        <Chat sendMessage={this.props.sendMessage} messages={this.props.messages} />
      </div>
    );
  }
}

export default connect(
  state => state.mainChat,
  dispatch => bindActionCreators(actions, dispatch)
)(Main);
