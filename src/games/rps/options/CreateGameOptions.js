import React, { PropTypes } from 'react';
import { isFunction } from 'lodash';
import Incrementer from 'components/common/incrementer/Incrementer';
import formStyles from 'containers/forms/form.css';
import defaultValues from './defaultValues';

export default class CreateGameOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        ...defaultValues,
        ...props.values,
      },
    };

    this.handleFirstToChange = firstTo => this.setState({ values: { firstTo } });
  }

  componentWillUpdate(nextProps, nextState) {
    if (isFunction(nextProps.onChange) &&
      this.state.values !== nextState.values) {
      nextProps.onChange(nextState.values);
    }
  }

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
