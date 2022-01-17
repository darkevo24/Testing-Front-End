import { useCallback, useEffect, useMemo, useState } from 'react';
import RBDropdown from 'react-bootstrap/Dropdown';
import RBDropdownButton from 'react-bootstrap/DropdownButton';
import cx from 'classnames';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import first from 'lodash/first';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';
import moment from 'moment';

import { ReactComponent as SearchSvg } from 'assets/search.svg';
import { Breadcrumb, Loader, SectionList, Table, Tags } from 'components';
import { Circle, Close } from 'components/Icons';
import bn from 'utils/bemNames';
import { getDatasetUrl, parseQueryString } from 'utils/helper';
import DataSetMap from './DataSetMap';
import { datasetSelector, getDataSet, logHomeTrendingOrPopular } from '../reducer';

const bem = bn('dataset');

const DataSet = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const { /* error, */ pageSize, loading, params, searchFacets, result } = useSelector(datasetSelector);

  const fetchDataset = (override, reset = false) => {
    const filterParams = {
      ...cloneDeep(params),
      ...cloneDeep(override),
    };
    if (reset) {
      filterParams.start = 0;
      filterParams.currentPage = 0;
    }
    return dispatch(getDataSet(filterParams));
  };

  const data = useMemo(() => result?.results || [], [result]);

  useEffect(() => {
    const searchParam = parseQueryString();
    fetchDataset(searchParam);
  }, []);

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

  const sectionsData = useMemo(() => {
    if (!searchFacets) {
      return [];
    }
    return map(searchFacets, (val, key) => ({
      filter: key,
      title: val.title,
      showMoreText: t('beranda.dataset.filterShowMore', { filter: val.title }),
      searchPlaceholder: t('beranda.dataset.filterPlaceholder', { filter: val.title }),
      options: map(val.items, (item) => ({
        ...item,
        id: item.name,
        text: item.display_name,
      })),
      selectedOptions: params[key],
    }));
  }, [searchFacets, params]);

  const handleOptionSelect = (filter) => (option) => {
    const newFilterParams = cloneDeep(params);
    let currentFilter = newFilterParams[filter];
    if (currentFilter) {
      const findPredicate = (f) => f.id === option.id;
      const foundFilter = find(currentFilter, findPredicate);
      if (foundFilter) {
        remove(currentFilter, findPredicate);
      } else {
        currentFilter.push(option);
      }
    } else {
      currentFilter = [option];
    }
    newFilterParams[filter] = currentFilter;
    fetchDataset(newFilterParams, true);
  };

  const options = useMemo(
    () => [
      { label: t('fields.relevansi.label'), value: 'score desc' },
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

  const logToTrendingAPI = useCallback(
    (param, dispatch) => () => {
      const { name, resources, title, num_resources } = param;
      const dataSetUrl = getDatasetUrl(name);
      const fileType = resources[0].format;
      const payload = {
        title: title,
        fileType: [fileType],
        dataSetDate: moment(resources[0].created).format('YYYY-MM-DD'),
        description: resources[0].description,
        totalFile: num_resources,
        url: dataSetUrl,
      };
      dispatch(logHomeTrendingOrPopular(payload)).then((result) => {
        if (!result.error) {
          window.open(dataSetUrl, '_self');
        }
      });
    },
    [],
  );

  const onUpdateRegion = (rectangleCoordinates) => {
    const coordinates = first(rectangleCoordinates);
    const longs = uniq(map(coordinates, 'lng'));
    const lats = uniq(map(coordinates, 'lat'));
    const ext_bbox = [];
    longs.forEach((_, index) => {
      ext_bbox.push(longs[index]);
      ext_bbox.push(lats[index]);
    });
    fetchDataset({ ext_bbox }, true);
  };

  const tableConfig = {
    variant: 'card',
    columns: [
      {
        id: 'card',
        Header: 'Card',
        Cell: ({ cell: { row: { original: item } = {} } = {} }) => {
          // const dataSetUrl = getDatasetUrl(item.name);
          const numberOfMaxFormats = 4;
          const uniqFormats =
            uniqBy(
              item.resources.filter((r) => !!r.format),
              'format',
            ) || [];
          const formatesToShow = uniqFormats.slice(0, numberOfMaxFormats);
          const hiddenFormats = uniqFormats.length - formatesToShow.length;
          return (
            <div className="sdp-card-wrapped d-flex p-16 justify-content-between" key={item.id}>
              <div className="flex-column">
                <div className="sdp-left-wrapper mb-27 mr-16">
                  <button
                    title="dataset"
                    className="sdp-link border-0 bg-white p-0"
                    onClick={logToTrendingAPI(item, dispatch)}>
                    <div className="mb-8 fs-16 fw-600 lh-19">{item.title}</div>
                  </button>
                  <div className="fs-14 lh-17 sdp-text-black-dark">{item.notes}</div>
                </div>
                <div className="d-flex flex-wrap mt-n8">
                  {formatesToShow?.map((tag) => (
                    <Tags key={`${item.id}-${tag.id}`} fillColor className="mt-8 px-12" text={tag.format} />
                  ))}
                  {!!hiddenFormats && <Tags fillColor className="px-12 text-nowrap" text={`${hiddenFormats} others`} />}
                </div>
              </div>
              <div className="sdp-card-right-section d-flex flex-column justify-content-between">
                <div className="sdp-right-wrapper-bottom d-flex align-items-center">
                  <div className="fs-13 lh-16 sdp-text-blue-dark mr-12">{item.organization?.title}</div>
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
    searchValue: params?.q || '',
    onSearch: (searchText) => {
      fetchDataset({ q: searchText }, true);
    },
    highlightSearchInput: true,
    showHeader: false,
    searchLeftComponent: (
      <div className="d-flex align-items-center justify-content-center fs-20 fw-bold">
        <Circle />
        <div className="ml-12 sdp-text-black-dark">
          <NumberFormat displayType="text" thousandSeparator="." decimalSeparator="," value={result?.count} />
        </div>
        <div className="text-nowrap mr-80 ml-6 sdp-text-disable">Datasets Found {params?.q ? `for "${params.q}"` : ''}</div>
      </div>
    ),
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
    renderFilters: () => {
      const addedFilters = params['facet.field'].filter((filter) => !!params[filter] && params[filter].length);
      return (
        <div className={bem.e('filters-wrapper')}>
          {map(addedFilters, (filter, index) => {
            const filterOptions = params[filter];
            if (filterOptions) {
              return (
                <div key={`filter-${filter}`} className={bem.e('filter')}>
                  <div className={bem.e('filter-title')}>{filter}:</div>
                  <div className={cx(bem.e('filter-tags'), 'd-flex, ml-8')}>
                    {map(filterOptions, (option) => (
                      <div key={`${filter}-${option.id}`} className={bem.e('filter-tag')}>
                        {option.display_name}
                        <div
                          className="icon-box"
                          onClick={() => {
                            handleOptionSelect(filter)(option);
                          }}>
                          <Close />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
    },
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
    <div className={cx('sdp-topic-detail-wrapper', bem.b())}>
      <Breadcrumb breadcrumbsList={breadcrumbsList} />
      <Row className="mx-200 mt-48 mb-16">
        <Col xs={3}>
          <div className="sdp-heading mb-24">{t('beranda.dataset.title')}</div>
          <DataSetMap bem={bem} onUpdateRegion={onUpdateRegion} />
          {sectionsData.map((sectionItem) => {
            return (
              <SectionList
                key={`section-${sectionItem.filter}`}
                {...sectionItem}
                className="mt-8"
                search
                onSelectOption={handleOptionSelect(sectionItem.filter)}
              />
            );
          })}
        </Col>
        <Col xs={9}>
          <Table className={bem.e('table')} {...tableConfig} />
        </Col>
        {loading && <Loader fullscreen />}
      </Row>
    </div>
  );
};

export default DataSet;
