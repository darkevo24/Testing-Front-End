import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';
import React from 'react';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';

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

export const SingleSelectDropdown = ({
  name,
  control,
  rules,
  error,
  options = [],
  labelClass = '',
  label,
  group,
  groupClass = 'mb-3',
  groupProps,
  className,
  data,
  onInputChange,
  isCreatable = false,
  onCreateOption,
  ...rest
}) => {
  const dropdownNode = (
    <>
      {label && <Form.Label className={labelClass}>{label}</Form.Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const handleInputChange = (newValue) => {
            if (isFunction(onInputChange?.current)) {
              onInputChange.current(newValue);
            }
            return newValue;
          };
          const Component = isCreatable ? CreatableSelect : Select;
          return (
            <Component
              closeMenuOnSelect={true}
              value={field.value}
              options={data}
              onChange={field.onChange}
              className={cx(className, 'basic-single')}
              classNamePrefix="select"
              components={{ Option: IconOption, Control }}
              onInputChange={handleInputChange}
              onCreateOption={onCreateOption}
              {...rest}
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
};

export default SingleSelectDropdown;
