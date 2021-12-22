import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import Breadcrumbs from 'components/Breadcrumb';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import { useSelector } from 'react-redux';
import { cmsForumSDIGetTagsSelector } from '../CMS/ForumSDI/reducer';

export const ForumSearch = ({ handleOnSearch, handleOnTagChange }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState({ value: '', label: '' });
  const { tagsResult, tagsLoading } = useSelector(cmsForumSDIGetTagsSelector);

  const onChange = (data) => {
    setSelectedItem(data);
  };

  const handleSearch = () => {
    handleOnSearch(searchText);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleOnSearch(searchText);
    }
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
        data={(tagsResult || []).map((tag) => ({ value: tag, label: tag }))}
        onChange={onChange}
        noValue={true}
        placeHolder="Pilih Tag"
        isLoading={tagsLoading}
        className="border-left-gray-stroke"
      />
      <div className="position-relative d-flex w-100 bg-white align-items-center">
        <input
          name="searchText"
          value={searchText}
          placeholder="Cari Topik"
          onChange={(e) => setSearchText(e.target.value)}
          className="input-search"
          onKeyPress={handleKeyPress}
        />
        <Button variant="light" className="search-button d-flex border-0 align-items-center bg-gray" onClick={handleSearch}>
          <SearchSvg variant="red" />
        </Button>
      </div>
    </div>
  );
};
