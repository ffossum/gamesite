import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateGame from 'components/CreateGame';
import actions from 'actions/gamesList';

export default connect(
  state => ({
    disabled: !state.getIn(['session', 'userId']),
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(CreateGame);
