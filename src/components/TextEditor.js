import { Editor } from '@tinymce/tinymce-react';

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

const TextEditor = ({ defaultValue, disabled, onChange = () => {} }) => {
  return (
    <Editor
      apiKey="ne6hq4p5tdn0hwuirba4i005nv3yavpgeahao9yy58ka476c"
      init={EditorConfig}
      className="tinymce-custom"
      initialValue={defaultValue}
      disabled={disabled}
      onEditorChange={(e) => onChange(e)}
    />
  );
};

export default TextEditor;
