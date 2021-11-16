import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import RBTable from 'react-bootstrap/Table';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import { useAsyncDebounce, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

import { LeftChevron, RightChevron, Search, actionIcons } from 'components/Icons';
import bn from 'utils/bemNames';

const bem = bn('table');

export const FilterSearchInput = ({
  searchPlaceholder = 'Search',
  onSearch,
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  manualPagination = false,
}) => {
  const [value, setValue] = useState(globalFilter);
  const onSearchChange = useAsyncDebounce((value) => {
    if (manualPagination) {
      if (isFunction(onSearch)) {
        onSearch(value);
      }
    } else {
      setGlobalFilter(value || undefined);
    }
  }, 200);
  const handleSearchChange = ({ target: { value = '' } = {} }) => {
    setValue(value);
    onSearchChange(value);
  };

  return (
    <InputGroup>
      <Form.Control
        variant="normal"
        type="text"
        placeholder={searchPlaceholder}
        value={value}
        onChange={handleSearchChange}
      />
      <div className="icon-container">
        <Search />
      </div>
    </InputGroup>
  );
};

const Table = ({
  className,
  columns,
  data,
  title,
  subTitle,
  search,
  // paginate,
  searchPlaceholder = 'Search',
  searchButtonText = 'Search',
  searchLeftComponent,
  searchRightComponent,
  onSearch,
  showHeader = true,
  showSearch = true,
  variant = 'default',
  highlightOnHover,
  manualPagination = false,
  renderFilters = () => null,
  totalCount,
  pageSize,
  currentPage,
  onPageIndexChange = () => null,
}) => {
  const tableOptions = {
    columns,
    data,
    manualPagination,
  };
  if (manualPagination && totalCount && pageSize) {
    tableOptions.pageCount = Math.ceil(totalCount / pageSize);
    tableOptions.initialState = { pageIndex: currentPage };
  }
  const { t } = useTranslation();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    // pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { globalFilter, pageIndex },
  } = useTable(tableOptions, useGlobalFilter, useSortBy, usePagination);

  useEffect(() => {
    onPageIndexChange(pageIndex);
  }, [pageIndex]);

  const totalPages = pageOptions.length;
  let startPage, endPage;
  if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 0;
    endPage = totalPages;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (pageIndex <= 6) {
      startPage = 0;
      endPage = 9;
    } else if (pageIndex + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = pageIndex - 5;
      endPage = pageIndex + 4;
    }
  }

  const tableWrapperClasses = {
    [bem.m('highlight')]: highlightOnHover,
  };

  return (
    <div className={cx(bem.b(), bem.m(variant), className, tableWrapperClasses)}>
      {title ? <div className={bem.e('header')}>{title}</div> : null}
      {showSearch ? (
        <div className={cx(bem.e('header-wrapper'), 'd-flex justify-content-between align-items-center mb-30')}>
          {searchLeftComponent && searchLeftComponent}
          <FilterSearchInput
            searchPlaceholder={searchPlaceholder}
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            onSearch={onSearch}
            manualPagination={manualPagination}
          />
          {searchRightComponent ? (
            searchRightComponent
          ) : (
            <Button variant="info" className="btn-rounded ml-16 text-nowrap" onClick={onSearch}>
              {searchButtonText}
            </Button>
          )}
        </div>
      ) : null}
      <div className={bem.e('table-wrapper')}>
        {subTitle ? <div className={bem.e('sub-header')}>{subTitle}</div> : null}
        {renderFilters()}
        <RBTable bordered={false} {...getTableProps()}>
          {showHeader ? (
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
          ) : null}
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
      </div>
      {!manualPagination || (manualPagination && totalCount) ? (
        <div className="pagination float-end">
          <div className={cx('pagination-prev', { disabled: !canPreviousPage })} onClick={() => previousPage()}>
            <LeftChevron variant={canPreviousPage ? 'dim' : 'light'} />
          </div>
          {Array.from({ length: endPage - startPage }).map((_, index) => {
            const currentPageIndex = startPage + index;
            return (
              <div
                key={`page-${currentPageIndex}`}
                className={cx('pagination-page', { active: currentPageIndex === pageIndex })}
                onClick={() => gotoPage(currentPageIndex)}>
                {currentPageIndex + 1}
              </div>
            );
          })}
          <div className={cx('pagination-next', { disabled: !canNextPage })} onClick={() => nextPage()}>
            <RightChevron variant={canNextPage ? 'dim' : 'light'} />
          </div>
        </div>
      ) : (
        <div className="empty-data flex-center">{t('common.noData')}</div>
      )}
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
      {actions.map(({ icon, type, variant, title, callback, classes }) => {
        const Icon = icon || actionIcons[type];
        if (!Icon && !title) return null;
        return Icon ? (
          <div key={`${id}-${type}`} className="icon-box" onClick={() => callback(row.original)}>
            <Icon variant={variant || (type === 'trash' && 'danger')} />
          </div>
        ) : (
          <button key={`${id}-${type}`} className={classes} onClick={() => callback(row.original)}>
            {title}
          </button>
        );
      })}
    </div>
  );
};

Table.Card = ({ cell }) => {
  const { column: { renderChild } = {}, row } = cell;
  const { original: item } = row;
  return (
    <div className="sdp-card-wrapped d-flex p-16 justify-content-between border-top-gray-stroke" key={item.id}>
      {renderChild && renderChild(item)}
    </div>
  );
};

export default Table;
