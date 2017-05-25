import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import modalActions from 'actions/modalActions';
import Nav from 'components/nav/Nav';
import { navSelector } from 'selectors';

export default connect(
  navSelector,
  dispatch => bindActionCreators({ ...loginActions, ...modalActions }, dispatch),
  null,
  { pure: false }
)(Nav);
