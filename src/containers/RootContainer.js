import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from 'containers/NavContainer';
import Modal from 'components/common/modal/Modal';
import LoginForm from './forms/LoginForm';
import RegisterUserForm from './forms/RegisterUserForm';
import ForgotPasswordForm from './forms/ForgotPasswordForm';
import UserSettingsContainer from './UserSettingsContainer';
import modalActions from 'actions/modal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  LOGIN_MODAL,
  REGISTER_MODAL,
  REQUEST_PASSWORD_RESET_MODAL,
  USER_SETTINGS_MODAL,
} from 'constants/modalType';

import styles from 'client/client.css';
import modalStyle from 'components/common/modal/modal.css';

function getModalContent(modalType) {
  switch (modalType) {
    case LOGIN_MODAL: return <LoginForm />;
    case REGISTER_MODAL: return <RegisterUserForm />;
    case REQUEST_PASSWORD_RESET_MODAL: return <ForgotPasswordForm />;
    case USER_SETTINGS_MODAL: return <UserSettingsContainer />;
    default: throw Error('Unknown modal type');
  }
}

class Root extends React.Component {
  render() {
    const { modal, closeModal } = this.props;

    return (
      <div>
        <div className={modal && modalStyle.backdrop}>
          <Nav />
          <main className={styles.content}>
            {this.props.children}
          </main>
        </div>
        <ReactCSSTransitionGroup
          transitionName="modal"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {
            modal &&
              <Modal key={modal} onClose={closeModal}>
                {getModalContent(modal)}
              </Modal>
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Root.propTypes = {
  modal: PropTypes.string,
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
};

export default connect(
  state => ({ modal: state.modal }),
  dispatch => bindActionCreators(modalActions, dispatch)
)(Root);

