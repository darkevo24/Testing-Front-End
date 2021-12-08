import Form from 'react-bootstrap/Form';
import cx from 'classnames';
import { icons } from './Icons';
import { copyToClipboard } from 'utils/helper';
import InputGroup from 'react-bootstrap/InputGroup';
import React from 'react';

export const ReadOnlyInputs = ({
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
  const maxLengthNumber = inputAs === 'textarea' ? maxLength : 200;
  const LeftIconNode = leftIcon && icons[leftIcon];
  const RightIconNode = rightIcon && icons[rightIcon];

  const inputNode = (
    <>
      {label && <Form.Label className={labelClass}>{label}</Form.Label>}
      <InputGroup className={cx('sdp-input-wrapper', wrapperClass)}>
        {LeftIconNode && (
          <InputGroup.Text className={cx('input-icon bg-white', leftIconClass)}>
            <LeftIconNode />
          </InputGroup.Text>
        )}
        <Form.Control maxLength={maxLengthNumber} {...rest} className={cx('bg-gray', className)} readOnly />
        {RightIconNode && (
          <InputGroup.Text className={cx('input-icon bg-white', rightIconClass)} onClick={handleIconClick(rest)}>
            <RightIconNode />
          </InputGroup.Text>
        )}
      </InputGroup>
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

export default ReadOnlyInputs;
