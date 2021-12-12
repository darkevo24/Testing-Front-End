import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { LeftChevron, RightChevron } from 'components/Icons';

const CMSTable = ({ customWidth, pageCount, onPageIndexChange, header, data, tableState = 'idle' }) => {
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
      {data.length === 0 ? <div className="text-center">Tidak ada data</div> : null}
      {data.map((item, idx) => (
        <div key={idx} className="table-body d-flex justify-content-between">
          {item.data.map((value, key) => (
            <span
              key={key}
              className={item.classValue && item.classValue[key] ? 'sdp-log__status ' + item.classValue[key] : {}}
              style={Object.assign(
                { width: customWidth.length !== item.data.length + 1 ? 'auto' : customWidth[key] + '%' },
                item.dataStyle && item.dataStyle.length - 1 >= key && item.dataStyle[key] ? item.dataStyle[key] : {},
              )}>
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
            {item.actions
              ? item.actions.map((act, key) => {
                  return (
                    <Button
                      onClick={() => history.push(act.link)}
                      variant="info"
                      disabled={act.disabled}
                      key={idx + ':' + key}>
                      {act.title}
                    </Button>
                  );
                })
              : ''}
          </span>
        </div>
      ))}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<RightChevron />}
        className="pagination float-end pt-20"
        pageClassName="pagination-page"
        nextClassName="pagination-next"
        previousClassName="pagination-prev"
        activeClassName="active"
        onPageChange={onPageIndexChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<LeftChevron />}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default CMSTable;
