import PropTypes from 'prop-types';
import { cloneElement } from 'react';

export default function CloseDropdown(props, context) {
  return cloneElement(props.children, {
    onClick: (...args) => {
      context.closeDropdown();
      return props.children.props.onClick && props.children.props.onClick(...args);
    },
  });
}

CloseDropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

CloseDropdown.contextTypes = {
  closeDropdown: PropTypes.func.isRequired,
};
