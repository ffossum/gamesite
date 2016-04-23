import { cloneElement, PropTypes } from 'react';

export default function CloseDropdown(props, context) {
  return cloneElement(props.children, {
    onClick: (...args) => {
      context.closeDropdown();
      return props.children.onClick && props.children.onClick(...args);
    },
  });
}

CloseDropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

CloseDropdown.contextTypes = {
  closeDropdown: PropTypes.func.isRequired,
};
