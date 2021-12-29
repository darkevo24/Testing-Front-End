import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LeftChevron, RightChevron } from 'components/Icons';

const StyledButton = styled.button`
  background: #ffffff;
  border: 0px;
  margin: 0px 7px;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
`;

const Pagination = ({ totalPages = 10, onChangePage }) => {
  const [pager, setPager] = useState(null);

  useEffect(() => {
    setPager(getPager(totalPages));
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
    <div className="float-end">
      <StyledButton disabled={pager?.currentPage === 1} onClick={() => setPage((pager?.currentPage || 1) - 1)}>
        <LeftChevron />
      </StyledButton>
      {(pager?.pages || []).map((page, index) => (
        <StyledButton
          key={index}
          onClick={() => setPage(page)}
          style={{
            color: (pager?.currentPage || 1) === page ? '#000000' : '#B9B9B9',
          }}>
          {page}
        </StyledButton>
      ))}
      <StyledButton
        disabled={(pager?.currentPage || 1) === (pager?.totalPages || 1)}
        onClick={() => setPage((pager?.currentPage || 1) + 1)}>
        <RightChevron />
      </StyledButton>
    </div>
  );
};

export default Pagination;
