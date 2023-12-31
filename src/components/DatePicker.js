import { createRef } from 'react';
import Form from 'react-bootstrap/Form';
import RDatePicker from 'react-datepicker';
import moment from 'moment';
import cx from 'classnames';
import { Controller } from 'react-hook-form';
import { LeftChevron, RightChevron, Calender } from './Icons';
import { ReactComponent as ArrowDown } from 'assets/arrow-down-datepicker.svg';
import bn from 'utils/bemNames';

const bem = bn('date-picker');

export const DatePicker = ({
  name,
  control,
  rules,
  error,
  label,
  labelClass,
  format = 'DD/MM/YYYY',
  group,
  groupClass = 'mb-3',
  arrow,
  className,
  ...rest
}) => {
  let refDatePicker = createRef();
  let datePickerProps = {};
  if (rest.min) {
    datePickerProps.minDate = typeof rest.min === 'string' ? moment(rest.min).toDate() : rest.min;
  }
  if (rest.max) {
    datePickerProps.maxDate = typeof rest.max === 'string' ? moment(rest.max).toDate() : rest.max;
  }
  if (rest.placeholder) {
    datePickerProps.placeholderText = rest.placeholder;
  }
  const DatePickerNode = (
    <>
      {label && <Form.Label className={labelClass}>{label}</Form.Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const { onChange } = field;
          return (
            <div className={cx('sdp-input-wrapper', bem.b(className))}>
              <div
                className="icon-box"
                onClick={() => {
                  if (refDatePicker.current) {
                    refDatePicker.current.deferFocusInput();
                  }
                }}>
                {arrow ? <ArrowDown /> : <Calender />}
              </div>
              <RDatePicker
                selected={
                  field && field.value && typeof field.value === 'string'
                    ? moment(field.value, format).toDate()
                    : field.value
                }
                {...datePickerProps}
                autoComplete="off"
                onChange={(e) => {
                  if (!e) {
                    onChange('');
                    return;
                  }
                  const date = moment(e).toDate();
                  const fullYear = e.getFullYear();
                  if (Number(fullYear) <= 9999) {
                    onChange(date);
                  }
                }}
                onMonthChange={() => {
                  window.scrollBy(0, -1);
                  window.scrollBy(0, 1);
                }}
                onKeyDown={() => {
                  window.scrollBy(0, -1);
                  window.scrollBy(0, 1);
                }}
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className={bem.e('header')}>
                    <div
                      className={bem.e('action-button')}
                      onClick={(e) => {
                        e.preventDefault();
                        decreaseMonth();
                      }}
                      disabled={prevMonthButtonDisabled}>
                      <LeftChevron />
                    </div>
                    <p className={bem.e('text')}>{moment(date).format('MMMM YYYY')}</p>
                    <div
                      className={bem.e('action-button')}
                      onClick={(e) => {
                        e.preventDefault();
                        increaseMonth();
                      }}
                      disabled={nextMonthButtonDisabled}>
                      <RightChevron />
                    </div>
                  </div>
                )}
                ref={refDatePicker}
                {...rest}
              />
            </div>
          );
        }}
      />
      <div className="sdp-error">{error}</div>
    </>
  );
  return group ? <Form.Group className={groupClass}>{DatePickerNode}</Form.Group> : DatePickerNode;
};

export default DatePicker;
