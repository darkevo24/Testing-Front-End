import React, { useEffect, useState } from 'react';
import moment from 'moment';
import cx from 'classnames';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { ReactComponent as DropDownArrawSvg } from 'assets/drop-down-arraw.svg';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import { TOPIC_LIST } from 'utils/constants';
import { Breadcrumbs } from 'components/Breadcrumb';
import Table from 'components/Table';
import { Tags } from 'components/Tags';

const tempData = [
  {
    id: 1,
    title: 'Banjarnegara Dalam Angka BDA 2021',
    description: 'Kabupaten Banjarnegara Dalam Angka (Banjarnegara Regency in Figures) 2021',
    totalDownloads: 123,
    totalFiles: 32,
    linkTitle: 'Pemerintah Kabupaten Banjar Negara',
    date: moment().format('DD MMMM YYYY'),
    tags: ['csv', 'json', 'wms'],
  },
];

const getTextClass = (type) => {
  switch (type) {
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
const getElem = (data) => {
  const cards = [];
  data.forEach((item) => {
    cards.push({
      card: (
        <div className="sdp-card-wrapped d-flex p-16 justify-content-between border-top-gray-stroke" key={item.id}>
          <div className="flex-column">
            <div className="sdp-left-wrapper mb-27">
              <div className="mb-8 fs-16 fw-600 lh-19 sdp-text-black-dark">{item.title}</div>
              <div className="fs-14 lh-17 sdp-text-black-dark">{item.description}</div>
            </div>
            <div className="fw-600 fs-13 lh-13 sdp-text-disable">{item.totalDownloads} Downloads</div>
          </div>
          <div className="sdp-card-right-section d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center sdp-right-wrapper-top">
              <div className="fs-13 lh-16 sdp-text-grey-dark">{item.totalFiles} Files</div>
              <div className="d-flex">
                {item.tags.map((tag) => (
                  <Tags key={tag} text={tag} colorClass={getTextClass(tag)} />
                ))}
              </div>
            </div>
            <div className="sdp-right-wrapper-bottom d-flex align-items-center">
              <div className="fs-13 lh-16 sdp-text-blue-dark mr-12">{item.linkTitle}</div>
              <div className="sdp-item-file d-flex">{item.date}</div>
            </div>
          </div>
        </div>
      ),
    });
  });
  return cards;
};

const TopicDetail = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [data, setData] = useState(tempData);
  const [topic, setTopic] = useState('');
  const location = useLocation();
  const topicCards = TOPIC_LIST.find((item) => item.title === topic)?.items || [];
  const breadcrumbsList = [
    {
      path: '/home',
      label: 'Beranda',
    },
    {
      isActive: true,
      label: `Topik - ${topic}`,
    },
  ];

  useEffect(() => {
    const topic = location.state || '';
    const displayData = getElem(tempData);
    setTopic(topic);
    setSelectedTopic(topicCards[0]);
    setData(displayData);
  }, [location.pathname]); //eslint-disable-line

  const changeTopic = (title) => {
    const topicCards = TOPIC_LIST.find((item) => item.title === title)?.items || [];
    setSelectedTopic(topicCards[0]);
    setTopic(title);
    setIsExpanded(false);
  };

  const tableConfig = {
    columns: [
      {
        accessor: 'card',
        Header: 'Card',
      },
    ],
    data,
    title: '',
    search: true,
    searchPlaceholder: 'Cari di topik',
    searchButtonText: <SearchSvg />,
    onSearch: (searchText) => {
      // Todo: handle Search
    },
    showHeader: false,
  };

  return (
    <div className="sdp-topic-detail-wrapper">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <Row className="mx-200 mt-48">
        <Col xs={3}>
          <div className="d-flex" onClick={() => setIsExpanded(!isExpanded)}>
            <div
              className={cx('sdp-icon mr-10 bg-gray br-3 d-flex justify-content-center align-items-center', {
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
                className={cx('menu-item pl-16 pt-12 pb-12', {
                  'bg-gray br-4': item === selectedTopic,
                })}
                onClick={() => setSelectedTopic(item)}>
                {item}
              </div>
            ))}
          </div>
        </Col>
        <Col>
          <Table {...tableConfig} />
        </Col>
      </Row>
    </div>
  );
};

export default TopicDetail;
