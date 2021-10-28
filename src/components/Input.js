import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';

export const Input = ({ name, control, rules, error, ...rest }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <Form.Control {...rest} {...field} />}
      />
      <div className="sdp-error">{error}</div>
    </>
  );
};

export default Input;
