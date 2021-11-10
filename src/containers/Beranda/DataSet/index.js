import { useMemo, useState } from 'react';
import RBDropdown from 'react-bootstrap/Dropdown';
import RBDropdownButton from 'react-bootstrap/DropdownButton';
import cx from 'classnames';
import { Row, Col } from 'react-bootstrap';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import { useTranslation } from 'react-i18next';
import { makeData } from 'utils/dataConfig/data-set';
import { Breadcrumb, SectionList, Table, Tags } from 'components';
import { Circle } from 'components/Icons';
import bn from 'utils/bemNames';

const bem = bn('data-set');

const DataSet = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);
  const data = useMemo(() => makeData(200), []);

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

  const sectionsData = useMemo(
    () => [
      {
        filter: 'group',
        title: 'Group',
        showMoreText: t('beranda.dataset.groupShowMore'),
        searchPlaceholder: t('beranda.dataset.groupSearchPlaceholder'),
        options: [
          { text: 'Industri', count: 166 },
          { text: 'Kependudukan', count: 148 },
          { text: 'Hukum', count: 156 },
          { text: 'Kesehatan', count: 174 },
          { text: 'Sosial', count: 166 },
          { text: 'Dalam Negeri', count: 87 },
          { text: 'Usaha Kecil Menengah', count: 47 },
          { text: 'Koperasi', count: 141 },
          { text: 'Keuangan', count: 141 },
          { text: 'Pariwisata', count: 141 },
          { text: '2Industri', count: 266 },
          { text: '2Kependudukan', count: 248 },
          { text: '2Hukum', count: 256 },
          { text: '2Kesehatan', count: 274 },
          { text: '2Sosial', count: 266 },
          { text: '2Dalam Negeri', count: 287 },
          { text: '2Usaha Kecil Menengah', count: 247 },
          { text: '2Koperasi', count: 241 },
          { text: '2Keuangan', count: 241 },
          { text: '2Pariwisata', count: 241 },
        ],
      },
      {
        filter: 'instansi',
        title: t('beranda.dataset.instansiTitle'),
        showMoreText: t('beranda.dataset.instansiShowMore'),
        searchPlaceholder: t('beranda.dataset.instansiSearchPlaceholder'),
        options: [
          { text: 'Industri', count: 166 },
          { text: 'Kependudukan', count: 148 },
          { text: 'Hukum', count: 156 },
          { text: 'Kesehatan', count: 174 },
          { text: 'Sosial', count: 166 },
          { text: 'Dalam Negeri', count: 87 },
          { text: 'Usaha Kecil Menengah', count: 47 },
          { text: 'Koperasi', count: 141 },
          { text: 'Keuangan', count: 141 },
          { text: 'Pariwisata', count: 141 },
          { text: '2Industri', count: 266 },
          { text: '2Kependudukan', count: 248 },
          { text: '2Hukum', count: 256 },
          { text: '2Kesehatan', count: 274 },
          { text: '2Sosial', count: 266 },
          { text: '2Dalam Negeri', count: 287 },
          { text: '2Usaha Kecil Menengah', count: 247 },
          { text: '2Koperasi', count: 241 },
          { text: '2Keuangan', count: 241 },
          { text: '2Pariwisata', count: 241 },
        ],
      },
    ],
    [t],
  );

  const handleOptionSelect = (filter) => (option) => {
    // TODO: handle the selected filters
  };

  const options = useMemo(() => [{ label: 'Relevansi', value: 'relevansi' }], []);

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
      <Breadcrumb breadcrumbsList={breadcrumbsList} />
      <Row className="mx-200 mt-48">
        <Col xs={3}>
          {sectionsData.map((sectionItem) => {
            return (
              <SectionList
                {...sectionItem}
                className="mt-8"
                search
                onSelectOption={handleOptionSelect(sectionItem.filter)}
              />
            );
          })}
        </Col>
        <Col>
          <Table className={bem.e('table')} {...tableConfig} />
        </Col>
      </Row>
    </div>
  );
};

export default DataSet;
