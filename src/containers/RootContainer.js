import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from 'containers/NavContainer';
import Modal from 'components/common/modal/Modal';
import LoginForm from './forms/LoginForm';
import RegisterUserForm from './forms/RegisterUserForm';
import modalActions from 'actions/modal';

import {
  LOGIN_MODAL,
  REGISTER_MODAL,
} from 'constants/modalType';

import styles from 'client/client.css';
import modalStyle from 'components/common/modal/modal.css';

function getModalContent(modalType) {
  switch (modalType) {
    case LOGIN_MODAL: return <LoginForm />;
    case REGISTER_MODAL: return <RegisterUserForm />;
    default: throw Error('Unknown modal type');
  }
}

class Root extends React.Component {
  render() {
    const { modal, closeModal } = this.props;
    console.log('closeModal', closeModal);

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
            <Modal onClose={closeModal}>
              {getModalContent(modal)}
            </Modal>
        }
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
  state => ({ modal: state.get('modal') }),
  dispatch => bindActionCreators(modalActions, dispatch)
)(Root);

