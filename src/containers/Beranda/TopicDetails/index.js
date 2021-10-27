import React, { useEffect, useState } from 'react';
import moment from 'moment';
import cx from 'classname';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { ReactComponent as DropDownArrawSvg } from 'assets/drop-down-arraw.svg';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import { TOPIC_LIST } from 'utils/constants';
import { Breadcrumbs } from 'components/Breadcrumb';
import Table from 'components/Table';

const tempData = [
  {
    id: 1,
    title: 'Banjarnegara Dalam Angka BDA 2021',
    description: 'Kabupaten Banjarnegara Dalam Angka (Banjarnegara Regency in Figures) 2021',
    totalDownloads: 123,
    totalFiles: 32,
    linkTitle: 'Pemerintah Kabupaten Banjar Negara',
    date: moment().format('DD MMMM YYYY'),
    tags: ['csv', 'jpg', 'png', 'pdf', 'wms'],
  },
];

const getElem = (data) => {
  const cards = [];
  data.forEach((item) => {
    cards.push({
      card: (
        <div className="sdp-card-wrapped d-flex p-16 justify-content-between border-top-gray-stroke" key={item.id}>
          <div className="sdp-card-left-section flex-column">
            <div className="sdp-left-wrapper mb-27">
              <div className="sdp-item-title mb-8">{item.title}</div>
              <div className="sdp-item-description">{item.description}</div>
            </div>
            <div className="sdp-item-download">{item.totalDownloads} Downloads</div>
          </div>
          <div className="sdp-card-right-section d-flex flex-column justify-content-between">
            <div className="sdp-right-wrapper-top">
              <div className="sdp-item-file">{item.totalFiles} Files</div>
            </div>
            <div className="sdp-right-wrapper-bottom d-flex">
              <div className="sdp-item-link-title mr-12">{item.linkTitle}</div>
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
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [data, setData] = useState(tempData);
  const location = useLocation();
  const topic = location.state || '';
  const topicCards = TOPIC_LIST.find((item) => item.title === topic)?.items || [];
  const breadcrumbsList = [
    {
      path: '/home',
      label: 'Beranda',
    },
    {
      isActive: true,
      label: `Topic - ${topic}`,
    },
  ];

  useEffect(() => {
    setSelectedTopic(topicCards[0]);
    const displayData = getElem(tempData);
    setData(displayData);
  }, [location.pathname]); //eslint-disable-line

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
      <Row className="ml-100 mr-100 mt-48">
        <Col xs={3}>
          <div className="d-flex" onClick={() => setIsExpanded(!isExpanded)}>
            <div
              className={cx('sdp-icon mr-10 bg-gray br-3 d-flex justify-content-center align-items-center', {
                'sdp-icon-rotate': !isExpanded,
              })}>
              <DropDownArrawSvg />
            </div>
            <div className="menu-title">{topic}</div>
          </div>
          {isExpanded ? (
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
          ) : null}
        </Col>
        <Col>
          <Table {...tableConfig} />
        </Col>
      </Row>
    </div>
  );
};

export default TopicDetail;
