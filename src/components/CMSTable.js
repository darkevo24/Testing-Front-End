import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

const CMSTable = ({ customWidth, header, data }) => {
  const history = useHistory();

  return (
    <div className="sdp-content-table__body">
      <div className="table-header d-flex justify-content-between">
        {header.map((title, key) => (
          <span key={key} style={{ width: customWidth.length !== header.length + 1 ? 'auto' : customWidth[key] + '%' }}>
            {title}
          </span>
        ))}
        <span
          style={{
            width: customWidth.length !== header.length + 1 ? 'auto' : customWidth[customWidth.length - 1] + '%',
          }}></span>
      </div>
      {data.map((item, idx) => (
        <div key={idx} className="table-body d-flex justify-content-between">
          {item.data.map((value, key) => (
            <span key={key} style={{ width: customWidth.length !== item.data.length + 1 ? 'auto' : customWidth[key] + '%' }}>
              {value}
            </span>
          ))}
          <span
            style={{ width: customWidth.length !== item.length + 1 ? 'auto' : customWidth[customWidth.length - 1] + '%' }}>
            {!item.action ? (
              ''
            ) : (
              <Button onClick={() => history.push(item.action)} variant="info">
                Detail
              </Button>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CMSTable;
