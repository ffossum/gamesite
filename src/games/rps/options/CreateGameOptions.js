// @flow

import React, { PropTypes } from 'react';
import { isFunction } from 'lodash/fp';
import Incrementer from 'components/common/incrementer/Incrementer';
import formStyles from 'containers/forms/form.css';
import defaultValues from './defaultValues';

import type { Options } from '../types';
type Props = {
  onChange: (options: Options) => void,
  values: Options,
}
type State = {
  values: Options,
}

export default class CreateGameOptions extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      values: {
        ...defaultValues,
        ...props.values,
      },
    };
  }
  state: State;
  componentWillUpdate(nextProps: Props, nextState: State) {
    if (isFunction(nextProps.onChange) &&
      this.state.values !== nextState.values) {
      nextProps.onChange(nextState.values);
    }
  }
  handleFirstToChange = (firstTo: number) => this.setState({ values: { firstTo } });
  props: Props;

  render() {
    const { values } = this.state;
    return (
      <div className={formStyles.formInput}>
        <Incrementer
          label="First to"
          maxValue={5}
          minValue={1}
          onChange={this.handleFirstToChange}
          value={values.firstTo}
        />
      </div>
    );
  }
}

CreateGameOptions.propTypes = {
  onChange: PropTypes.func,
  values: PropTypes.object.isRequired,
};
