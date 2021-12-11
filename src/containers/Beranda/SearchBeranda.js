import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReactComponent as CircleSplitSvg } from 'assets/circle-split.svg';
import GroupedDropdown from 'components/DropDown/GroupedDropDown';
import { tokenSelector } from 'containers/Login/reducer';
import { TOPIC_LIST } from 'utils/constants';
import { Search } from 'components/Icons';

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
    padding: 15px;
    border: none;
    border-left: 1px solid #e1e2ea;
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
    border: 0;
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    width: 56px;
    padding: 15px;
    background: #ff0000;
    border-radius: 0px 8px 8px 0px;
  }
`;

const DropDownList = TOPIC_LIST.map((item) => ({
  label: item.title,
  options: item.items.map((listItem) => ({
    value: listItem,
    label: listItem,
  })),
}));

export const SearchBeranda = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState({ value: '', label: '' });
  const history = useHistory();
  const token = useSelector(tokenSelector);

  const isLoggedIn = !!token;

  const onChange = (data) => {
    setSelectedItem(data);
  };

  const handleSearch = () => {
    const datasetRoute = isLoggedIn ? 'dataset' : 'topic-detail';
    history.push(`/${datasetRoute}?q=${searchText}`);
  };

  return (
    <Box>
      <GroupedDropdown
        data={DropDownList}
        defaultData={selectedItem}
        onChange={onChange}
        propClass="grouped-dropdown"
        icon={<CircleSplitSvg />}
        text="Semua Data"
      />
      <InputSearch>
        <input
          name="searchText"
          value={searchText}
          placeholder="Cari Data Publik Indonesia"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="button" className="btn-search svg-20" onClick={handleSearch}>
          <Search variant="white" />
        </button>
      </InputSearch>
    </Box>
  );
};
