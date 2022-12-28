/* eslint-disable no-bitwise */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-danger */
/* eslint-disable no-return-await */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { ReactComponent as PdfSvg } from 'assets/pdf.svg';
import { ReactComponent as DelAttachmentSvg } from 'assets/delAttachment.svg';
import { getPdf } from 'utils/helper';

function Attachment({ fileData, setFile, handleAttachment }) {
  const deleteAttachment = (index) => {
    const data = [...fileData];
    data.splice(index, 1);
    handleAttachment('attachment', data);
  };

  return (
    <div className="attachment">
      <div className="max-w-fit overflow-x-auto overflow-y-hidden">
        <div className="d-flex flex-wrap mt-4 w-fit h-100">
          {fileData &&
            fileData.map((data, index) => (
              <div className="w-100px h-100px mr-4 bg-grayBg rounded-lg mb-4" key={`file-${data.type}-${index}`}>
                <div className="d-flex flex-collumn justify-center h-100 p-3 position-relative overflow-y-hidden">
                  {data.type === 'application/pdf' ? (
                    <div onClick={async () => setFile({ file: await getPdf(data.file), type: 'pdf' })} className="w-100">
                      <div className="d-flex justify-content-center">
                        <PdfSvg className="w-8" />
                      </div>
                      <div className="text-center text-gray1 mt-3 max-h-5">{data.name}</div>
                    </div>
                  ) : (
                    <img
                      className="position-image"
                      src={data.file}
                      alt="file-data"
                      onClick={() => setFile({ file: data.file, type: 'image' })}
                    />
                  )}
                  <DelAttachmentSvg
                    onClick={() => deleteAttachment(index)}
                    className="position-absolute top-1 right-1 h-14 w-14"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Attachment;
