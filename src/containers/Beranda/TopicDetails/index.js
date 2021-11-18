import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import cx from 'classnames';
import RBDropdown from 'react-bootstrap/Dropdown';
import RBDropdownButton from 'react-bootstrap/DropdownButton';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cloneDeep from 'lodash/cloneDeep';
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
  const [orginazation, setOrginazation] = useState('');
  const { pageSize, loading, params, searchFacets, result } = useSelector(datasetSelector);
  const [topic, setTopic] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    const newTopic = location.state || '';
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
                <div className="sdp-topic-wrapper" onClick={() => changeTopic(topic.title)}>
                  {topic.icon}
                  <span>{topic.title}</span>
                </div>
              ))}
            </div>
          ) : null}
          <div className="sdp-item-wrapper mt-32 mb-32 pr-32">
            {topicCards.map((item) => (
              <div
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
