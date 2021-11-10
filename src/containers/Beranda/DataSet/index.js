import { useEffect, useMemo, useState } from 'react';
import RBDropdown from 'react-bootstrap/Dropdown';
import RBDropdownButton from 'react-bootstrap/DropdownButton';
import cx from 'classnames';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { ReactComponent as DropDownArrawSvg } from 'assets/drop-down-arraw.svg';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import { useTranslation } from 'react-i18next';
import { makeData } from 'utils/dataConfig/data-set';
import { TOPIC_LIST } from 'utils/constants';
import { Breadcrumbs } from 'components/Breadcrumb';
import Table from 'components/Table';
import { Tags } from 'components/Tags';
import { Circle } from 'components/Icons';
import bn from 'utils/bemNames';

const bem = bn('data-set');

const DataSet = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const data = useMemo(() => makeData(200), []);
  const location = useLocation();
  const topic = location.state || '';
  const topicCards = TOPIC_LIST.find((item) => item.title === topic)?.items || [];
  const breadcrumbsList = useMemo(
    () => [
      {
        path: '/home',
        label: t('beranda.title'),
      },
      {
        isActive: true,
        label: t('beranda.dataset.title'),
      },
    ],
    [t],
  );

  const options = useMemo(() => [{ label: 'Relevansi', value: 'relevansi' }], []);

  useEffect(() => {
    setSelectedTopic(topicCards[0]);
  }, [location.pathname]); //eslint-disable-line

  const tableConfig = {
    columns: [
      {
        id: 'card',
        Header: 'Card',
        Cell: ({ cell: { row: { original: item } = {} } = {} }) => {
          return (
            <div className="sdp-card-wrapped d-flex p-16 justify-content-between" key={item.id}>
              <div className="flex-column">
                <div className="sdp-left-wrapper mb-27">
                  <div className="mb-8 fs-16 fw-600 lh-19 sdp-text-black-dark">
                    {item.title} - {item.date}
                  </div>
                  <div className="fs-14 lh-17 sdp-text-black-dark">{item.description}</div>
                </div>
                <div className="d-flex">
                  {item.tags.map((tag) => (
                    <Tags key={tag} text={tag} />
                  ))}
                </div>
              </div>
              <div className="sdp-card-right-section d-flex flex-column justify-content-between">
                <div className="sdp-right-wrapper-bottom d-flex align-items-center">
                  <div className="fs-13 lh-16 sdp-text-blue-dark mr-12">{item.linkTitle}</div>
                </div>
              </div>
            </div>
          );
        },
      },
    ],
    data,
    searchPlaceholder: t('beranda.dataset.searchPlaceholder'),
    searchButtonText: <SearchSvg />,
    onSearch: (searchText) => {
      // Todo: handle Search
    },
    showHeader: false,
    searchLeftComponent: (
      <div className="d-flex align-items-center justify-content-center fs-20 fw-bold">
        <Circle />
        <div className="ml-12 sdp-text-black-dark">31.771</div>
        <div className="text-nowrap mr-80 ml-6 sdp-text-disable">Datasets Found</div>
      </div>
    ),
    searchRightComponent: (
      <RBDropdownButton title={selectedOption?.label || 'Select'} varient="secondary" className="wpx-180 ml-10">
        {options.map((option, index) => (
          <RBDropdown.Item
            key={`${index}-${option.value}`}
            onClick={() => setSelectedOption(option)}
            active={selectedOption?.value === option.value}>
            {option.label}
          </RBDropdown.Item>
        ))}
      </RBDropdownButton>
    ),
    highlightOnHover: true,
  };

  return (
    <div className={cx('sdp-topic-detail-wrapper', bem.b())}>
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
          <Table className={bem.e('table')} {...tableConfig} />
        </Col>
      </Row>
    </div>
  );
};

export default DataSet;
