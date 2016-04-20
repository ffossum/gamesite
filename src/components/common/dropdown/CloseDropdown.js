import React, { PropTypes } from 'react';

export default function CloseDropdown(props, context) {
  return (
    <span onClick={context.closeDropdown}>{props.children}</span>
  );
}

CloseDropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

CloseDropdown.contextTypes = {
  closeDropdown: PropTypes.func.isRequired,
};
