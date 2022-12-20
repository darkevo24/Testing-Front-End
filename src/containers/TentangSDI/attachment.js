/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */

function Attachment({ fileData }) {
  return (
    <div className="max-w-fit overflow-scroll">
      <div className="d-flex flex-row mt-4 h-full" scrollable={true}>
        {fileData &&
          fileData.map((data, id) => (
            <div className="w-60 h-50 mr-4 bg-gray rounded-lg" key={`file-${data.type}-${id}`}>
              <div className="flex flex-col justify-center h-full p-3">
                {data.type === 'application/pdf' ? (
                  <div>
                    <div className="flex justify-center">
                      {/* <Icon.PdfSvg className="w-8" /> */}
                      File PDF
                    </div>
                    <div className="text-center text-gray1 mt-3">{data.name}</div>
                  </div>
                ) : (
                  <img className="image w-100" src={data.file} alt="file-data" />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Attachment;
