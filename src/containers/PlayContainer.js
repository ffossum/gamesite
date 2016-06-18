import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/gamesList';
import { playSelector } from 'selectors';

import Play from 'components/Play';

export default connect(
  playSelector,
  dispatch => bindActionCreators(actions, dispatch)
)(Play);
