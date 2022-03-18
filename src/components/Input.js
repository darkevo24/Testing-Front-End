import React from 'react';
import Form from 'react-bootstrap/Form';
import cx from 'classnames';
import InputGroup from 'react-bootstrap/InputGroup';
import Notification from 'components/Notification';
import { Controller } from 'react-hook-form';
import { copyToClipboard } from 'utils/helper';
import { icons } from './Icons';
import { ReactComponent as Union } from '../assets/union.svg';
import { Tooltip } from 'react-tippy';

export const Input = ({
  name,
  control,
  type,
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
  infoIcon = '',
  ...rest
}) => {
  let { as: inputAs } = rest;
  if (isLink && !leftIcon) {
    leftIcon = 'link';
  }
  if (isLink && !rightIcon) {
    rightIcon = 'copy';
  }
  const [inputType, setInputType] = React.useState(type);
  const [rightIconName, setRightIconName] = React.useState(() => {
    if ((rightIcon === 'eye' || rightIcon === 'eyeOff') && type === 'password') {
      return 'eyeOff';
    }
    return rightIcon;
  });
  const handleIconClick = (field) => {
    if (rightIconName === 'copy') {
      copyToClipboard(field.value);
      Notification.show({
        type: 'secondary',
        message: <div> Link berhasil dicopy </div>,
        icon: 'check',
      });
    } else if (rightIconName === 'eye') {
      setInputType(inputType === 'text' ? 'password' : 'text');
      setRightIconName('eyeOff');
    } else if (rightIconName === 'eyeOff') {
      setInputType(inputType === 'password' ? 'text' : 'password');
      setRightIconName('eye');
    }
  };
  const maxLengthNumber = inputAs === 'textarea' ? maxLength : 200;
  const LeftIconNode = leftIcon && icons[leftIcon];
  const RightIconNode = rightIconName && icons[rightIconName];

  const inputNode = (
    <>
      {label && <Form.Label className={labelClass}>{label}</Form.Label>}
      <div className="sdp-input-main-container">
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
              <Form.Control
                maxLength={maxLengthNumber}
                {...rest}
                {...field}
                type={inputType}
                value={field.value || ''}
                className={className}
              />
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
        {infoIcon && (
          <Tooltip className="input-info" title={infoIcon} position="right">
            <Union />
          </Tooltip>
        )}
      </div>
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
