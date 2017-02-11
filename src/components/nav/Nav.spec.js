/* @flow */
/* eslint-env jest */

import React from 'react';
import Nav from './Nav';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const logOut = () => {};
const openModal = () => {};

describe('Nav', () => {
  test('renders correctly', () => {
    const component = shallow(<Nav logOut={logOut} openModal={openModal} />);
    expect(toJSON(component)).toMatchSnapshot();
  });
});
