import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';

export const Input = ({ name, control, rules, error, label, group, groupClass = 'mb-3', ...rest }) => {
  const inputNode = (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <Form.Control maxLength={rest.as === 'textarea' ? 800 : 200} {...rest} {...field} />}
      />
      <div className="sdp-error">{error}</div>
    </>
  );
  return group ? <Form.Group className={groupClass}>{inputNode}</Form.Group> : inputNode;
};

export default Input;
