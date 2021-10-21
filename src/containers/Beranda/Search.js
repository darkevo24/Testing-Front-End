import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CircleSplitSvg } from 'assets/circle-split.svg';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import { Anchor } from 'components/Custom';
import Dropdown from 'react-bootstrap/Dropdown';

const Box = styled.div`
  background: #f2f2f2;
  border-radius: 8px;
  height: 56px;
  display: flex;
  margin-top: -30px;
`;
const InputSearch = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    height: 56px;
    border: none;
    border-left: 1px solid #e1e2ea;
    padding-left: 15px;
    &:focus {
      outline: none;
    }
    ::placeholder {
      font-size: 14px;
      line-height: 17px;
      color: #858a8f;
    }
  }
  .btn-search {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    width: 56px;
    height: 56px;
    background: #ff0000;
    border-radius: 0px 8px 8px 0px;
  }
`;

const List = ['Bimbingan Teknis', 'Analisa Data', 'Ajudikasi Data', 'Permintaan Data', 'Komunitas Ahli', 'Kanal Luar'];

export const Search = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <Box>
      <Dropdown className="dropDown">
        <Dropdown.Toggle id="dropdown-autoclose-true" variant="stroke">
          <CircleSplitSvg />
          Semua Data
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {List.map((item) => (
            <Dropdown.Item>{item}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {/*<BtnGroup>*/}
      {/*  <button className="btn btn-md dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
      {/*    <CircleSplitSvg />*/}
      {/*    Semua Data*/}
      {/*  </button>*/}
      {/*  <ul className="dropdown-menu">*/}
      {/*    {List.map((item) => (*/}
      {/*      <li>*/}
      {/*        <Anchor className="dropdown-item">{item}</Anchor>*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*</BtnGroup>*/}
      <InputSearch>
        <input
          name="searchText"
          value={searchText}
          placeholder="Cari Data Publik Indonesia"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="button" className="btn-search">
          <SearchSvg />
        </button>
      </InputSearch>
    </Box>
  );
};
