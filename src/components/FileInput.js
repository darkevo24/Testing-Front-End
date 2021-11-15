import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';

export const FileInput = ({
  name,
  control,
  rules,
  error,
  label,
  group,
  groupClass = 'mb-3',
  className,
  isLink,
  ...rest
}) => {
  let { as: inputAs } = rest;

  const maxLength = inputAs === 'textarea' ? 800 : 200;
  const inputClassnames = [];
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
            <Form.Control type="file" maxLength={maxLength} {...rest} {...field} value={field.value || ''} className={finalClassName} />
            <div className="upload-info">Upload Image (format .png, .jpeg, .jpg max. 512KB)</div>
          </div>
        )}
      />
      <div className="sdp-error">{error}</div>
    </>
  );
  return group ? <Form.Group className={groupClass}>{inputNode}</Form.Group> : inputNode;
};

export default FileInput;
