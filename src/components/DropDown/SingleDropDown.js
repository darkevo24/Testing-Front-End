import React from 'react';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import Select, { components } from 'react-select';

const IconOption = (props) => {
  const { defaultOptionIcon } = props.selectProps;
  return (
    <components.Option {...props}>
      {!props?.data?.icon ? (
        defaultOptionIcon
      ) : (
        <img src={props.data.icon} alt={props.data.label} width="20px" height="20px" />
      )}
      <span className="ml-10">{props.data.label}</span>
    </components.Option>
  );
};

const Control = ({ children, ...props }) => {
  const { defaultIcon } = props.selectProps;
  return (
    <components.Control {...props}>
      {defaultIcon}
      {children}
    </components.Control>
  );
};

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
    typeof this.props.onChange === 'function' && this.props.onChange(selected, this.props.type, this.props.extraProps);
  };

  render() {
    const {
      data,
      placeHolder,
      isLoading = false,
      isClearable = false,
      isDisabled = false,
      noValue,
      defaultOptionIcon = null,
      defaultIcon,
    } = this.props;
    const { selectedValues } = this.state;
    return (
      <Select
        closeMenuOnSelect={true}
        value={noValue ? null : !isEmpty(selectedValues) ? selectedValues : null}
        options={data}
        className="basic-single"
        classNamePrefix="select"
        onChange={this.handleOnChange}
        isClearable={isClearable}
        placeholder={placeHolder}
        isLoading={isLoading}
        isDisabled={isDisabled}
        components={{ Option: IconOption, Control }}
        defaultOptionIcon={defaultOptionIcon}
        defaultIcon={defaultIcon}
      />
    );
  }
}
