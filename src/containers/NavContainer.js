import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import loginActions from 'actions/login';
import modalActions from 'actions/modal';
import Nav from 'components/nav/Nav';
import { navSelector } from 'selectors';

export default connect(
  navSelector,
  dispatch => bindActionCreators({ ...loginActions, ...modalActions }, dispatch),
  null,
  { pure: false }
)(Nav);
