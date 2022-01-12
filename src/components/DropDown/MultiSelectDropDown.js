import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';

export default class MultiSelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: [],
    };
  }

  componentDidMount() {
    const { defaultData = [] } = this.props;
    if (defaultData && defaultData?.length) {
      this.setState({ selectedValues: [...defaultData] });
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    const { defaultData = [] } = this.props;
    if (defaultData && defaultData?.length && !isEqual(defaultData, prevProps.defaultData)) {
      this.setState({ selectedValues: [...defaultData] });
    }
    if (!defaultData?.length && prevProps.defaultData?.length) {
      this.setState({ selectedValues: [] });
    }
  }

  // handleOnChange = (selected, { action, removedValue }) => {
  //   if (['remove-value', 'pop-value'].includes(action)) {
  //     if (removedValue?.isFixed) {
  //       return;
  //     }
  //   }
  //
  //   this.setState({ selectedValues: selected });
  //   typeof this.props.onChange === 'function' && this.props.onChange(selected, this.props.type);
  //   // this.props.on(selected, this.props.type);
  // };

  render() {
    const {
      name,
      control,
      rules,
      error,
      labelClass = '',
      label,
      group,
      groupClass = 'mb-3',
      groupProps,
      // className,
      type = '',
      styles = {},
      isMulti = true,
      placeHolder,
      isClearable = true,
      disabled = false,
      data,
      onInputChange,
      isCreatable = false,
      onCreateOption = {},
      // ...rest
    } = this.props;
    // const { type = '', placeHolder, data, isMulti = true, disabled = false, isClearable = true, styles = {} } = this.props;
    const dropdownNode = (
      <>
        {label && <Form.Label className={labelClass}>{label}</Form.Label>}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => {
            const handleInputChange = (newValue) => {
              const inputValue = newValue.replace(/\W/g, '');
              if (isFunction(onInputChange?.current)) {
                onInputChange.current(inputValue);
              }
              return inputValue;
            };
            const Component = isCreatable ? CreatableSelect : Select;
            return (
              <Component
                id={type}
                value={field.value}
                styles={styles}
                closeMenuOnSelect={false}
                isMulti={isMulti}
                options={data}
                placeholder={placeHolder}
                className="basic-multi-select"
                classNamePrefix="select-multi"
                onChange={field.onChange}
                onInputChange={handleInputChange}
                isClearable={isClearable}
                isDisabled={disabled}
                menuPlacement="auto"
                onCreateOption={onCreateOption}
              />
            );
          }}
        />
        <div className="sdp-error">{error}</div>
      </>
    );
    return group ? (
      <Form.Group className={groupClass} {...groupProps}>
        {dropdownNode}
      </Form.Group>
    ) : (
      dropdownNode
    );
  }
}
