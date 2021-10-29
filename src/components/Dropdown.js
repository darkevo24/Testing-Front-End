import RBDropdown from 'react-bootstrap/Dropdown';
import RBDropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import find from 'lodash/find';
import map from 'lodash/map';
import uniqBy from 'lodash/uniqBy';
import { Check } from 'components/Icons';

export const Dropdown = ({
  name,
  control,
  rules,
  error,
  selectedOption,
  placeholder,
  options = [],
  variant = 'secondary',
  label,
  multi = false,
  group,
  groupClass = 'mb-3',
  ...rest
}) => {
  const dropdownNode = (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const handleClick = (option) => () => {
            if (multi) {
              // TODO: handle unselect of an element
              const currentFieldValue = field.value && isArray(field.value) ? field.value : [];
              currentFieldValue.push(option);
              field.onChange(uniqBy(currentFieldValue, 'value'));
              return;
            }
            field.onChange(option);
          };
          let title = field.value?.label ?? placeholder;
          if (isString(field.value)) {
            const currentValueOption = find(options, { value: field.value });
            if (currentValueOption) {
              title = currentValueOption.label;
            }
          }
          let multiValues = [];
          if (multi && field.value && isArray(field.value)) {
            multiValues = map(field.value, 'value');
          }
          return (
            <RBDropdownButton title={title} variant={variant} {...rest} {...field}>
              {options.map((option) => (
                <RBDropdown.Item
                  key={option.value}
                  onClick={handleClick(option)}
                  active={selectedOption?.value === option.value}>
                  {option.label}
                  {multi && multiValues.includes(option.value) && <Check />}
                </RBDropdown.Item>
              ))}
            </RBDropdownButton>
          );
        }}
      />
      <div className="sdp-error">{error}</div>
    </>
  );
  return group ? <Form.Group className={groupClass}>{dropdownNode}</Form.Group> : dropdownNode;
};

export default Dropdown;
