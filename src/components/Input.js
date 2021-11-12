import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';
import { icons } from './Icons';
import { copyToClipboard } from 'utils/helper';

export const Input = ({
  name,
  control,
  rules,
  error,
  label,
  group,
  groupClass = 'mb-3',
  className,
  leftIcon,
  rightIcon,
  isLink,
  isDisabled,
  ...rest
}) => {
  let { as: inputAs } = rest;
  if (isLink && !leftIcon) {
    leftIcon = 'link';
  }
  if (isLink && !rightIcon) {
    rightIcon = 'copy';
  }

  const handleIconClick = (field) => () => {
    if (rightIcon === 'copy') {
      copyToClipboard(field.value);
    }
  };
  const maxLength = inputAs === 'textarea' ? 800 : 200;
  const LeftIconNode = leftIcon && icons[leftIcon];
  const RightIconNode = rightIcon && icons[rightIcon];
  const inputClassnames = [];
  if (LeftIconNode) {
    inputClassnames.push('has-left-icon');
  }
  if (RightIconNode) {
    inputClassnames.push('has-right-icon');
  }
  if (className) {
    inputClassnames.push(className);
  }
  let finalClassName = inputClassnames.length ? inputClassnames.join(' ') : '';

  const inputNode = (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="sdp-input-wrapper">
            {LeftIconNode && (
              <div className="icon-box">
                <LeftIconNode />
              </div>
            )}
            <Form.Control
              maxLength={maxLength}
              {...rest}
              {...field}
              value={field.value || ''}
              className={finalClassName}
              disabled={isDisabled}
            />
            {RightIconNode && (
              <div className="icon-box" onClick={handleIconClick(field)}>
                <RightIconNode />
              </div>
            )}
          </div>
        )}
      />
      <div className="sdp-error">{error}</div>
    </>
  );
  return group ? <Form.Group className={groupClass}>{inputNode}</Form.Group> : inputNode;
};

export default Input;
