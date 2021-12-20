// import Select, { components } from 'react-select';
import { Editor } from '@tinymce/tinymce-react';
// import CreatableSelect from 'react-select/creatable';
import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';
import React from 'react';
// import cx from 'classnames';
// import isFunction from 'lodash/isFunction';

const EditorConfig = {
  height: 500,
  menubar: false,
  toolbar_location: 'bottom',
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
  ],
  toolbar:
    // eslint-disable-next-line no-multi-str
    'bold italic underline | \
    alignleft aligncenter alignright alignjustify | \
    numlist bullist outdent indent | \
    image',
  images_upload_url: process.env.REACT_APP_API_URL + '/file/public-upload',
  file_picker_types: 'image media',
};

export const TextEditorController = ({
  name,
  control,
  rules,
  error,
  labelClass = '',
  label,
  defaultValue,
  disabled,
  // onChange = () => {},
  group,
  groupClass = 'mb-3',
  groupProps,
  onInputChange,
  isCreatable = false,
  // ...rest
}) => {
  const dropdownNode = (
    <>
      {label && <Form.Label className={labelClass}>{label}</Form.Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Editor
            apiKey="ne6hq4p5tdn0hwuirba4i005nv3yavpgeahao9yy58ka476c"
            init={EditorConfig}
            className="tinymce-custom"
            initialValue={defaultValue}
            disabled={disabled}
            onEditorChange={(newValue, editor) => {
              field.onChange(editor.getContent({ format: 'text' }));
            }}
          />
        )}
      />
      <div className="sdp-error">{error}</div>
    </>
  );
  return group ? (
    <Form.Group className={groupClass} {...groupProps}>
      {dropdownNode}
    </Form.Group>
  ) : (
    dropdownNode
  );
};

export default TextEditorController;
