import React from 'react';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import CreatableSelect from 'react-select/creatable';

export default class CreatableSelectDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: {},
    };
  }

  componentDidMount() {
    const { defaultData = {} } = this.props;
    if (!isEmpty(defaultData)) {
      this.setState({ selectedValues: { ...defaultData } });
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    const { defaultData = {} } = this.props;
    if (!isEmpty(defaultData) && !isEqual(defaultData, prevProps.defaultData)) {
      this.setState({ selectedValues: { ...defaultData } });
    }
    if (isEmpty(defaultData) && !isEmpty(prevProps.defaultData)) {
      this.setState({ selectedValues: {} });
    }
  }

  handleOnChange = (selected = {}) => {
    this.setState({ selectedValues: selected });
    // this.props.onChange(selected);
  };

  render() {
    const { data, placeHolder, isLoading = false, isDisabled = false } = this.props;
    const { selectedValues } = this.state;
    return (
      <CreatableSelect
        value={!isEmpty(selectedValues) ? selectedValues : null}
        options={data}
        className="basic-single"
        classNamePrefix="select"
        onChange={this.handleOnChange}
        placeholder={placeHolder}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    );
  }
}
