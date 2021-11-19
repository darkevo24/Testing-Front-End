import React, { useEffect, useMemo, useState, useRef } from 'react';
import moment from 'moment';
import cx from 'classnames';
import RBDropdown from 'react-bootstrap/Dropdown';
import RBDropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import { ReactComponent as DropDownArrawSvg } from 'assets/drop-down-arraw.svg';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import { TOPIC_LIST } from 'utils/constants';
import { Breadcrumbs } from 'components/Breadcrumb';
import Table from 'components/Table';
import { Tags } from 'components/Tags';
import { Loader } from 'components';
import { parseQueryString } from 'utils/helper';
import { datasetSelector, getDataSet } from '../reducer';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import { Search } from 'components/Icons';
import { useOnClickOutside } from 'utils/hooks';
import { instansiFilterData } from 'utils/dataConfig/dafter';

const getTextClass = (type) => {
  switch (type.toLowerCase()) {
    case 'csv':
      return 'sdp-text-green';
    case 'json':
      return 'sdp-text-grey-dark';
    case 'wms':
      return 'sdp-text-blue-light';
    default:
      return 'sdp-text-disable';
  }
};

const TopicDetail = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [filterData, setFilterData] = useState([...instansiFilterData]);
  const [orginazation, setOrginazation] = useState('');
  const [showInstansiFilter, setShowInstansiFilter] = useState(false);
  const [instansiFilterItem, setInstansiFilterItem] = useState([]);
  const { pageSize, loading, params, searchFacets, result } = useSelector(datasetSelector);
  const [topic, setTopic] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ref = useRef();

  useOnClickOutside(ref, () => closeFilterModal);

  const options = useMemo(
    () => [
      // { label: t('fields.relevansi.label'), value: 'relevansi' },
      { label: t('common.nameAtoZ'), value: 'title asc' },
      { label: t('common.nameZtoA'), value: 'title desc' },
      { label: t('common.lastModified'), value: 'metadata_modified desc' },
    ],
    [],
  );

  const onSortChange = (option) => () => {
    setSelectedOption(option);
    fetchDataset({ sort: option.value }, true);
  };
  const topicCards = TOPIC_LIST.find((item) => item.title === topic)?.items || [];
  const breadcrumbsList = [
    {
      path: '/home',
      label: t('beranda.title'),
    },
    {
      isActive: true,
      label: `Topik - ${topic}`,
    },
  ];

  const generateSlug = (groupName = '') => groupName.replace(/ /g, '-').toLowerCase();

  const fetchDataset = (override, reset = false) => {
    const filterParams = {
      q: searchText,
      ...cloneDeep(params),
      ...cloneDeep(override),
    };
    if (reset) {
      filterParams.start = 0;
      filterParams.currentPage = 0;
    }
    filterParams.resetFilter = true;
    return dispatch(getDataSet(filterParams, true));
  };

  const changeTopic = (title) => {
    const newTopicCards = TOPIC_LIST.find((item) => item.title === title)?.items || [];
    setSelectedGroup(newTopicCards[0]);
    setTopic(title);
    setIsExpanded(false);
  };

  useEffect(() => {
    const newTopic = location.state || get(TOPIC_LIST, '0.title');
    const newTopicCards = TOPIC_LIST.find((item) => item.title === newTopic)?.items || [];
    setTopic(newTopic);
    setSelectedGroup(newTopicCards[0]);
    const params = parseQueryString();
    if (params.q) {
      setSearchText(params.q);
    }
  }, [location.state]); //eslint-disable-line

  useEffect(() => {
    const id = generateSlug(selectedGroup);
    if (id) {
      fetchDataset({ groups: [{ id }] }, true);
    }
  }, [selectedGroup]);

  const data = useMemo(() => result?.results || [], [result]);

  const handleInstansiFilter = (data = null) => {
    if (!data) return;
    const instansiFilterItem_clone = [...instansiFilterItem];
    const filterData_clone = [...filterData];
    instansiFilterItem_clone.push(data);
    const index = filterData_clone.findIndex((item) => item.value === data.value);
    if (index !== -1) {
      filterData_clone.splice(index, 1);
    }
    setInstansiFilterItem(instansiFilterItem_clone);
    setFilterData(filterData_clone);
  };

  const removeInstansiFilter = (item) => {
    const instansiFilterItem_clone = [...instansiFilterItem];
    const filterData_clone = [...filterData];
    const index = instansiFilterItem_clone.findIndex((fItem) => fItem.value === item.value);
    instansiFilterItem_clone.splice(index, 1);
    filterData_clone.push(item);
    setFilterData(filterData_clone);
    setInstansiFilterItem(instansiFilterItem_clone);
  };

  const closeFilterModal = () => {
    setInstansiFilterItem([]);
    setShowInstansiFilter(false);
  };

  const tableConfig = {
    columns: [
      {
        id: 'card',
        Header: 'Card',
        Cell: ({ cell: { row: { original: item } = {} } = {} }) => {
          const numberOfMaxFormats = 3;
          const uniqFormats =
            uniqBy(
              item.resources.filter((r) => !!r.format),
              'format',
            ) || [];
          const formatesToShow = uniqFormats.slice(0, numberOfMaxFormats);
          const hiddenFormats = uniqFormats.length - formatesToShow.length;
          return (
            <div className="row sdp-card-wrapped d-flex py-8 justify-content-between" key={item.id}>
              <div className="col-8 flex-column">
                <div className="sdp-left-wrapper mb-27">
                  <div className="mb-8 fs-16 fw-600 lh-19 sdp-text-black-dark">{item.title}</div>
                  <div className="fs-14 lh-17 sdp-text-black-dark">{item.notes}</div>
                </div>
                <div className="fw-600 fs-13 lh-13 text-nowrap sdp-text-disable">{item.totalDownloads || 0} Downloads</div>
              </div>
              <div className="col-4 sdp-card-right-section d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center sdp-right-wrapper-top">
                  <div className="fs-13 lh-16 text-nowrap sdp-text-grey-dark">{item.num_resources || 0} Files</div>
                  <div className="d-flex">
                    {formatesToShow?.map((tag) => (
                      <Tags
                        key={`${item.id}-${tag.id}`}
                        className="px-12 text-nowrap"
                        text={tag.format}
                        colorClass={getTextClass(tag.format)}
                      />
                    ))}
                    {!!hiddenFormats && <Tags className="px-12 text-nowrap" text={`${hiddenFormats} others`} />}
                  </div>
                </div>
                <div className="sdp-right-wrapper-bottom d-flex align-items-center">
                  <div className="fs-13 lh-16 sdp-text-blue-dark mr-12">{item.organization?.title}</div>
                  <div className="sdp-item-file d-flex">
                    {moment(new Date(item.metadata_modified)).format('DD MMMM YYYY')}
                  </div>
                </div>
              </div>
            </div>
          );
        },
      },
    ],
    data,
    title: '',
    search: true,
    searchPlaceholder: t('beranda.topic.searchPlaceholder'),
    searchButtonText: <SearchSvg />,
    highlightSearchInput: true,
    searchRightComponent: (
      <>
        <div className="d-flex align-items-center sdp-right-wrapper">
          <RBDropdownButton title={selectedOption?.label || 'Select'} varient="secondary" className="wpx-180 ml-10">
            {options.map((option, index) => (
              <RBDropdown.Item
                key={`${index}-${option.value}`}
                onClick={onSortChange(option)}
                active={selectedOption?.value === option.value}>
                {option.label}
              </RBDropdown.Item>
            ))}
          </RBDropdownButton>
          <Button
            className="sdp-instansi-button border-gray-stroke br-4 bg-white ml-10"
            variant="light"
            onClick={() => setShowInstansiFilter(true)}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="12" height="12" rx="2" fill="#FF0000" />
            </svg>
            {t('beranda.topic.searchInstansi')}
          </Button>
        </div>

        {showInstansiFilter && (
          <div ref={ref} className="sdp-instansi-filter border-gray-stroke">
            <div className="sdp-instansi-filter-header d-flex">
              <SingleSelectDropdown
                data={filterData}
                placeHolder="Cari Instansi"
                isLoading={false}
                noValue={true}
                onChange={handleInstansiFilter}
                defaultIcon={<Search props="red" />}
                defaultOptionIcon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#E1E2EA" />
                  </svg>
                }
              />
              <Button
                className="sdp-instansi-button border-gray-stroke br-4 bg-white ml-10"
                variant="light"
                onClick={() => setShowInstansiFilter(true)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="12" height="12" rx="2" fill="currentColor" />
                </svg>
                {t('beranda.topic.searchInstansi')}
              </Button>
            </div>
            <div className="sdp-instansi-filter-tags">
              {!instansiFilterItem?.length ? (
                <span className="sdp-text-disable">Filter berdasarkan Instansi Pemerintah</span>
              ) : (
                <div className="sdp-instansi-filter-tags-wrapper d-flex flex-wrap">
                  {instansiFilterItem.map((item) => (
                    <Badge
                      pill
                      className="sdp-instansi-filter-tags-item border-gray-stroke d-flex align-items-center br-40 px-16 py-9 bg-white m-10"
                      bg="light"
                      text="dark">
                      {item.icon && <img src={item.icon} alt={item.label} width="20px" height="20px" />}
                      <span className="fs-13 lh-15 fw-normal">{item.label}</span>
                      <i className="ml-16" onClick={() => removeInstansiFilter(item)}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M7.75637 1.37206L5.12843 4L7.75637 6.62794C7.83259 6.70156 7.89338 6.78962 7.93521 6.88698C7.97703 6.98434 7.99905 7.08906 7.99997 7.19503C8.00089 7.30099 7.9807 7.40607 7.94057 7.50415C7.90045 7.60223 7.84119 7.69133 7.76626 7.76626C7.69133 7.84119 7.60223 7.90045 7.50415 7.94057C7.40607 7.9807 7.30099 8.00089 7.19503 7.99997C7.08906 7.99905 6.98434 7.97703 6.88698 7.93521C6.78962 7.89338 6.70156 7.83259 6.62794 7.75637L4 5.12843L1.37206 7.75637C1.29844 7.83259 1.21038 7.89338 1.11302 7.93521C1.01565 7.97703 0.910936 7.99905 0.804973 7.99997C0.69901 8.00089 0.593925 7.9807 0.495849 7.94057C0.397773 7.90045 0.30867 7.84119 0.23374 7.76626C0.15881 7.69133 0.0995531 7.60223 0.059427 7.50415C0.0193009 7.40607 -0.000890658 7.30099 3.01316e-05 7.19503C0.000950922 7.08906 0.0229658 6.98434 0.0647903 6.88698C0.106615 6.78962 0.167411 6.70156 0.243632 6.62794L2.87157 4L0.243632 1.37206C0.167411 1.29844 0.106615 1.21038 0.0647903 1.11302C0.0229658 1.01565 0.000950922 0.910936 3.01316e-05 0.804973C-0.000890658 0.69901 0.0193009 0.593925 0.059427 0.495849C0.0995531 0.397773 0.15881 0.30867 0.23374 0.23374C0.30867 0.15881 0.397773 0.0995531 0.495849 0.059427C0.593925 0.0193009 0.69901 -0.000890658 0.804973 3.01316e-05C0.910936 0.000950922 1.01565 0.0229658 1.11302 0.0647903C1.21038 0.106615 1.29844 0.167411 1.37206 0.243632L4 2.87157L6.62794 0.243632C6.70156 0.167411 6.78962 0.106615 6.88698 0.0647903C6.98434 0.0229658 7.08906 0.000950922 7.19503 3.01316e-05C7.30099 -0.000890658 7.40607 0.0193009 7.50415 0.059427C7.60223 0.0995531 7.69133 0.15881 7.76626 0.23374C7.84119 0.30867 7.90045 0.397773 7.94057 0.495849C7.9807 0.593925 8.00089 0.69901 7.99997 0.804973C7.99905 0.910936 7.97703 1.01565 7.93521 1.11302C7.89338 1.21038 7.83259 1.29844 7.75637 1.37206Z"
                            fill="#2D2627"
                          />
                        </svg>
                      </i>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {!instansiFilterItem?.length ? null : (
              <div className="sdp-instansi-filter-footer d-flex justify-content-end border-top-gray-stroke pt-10">
                <Button
                  className="sdp-instansi-button border-gray-stroke br-34 bg-white mr-8 py-9 px-30"
                  variant="light"
                  onClick={closeFilterModal}>
                  Clear
                </Button>
                <Button
                  className="sdp-instansi-button border-gray-stroke br-34 py-9 px-30"
                  variant="primary"
                  onClick={closeFilterModal}>
                  Apply
                </Button>
              </div>
            )}
          </div>
        )}
      </>
    ),
    onSearch: (searchText) => {
      fetchDataset({ q: searchText }, true);
    },
    showHeader: false,
    highlightOnHover: true,
    totalCount: result?.count || null,
    pageSize,
    currentPage: params.currentPage,
    manualPagination: true,
    onPageIndexChange: (currentPage) => {
      const start = currentPage * pageSize;
      if (params.start !== start) {
        const params = {
          start,
          currentPage,
        };
        fetchDataset(params);
      }
    },
  };

  return (
    <div className="sdp-topic-detail-wrapper">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <Row className="mx-200 mt-48">
        <Col xs={3}>
          <div className="d-flex" onClick={() => setIsExpanded(!isExpanded)}>
            <div
              className={cx('sdp-icon mr-10 bg-gray br-3 cursor-pointer flex-center', {
                'sdp-icon-rotate': !isExpanded,
              })}>
              <DropDownArrawSvg />
            </div>
            <div className="sdp-title">{topic}</div>
          </div>
          {isExpanded ? (
            <div className="sdp-topic-title-list border-gray-stroke br-4 py-8 mt-10">
              {TOPIC_LIST.map((topic) => (
                <div key={`hover-${topic.title}`} className="sdp-topic-wrapper" onClick={() => changeTopic(topic.title)}>
                  {topic.icon}
                  <span>{topic.title}</span>
                </div>
              ))}
            </div>
          ) : null}
          <div className="sdp-item-wrapper mt-32 mb-32 pr-32">
            {topicCards.map((item) => (
              <div
                key={`topic-card-${item}`}
                className={cx('menu-item pl-16 pt-12 pb-12 cursor-pointer', {
                  'bg-gray br-4': item === selectedGroup,
                })}
                onClick={() => setSelectedGroup(item)}>
                {item}
              </div>
            ))}
          </div>
        </Col>
        <Col>
          <Table {...tableConfig} />
        </Col>
      </Row>
      {loading && <Loader fullscreen />}
    </div>
  );
};

export default TopicDetail;
