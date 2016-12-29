import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateGame from 'components/CreateGame';
import actions from 'actions/lobbyActions';
import { get } from 'lodash';

export default connect(
  state => ({
    disabled: !get(state, ['session', 'userId']),
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(CreateGame);
