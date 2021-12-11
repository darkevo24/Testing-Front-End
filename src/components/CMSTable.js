import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import { LeftChevron, RightChevron } from 'components/Icons';

const CMSTable = ({ customWidth, header, data, tableState = 'idle', pagination = null, handlePageChange = () => {} }) => {
  const history = useHistory();

  const nextPage = () => {
    if (pagination.page === pagination.totalPages) {
      return;
    }
    handlePageChange(pagination.page + 1);
  };

  const previousPage = () => {
    if (pagination.page === 1) {
      return;
    }
    handlePageChange(pagination.page - 1);
  };

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
      {pagination ? (
        <div className="sdp-table">
          <div className="pagination float-end">
            <div className={cx('pagination-prev', { disabled: pagination.page === 1 })} onClick={() => previousPage()}>
              <LeftChevron variant={pagination.page > 0 ? 'dim' : 'light'} />
            </div>
            {Array.from({ length: pagination.totalPages }).map((_, index) => {
              const currentPageIndex = 1 + index;
              return (
                <div
                  key={`page-${currentPageIndex}`}
                  className={cx('pagination-page', { active: currentPageIndex === pagination.page })}
                  onClick={() => handlePageChange(currentPageIndex)}>
                  {currentPageIndex}
                </div>
              );
            })}
            <div
              className={cx('pagination-next', { disabled: pagination.page === pagination.totalPages })}
              onClick={() => nextPage()}>
              <RightChevron variant={pagination.page <= pagination.totalPages ? 'dim' : 'light'} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CMSTable;
