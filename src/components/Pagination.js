import React, { useState, useEffect } from 'react';
import { LeftChevron, RightChevron } from 'components/Icons';
import bn from 'utils/bemNames';

const bem = bn('bimtek-pagination');
const Pagination = ({ totalPages = 10, onChangePage, currentPage = 1 }) => {
  const [pager, setPager] = useState(null);

  useEffect(() => {
    setPager(getPager(totalPages, currentPage));
  }, [totalPages]);

  const setPage = (page) => {
    setPager(getPager(totalPages, page));
    onChangePage({
      page,
    });
  };

  const getPager = (totalItems, currentPage = 1) => {
    const pages = [...Array(totalItems).keys()].map((i) => i + 1);

    return {
      currentPage,
      totalPages,
      pages,
    };
  };

  return (
    <div className="bimtek-pagination float-end">
      <button
        className={bem.e('bimtek-pagination-buttons')}
        disabled={pager?.currentPage === 1}
        onClick={() => setPage((pager?.currentPage || 1) - 1)}>
        <LeftChevron />
      </button>
      {(pager?.pages || []).map((page, index) => (
        <button
          key={index}
          onClick={() => setPage(page)}
          className={bem.e((pager?.currentPage || 1) === page ? 'bimtek-active-page' : 'bimtek-inactive-page')}>
          {page}
        </button>
      ))}
      <button
        className={bem.e('bimtek-pagination-buttons')}
        disabled={(pager?.currentPage || 1) === (pager?.totalPages || 1)}
        onClick={() => setPage((pager?.currentPage || 1) + 1)}>
        <RightChevron />
      </button>
    </div>
  );
};

export default Pagination;
