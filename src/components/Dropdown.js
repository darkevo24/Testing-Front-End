import RBDropdown from 'react-bootstrap/Dropdown';
import RBDropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';

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
            field.onChange(option);
          };
          const title = field.value?.label ?? placeholder;
          return (
            <RBDropdownButton title={title} variant={variant} {...rest} {...field}>
              {options.map((option) => (
                <RBDropdown.Item onClick={handleClick(option)} active={selectedOption?.value === option.value}>
                  {option.label}
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
