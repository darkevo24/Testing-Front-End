import React from 'react';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import Select from 'react-select';

export default class SingleSelectDropdown extends React.Component {
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

  handleOnChange = (selected) => {
    this.setState({ selectedValues: selected });
    //this.props.onChange(selected, this.props.type, this.props.extraProps);
  };

  render() {
    const { data, placeHolder, isLoading = false, isClearable = false, isDisabled = false } = this.props;
    const { selectedValues } = this.state;
    return (
      <Select
        closeMenuOnSelect={true}
        value={!isEmpty(selectedValues) ? selectedValues : null}
        options={data}
        className="basic-single"
        classNamePrefix="select"
        onChange={this.handleOnChange}
        isClearable={isClearable}
        placeholder={placeHolder}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    );
  }
}
