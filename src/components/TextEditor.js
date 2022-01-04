import { Editor } from '@tinymce/tinymce-react';
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
    image preview',
  images_upload_url: apiUrls.publicFileUpload,
  file_picker_types: 'image media',
};

const TextEditor = ({ defaultValue, disabled, onChange = () => {} }) => {
  return (
    <Editor
      apiKey="2htoke0b3pysjlaz24f7uw5uarba4s6wi6oy0lhi4ne43237"
      init={EditorConfig}
      className="tinymce-custom"
      initialValue={defaultValue}
      disabled={disabled}
      onEditorChange={(e) => onChange(e)}
    />
  );
};

export default TextEditor;
