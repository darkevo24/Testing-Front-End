import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import RBTable from 'react-bootstrap/Table';
import cx from 'classnames';
import { usePagination, useSortBy, useTable } from 'react-table';

import { Search, actionIcons } from 'components/Icons';
import bn from 'utils/bemNames';

const bem = bn('table');

const Table = ({ columns, data, title, search, searchPlaceholder = 'Search', searchButtonText = 'Search', onSearch }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
  );
  return (
    <div className={bem.b()}>
      <div className={bem.e('header')}>{title}</div>
      <div className="d-flex justify-content-between align-items-center mb-40">
        <InputGroup>
          <Form.Control variant="normal" type="text" placeholder={searchPlaceholder} />
          <Search />
        </InputGroup>
        <Button variant="info" className="ml-16 text-nowrap" onClick={onSearch}>
          {searchButtonText}
        </Button>
      </div>
      <RBTable bordered={false} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </RBTable>
      <div className="pagination float-end">
        <div className="pagination-prev" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </div>
        {Array.from({ length: pageOptions.length }).map((_, index) => (
          <div
            key={`page-${index}`}
            className={cx('pagination-page', { active: index === pageIndex })}
            onClick={() => gotoPage(index)}>
            {index + 1}
          </div>
        ))}
        {/* pageOptions.length */}
        <div className="pagination-next" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </div>
        {/* <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  );
};

// Note: add the compounded components here.
Table.Link = ({ cell }) => (
  <a role="button" target="_blank" href={cell.value} rel="noreferrer">
    {cell.value}
  </a>
);

Table.Actions = ({ cell, ...rest }) => {
  const { column: { actions = [] } = {}, row } = cell;
  const id = row.id || row.index;
  return (
    <div className="d-flex action-icon-wrapper">
      {actions.map(({ icon, type, variant, callback }) => {
        const Icon = icon || actionIcons[type];
        if (!Icon) return null;
        return (
          <div className="icon-box" onClick={callback}>
            <Icon key={`${id}-${type}`} variant={variant || (type === 'trash' && 'danger')} />
          </div>
        );
      })}
    </div>
  );
};

export default Table;
