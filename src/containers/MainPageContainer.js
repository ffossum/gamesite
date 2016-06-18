import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/mainChat';
import MainPage from 'components/MainPage';
import { mainPageSelector } from 'selectors';

export default connect(
  mainPageSelector,
  dispatch => bindActionCreators(actions, dispatch)
)(MainPage);
