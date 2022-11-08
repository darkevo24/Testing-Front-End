import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Table from 'components/Table';
import { icons, MailSvg } from 'components/Icons';
import sortBy from 'lodash/sortBy';
import { Kontak_list } from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { komunitasAhliDatasetSelector, getKomunitasAhliData } from './reducer';
import { useOnClickOutside } from 'utils/hooks';
import AvtarWithTextCardLoader from 'components/Loader/AvtarWithTextCardLoader';
import { getInstansiData, instansiDataSelector } from '../App/reducer';
import debounce from 'lodash/debounce';
import { apiUrls, get } from 'utils/request';
import { Input } from 'components';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import SingleSelectDropDown from 'components/DropDown/SingleSelectDropDown';
import Spinner from 'react-bootstrap/Spinner';
import bn from 'utils/bemNames';

const KomunitasAhliPage = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [bidangKeahlianData, setBidangKeahlianData] = useState([]);
  const [daerahData, setDaerahData] = useState([]);
  const [searchAutoFocus, setSearchAutoFocus] = useState(false);
  const ref = useRef();
  const instansiData = useSelector(instansiDataSelector);
  const bem = bn('dataset');

  const { payload, size, loading, page, records, totalRecords } = useSelector(komunitasAhliDatasetSelector);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      daerahId: payload?.daerahId || null,
      instansiId: payload?.instansiId || null,
      bidangKeahlian: payload?.bidangKeahlian || null,
      nama: payload?.nama || '',
    },
  });

  useEffect(() => {
    if (!instansiData?.result?.length) dispatch(getInstansiData());
    getBidangData();
    getDaerahData();
  }, []);

  const debounceSearch = useRef(
    debounce((searchTerm = 'a') => {
      getDaerahData(searchTerm.trim());
    }, 300),
  );

  const getBidangData = async () => {
    try {
      const { data: { content: cData = [] } = {} } = await get(apiUrls.bidangData);
      setBidangKeahlianData(cData?.length ? cData : []);
    } catch (e) {}
  };

  const getDaerahData = async (q = 'a') => {
    try {
      const { data: { content: dData = [] } = {} } = await get(apiUrls.daerahData, { query: { q } });
      setDaerahData(dData?.length ? dData : []);
    } catch (e) {}
  };

  useEffect(() => {
    handleAPICall({
      page: 0,
      payload: {
        q: '',
      },
    });
  }, []);

  const handleAPICall = (params) => {
    dispatch(getKomunitasAhliData(params));
  };

  const handleSearch = (value = '') => {
    handleAPICall({
      page: 0,
      payload: {
        ...payload,
        q: value,
      },
    });

    if (value) {
      setSearchAutoFocus(true);
    }
  };

  const handleFilterChange = (data) => {
    let payload_clone = {
      nama: data.nama.trim(),
      bidangKeahlian: data?.bidangKeahlian?.value || '',
      instansiId: data?.instansiId?.value || '',
      daerahId: data?.daerahId?.value || '',
    };

    handleAPICall({
      page: 0,
      payload: payload_clone,
    });
    setShowFilter(false);
  };

  const downloadCV = async (url, fileName = '', id) => {
    setLoader(id);
    await get(url, { download: true, fileName })
      .then(() => {
        setLoader(null);
      })
      .catch(() => {
        setLoader(null);
      });
  };

  const handleOutSideClick = () => {
    setShowFilter(false);
    setValue('nama', payload?.nama || '');

    if (payload?.bidangKeahlian) {
      const rec = bidangKeahlianData.find((item) => item.nama === payload.bidangKeahlian);
      setValue('bidangKeahlian', { value: rec.nama, label: rec.nama });
    } else {
      setValue('bidangKeahlian', null);
    }
    if (payload?.instansiId) {
      const rec = (instansiData?.result || []).find((item) => +item.id === payload.instansiId);
      setValue('instansiId', { value: rec.id, label: rec.nama });
    } else {
      setValue('instansiId', null);
    }
    if (payload?.daerahId) {
      const rec = daerahData.find((item) => +item.id === +payload.daerahId);
      setValue('daerahId', { value: rec.id, label: rec.nama });
    } else {
      setValue('daerahId', null);
    }
  };

  useOnClickOutside(ref, handleOutSideClick);

  const tableConfig = {
    columns: [
      {
        accessor: 'card',
        Header: 'Card',
        Cell: ({ cell: { row: { original: item } = {} } = {} }) => {
          return (
            <div key={item.id} className="d-flex br-4 border-gray-stroke">
              <div key={'img-' + item.id} className="br-12 m-16">
                <img src={item?.foto?.location} alt="" className="brp-50" height="120px" width="120px" />
              </div>
              <div key={'wrapper-' + item.id} className="sdp-info-wrapper m-16">
                <label className="sdp-title">{item?.nama}</label>
                <div className="mt-16 d-flex mb-12">
                  <div className="br-2 px-6 py-5 sdp-text-grey-dark mr-8 bg-gray">{item.bidangKeahlian}</div>
                </div>
                <p>{item.riwayat}</p>
                <div className="sdp-rating-wrapper d-flex justify-content-between">
                  <div className="d-flex">
                    {sortBy(item.kontak, ['tipe']).map((kontak_item) => {
                      const kontakDetail = Kontak_list.find((kontak) => kontak.name === kontak_item.tipe);
                      if ((!kontakDetail && kontak_item.tipe !== 'email') || !kontak_item?.value) return null;
                      if (!kontakDetail && kontak_item.tipe === 'email') {
                        return (
                          <div
                            key={kontak_item.tipe + item.id}
                            className="sdp-kontak br-5 border-gray-stroke p-10 sdp-text-grey-dark mr-8 cursor-pointer"
                            onClick={() => window.open(`mailto:${kontak_item.value}`, '_blank')}>
                            <MailSvg variant="danger" />
                          </div>
                        );
                      }
                      const Icon = icons[kontakDetail.icon];
                      return (
                        <div
                          key={kontak_item.tipe + item.id}
                          className=" sdp-kontak br-5 border-gray-stroke p-10 sdp-text-grey-dark mr-8 cursor-pointer"
                          onClick={() => window.open(`${kontakDetail.prefixText + kontak_item.value}`, '_blank')}>
                          <Icon />
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    variant="primary"
                    className="sdp-rate-button justify-content-end"
                    onClick={() =>
                      downloadCV(
                        item.cv.location ||
                          'https://drive.google.com/file/d/1YKu5bPdkXsuAb-dojIm5cy_To8FC0BRI/view?usp=sharing',
                        item.cv.fileName,
                        item.id,
                      )
                    }>
                    {loader === item.id && (
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />
                    )}
                    Lihat CV
                  </Button>
                </div>
              </div>
            </div>
          );
        },
      },
    ],
    data: records,
    subTitle: 'Komunitas Ahli',
    search: true,
    searchValue: payload.q ?? '',
    searchThreshold: 300,
    searchPlaceholder: 'Cari Ahli Berdasarkan Nama',
    searchAutoFocus: searchAutoFocus,
    searchRightComponent: (
      <>
        <Button
          className="sdp-button border-gray-stroke br-4 bg-white ml-10 text-nowrap"
          variant="light"
          onClick={() => setShowFilter(true)}>
          Advanced Search
        </Button>
        {showFilter && (
          <div ref={ref} className="sdp-filter border-gray-stroke">
            <Form noValidate onSubmit={handleSubmit(handleFilterChange)}>
              <div className="sdp-filter-header d-flex flex-column">
                <Input control={control} name="nama" className="mb-15" />
                <SingleSelectDropDown
                  key="bidangKeahlian"
                  name="bidangKeahlian"
                  control={control}
                  data={bidangKeahlianData.map((item) => ({ value: item.nama, label: item.nama }))}
                  placeholder="Bidang Keahlian"
                  className="mb-15 bg-gray"
                  isClearable={true}
                />
                <SingleSelectDropDown
                  key="daerahId"
                  name="daerahId"
                  control={control}
                  data={daerahData.map((item) => ({ label: item.nama, value: item.id }))}
                  placeholder="Daerah"
                  onInputChange={debounceSearch}
                  className="mb-15"
                  isClearable={true}
                />
                <SingleSelectDropDown
                  key="instansiId"
                  name="instansiId"
                  control={control}
                  data={(instansiData?.result || []).map((item) => ({ value: item.id, label: item.nama }))}
                  placeholder="Instansi / Lembaga"
                  isLoading={instansiData?.loading}
                  className="mb-15"
                  isClearable={true}
                />
              </div>

              <div className="sdp-filter-footer d-flex justify-content-end border-top-gray-stroke pt-10">
                <Button type="submit" className="sdp-button border-gray-stroke br-34 py-9 px-30" variant="primary">
                  Cari
                </Button>
              </div>
            </Form>
          </div>
        )}
      </>
    ),
    onSearch: (searchText) => handleSearch(searchText),
    totalCount: totalRecords || null,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        handleAPICall({});
      }
    },
    showHeader: false,
  };

  return (
    <div className="sdp-komunitas-wrapper">
      <Row className="mt-48 justify-content-md-center mx-16">
        <Col lg="6">
          {loading ? (
            <>
              <label className="sdp-heading mb-10">Komunitas Ahli</label>
              <div className="d-flex br-4 border-gray-stroke p-10">
                <AvtarWithTextCardLoader />
              </div>
            </>
          ) : (
            <Table className={bem.e('table')} {...tableConfig} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default KomunitasAhliPage;
