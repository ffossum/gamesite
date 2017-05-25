/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from 'containers/NavContainer';
import Modal from 'components/common/modal/Modal';
import LoginForm from './forms/LoginForm';
import RegisterUserForm from './forms/RegisterUserForm';
import ForgotPasswordForm from './forms/ForgotPasswordForm';
import UserSettingsContainer from './UserSettingsContainer';
import modalActions from 'actions/modalActions';

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
  props: {
    modal?: string,
    children?: any,
    closeModal: Function,
  }
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
        {
          modal &&
            <Modal key={modal} onClose={closeModal}>
              {getModalContent(modal)}
            </Modal>
        }
      </div>
    );
  }
}

export default connect(
  state => ({ modal: state.modal }),
  (dispatch: Dispatch<*>) => bindActionCreators(modalActions, dispatch)
)(Root);

