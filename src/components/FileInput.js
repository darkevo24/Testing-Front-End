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
  groupProps,
  className,
  disabled,
  labelClass = '',
  isLink,
  uploadInfo = '',
  handleOnChange,
  ...rest
}) => {
  const inputClassnames = [];
  if (className) {
    inputClassnames.push(className);
  }
  let finalClassName = inputClassnames.length ? inputClassnames.join(' ') : '';

  const inputNode = (
    <>
      {label && <Form.Label className={labelClass}>{label}</Form.Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          return (
            <div className="sdp-input-wrapper">
              <Form.Control
                type="file"
                onChange={(e) => onChange(handleOnChange(e.target.files[0]))}
                disabled={disabled}
                {...rest}
                className={finalClassName}
                custom="true"
              />
              <div className="upload-info">{uploadInfo}</div>
            </div>
          );
        }}
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

export default FileInput;
