import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateGame from 'components/CreateGame';
import actions from 'actions/lobbyActions';
import { get } from 'lodash/fp';

export default connect(
  state => ({
    disabled: !get(['session', 'userId'], state),
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(CreateGame);
