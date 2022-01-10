import React from 'react';
import Form from 'react-bootstrap/Form';
import cx from 'classnames';
import InputGroup from 'react-bootstrap/InputGroup';
import Notification from 'components/Notification';
import { Controller } from 'react-hook-form';
import { copyToClipboard } from 'utils/helper';
import { icons } from './Icons';

export const Input = ({
  name,
  control,
  rules,
  error,
  label,
  group,
  labelClass,
  groupClass = 'mb-3',
  groupProps,
  className,
  wrapperClass = '',
  leftIconClass = '',
  rightIconClass = '',
  leftIcon,
  rightIcon,
  isLink,
  maxLength = '800',
  prefixText = '',
  ...rest
}) => {
  let { as: inputAs } = rest;
  if (isLink && !leftIcon) {
    leftIcon = 'link';
  }
  if (isLink && !rightIcon) {
    rightIcon = 'copy';
  }

  const handleIconClick = (field) => {
    if (rightIcon === 'copy') {
      copyToClipboard(field.value);
      Notification.show({
        type: 'secondary',
        message: <div> Link berhasil dicopy </div>,
        icon: 'check',
      });
    }
  };
  const maxLengthNumber = inputAs === 'textarea' ? maxLength : 200;
  const LeftIconNode = leftIcon && icons[leftIcon];
  const RightIconNode = rightIcon && icons[rightIcon];

  const inputNode = (
    <>
      {label && <Form.Label className={labelClass}>{label}</Form.Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <InputGroup className={cx('sdp-input-wrapper', wrapperClass)}>
            {LeftIconNode && (
              <InputGroup.Text className={cx('input-icon bg-white', leftIconClass)}>
                <LeftIconNode />
              </InputGroup.Text>
            )}
            {prefixText && <InputGroup.Text className={cx('bg-white', leftIconClass)}>{prefixText}</InputGroup.Text>}
            <Form.Control maxLength={maxLengthNumber} {...rest} {...field} value={field.value || ''} className={className} />
            {RightIconNode && (
              <InputGroup.Text
                className={cx('input-icon bg-white copy-link', rightIconClass)}
                onClick={() => handleIconClick(field)}>
                <RightIconNode />
              </InputGroup.Text>
            )}
          </InputGroup>
        )}
      />
      <div className="sdp-error">{error}</div>
    </>
  );
  return group ? (
    <Form.Group className={groupClass} {...groupProps}>
      {inputNode}
    </Form.Group>
  ) : (
    inputNode
  );
};

export default Input;
