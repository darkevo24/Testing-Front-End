import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import { tokenSelector } from 'containers/Login/reducer';
import Breadcrumbs from 'components/Breadcrumb';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';

export const ForumSearch = () => {
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
    <div className="sdp-forum-search-container">
      <Breadcrumbs
        breadcrumbsList={[
          {
            path: '/home',
            label: 'Beranda',
          },
          {
            isActive: true,
            label: 'Forum',
          },
        ]}
      />
      <SingleSelectDropdown
        defaultData={selectedItem}
        data={[{ value: 'test', label: 'test' }]}
        onChange={onChange}
        placeHolder="Pilih Tag"
        className="border-left-gray-stroke"
      />
      <div className="position-relative d-flex w-100 bg-white align-items-center">
        <input
          name="searchText"
          value={searchText}
          placeholder="Cari Topik"
          onChange={(e) => setSearchText(e.target.value)}
          className="input-search"
        />
        <Button variant="light" className="search-button d-flex border-0 align-items-center bg-gray" onClick={handleSearch}>
          <SearchSvg variant="red" />
        </Button>
      </div>
    </div>
  );
};
