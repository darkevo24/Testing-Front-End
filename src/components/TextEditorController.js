import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';
import { apiUrls } from 'utils/constants';

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
  images_upload_url: `${apiUrls.publicFileUpload}`,
  file_picker_types: 'image media',
};

export const TextEditorController = ({
  name,
  control,
  rules,
  error,
  labelClass = '',
  label,
  disabled,
  group,
  groupClass = 'mb-3',
  groupProps,
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
            // initialValue={defaultValue}
            disabled={disabled}
            onEditorChange={field.onChange}
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
