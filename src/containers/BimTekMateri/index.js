import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { useForm } from 'react-hook-form';
import { DatePicker, Dropdown } from 'components';
import { ReactComponent as LocationTag } from 'assets/location-tag.svg';
import { ReactComponent as DownloadIcon } from 'assets/download-red.svg';
import { NoPerminataanData } from 'components/Icons';
import { getBimtekMateri, bimtekMateri } from './reducer';
import moment from 'moment';
import { apiUrls, get } from 'utils/request';
import Pagination from 'components/Pagination';

const paginateParams = {
  page: 1,
  size: 10,
};

const BimtekMateri = () => {
  const dispatch = useDispatch();
  const { records: materiRecords, allRecords: allMateriRecords, totalPages: pageNumber } = useSelector(bimtekMateri);
  const { control, watch } = useForm({});
  const watchDate = watch('tgl');
  const watchNamaBimtek = watch('namaBimtek');

  useEffect(() => {
    const params = {
      ...paginateParams,
      ...(watchNamaBimtek?.value ? { namaBimtek: watchNamaBimtek.value } : {}),
      ...(watchDate ? { tgl: moment(watchDate).format('YYYY-MM-DD') } : {}),
    };

    dispatch(getBimtekMateri(params));
  }, [watchDate, watchNamaBimtek]);

  const changePage = (props) => {
    dispatch(getBimtekMateri({ ...paginateParams, page: props.page }));
  };

  return (
    <BimtekLayout className="sdp-bimtek-materi">
      <Row className="mb-12">
        <Col xs={4}>
          <Dropdown
            name="namaBimtek"
            control={control}
            options={allMateriRecords.map((lvl) => ({
              value: lvl.namaBimtek,
              label: lvl.namaBimtek,
            }))}
            placeholder="Nama Bimtek"
          />
        </Col>
        <Col xs={4}>
          <DatePicker name="tgl" control={control} placeholder="Filter Tanggal" />
        </Col>
      </Row>
      {materiRecords.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-100 flex-column">
          <NoPerminataanData />
          <div className="text-black-50 mb-2 mt-2">No Data</div>
        </div>
      ) : null}
      {materiRecords.map((item, key) => (
        <MateriItem
          key={key}
          namaFile={item.materi.nama}
          namaBimtek={item.namaBimtek}
          tanggal={moment(item.tanggalMulaiDisetujui).format('YYYY-MM-DD')}
          lokasi={item.kota}
          urlFile={item.materi.fileName}
        />
      ))}
      {materiRecords?.length && <Pagination totalPages={pageNumber} onChangePage={changePage} />}
    </BimtekLayout>
  );
};

const MateriItem = ({ namaFile, namaBimtek, tanggal, lokasi, urlFile }) => {
  const downloadMateri = async (id) => {
    try {
      await get(`${apiUrls.bimtekMateriTerdekatDownload}/${id}`);
    } catch (e) {}
  };

  return (
    <Row className="mb-2 ml-0 sdp-bimtek-materi__item">
      <Col sm={9}>
        <div className="fw-bold fs-16 mb-3">{namaFile}</div>
        <div className="mb-12">{namaBimtek}</div>
        <div>
          <span className="mr-40 bg-gray fs-14 p-10 mb-10">{tanggal}</span>
          <span>
            <LocationTag className="mr-10" /> {lokasi}
          </span>
        </div>
      </Col>
      <Col sm={3} className="text-end">
        <Button variant="secondary" className="fs-14 p-12" onClick={() => downloadMateri(urlFile)}>
          <DownloadIcon className="mr-10" /> Download Materi
        </Button>
      </Col>
    </Row>
  );
};

export default BimtekMateri;
