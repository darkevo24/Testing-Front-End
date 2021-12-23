import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { useForm } from 'react-hook-form';
import { DatePicker } from 'components';
import { Search, NoPerminataanData, Close } from 'components/Icons';
import {
  getBimtekDokumentasiMingguIni,
  getBimtekDokumentasiMingguLalu,
  getBimtekDokumentasiBulanIni,
  getBimtekAllDokumentasi,
  bimtekDokumentasiMingguIni,
  bimtekDokumentasiMingguLalu,
  bimtekDokumentasiBulanIni,
  bimtekAllDokumentasi,
} from './reducer';
import bn from 'utils/bemNames';
import cx from 'classnames';
import moment from 'moment';

const bem = bn('bimtek-dokumentasi');

const BimTekDokumentasi = () => {
  const dispatch = useDispatch();
  const [docDetail, setDocDetail] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({});
  const [filterNamaBimtek, setFilterNamaBimtek] = useState();
  const { control, watch } = useForm({});
  const watchDate = watch('tgl');

  const { records: mingguIniRecords } = useSelector(bimtekDokumentasiMingguIni);
  const { records: mingguLaluRecords } = useSelector(bimtekDokumentasiMingguLalu);
  const { records: bulanIniRecords } = useSelector(bimtekDokumentasiBulanIni);
  const { records: dokumentasiRecords } = useSelector(bimtekAllDokumentasi);

  useEffect(() => {
    const params = {
      ...(filterNamaBimtek ? { nama: filterNamaBimtek } : {}),
      ...(watchDate ? { tgl: moment(watchDate).format('YYYY-MM-DD') } : {}),
    };
    dispatch(getBimtekDokumentasiMingguIni(params));
    dispatch(getBimtekDokumentasiMingguLalu(params));
    dispatch(getBimtekDokumentasiBulanIni(params));
    dispatch(getBimtekAllDokumentasi(params));
  }, [watchDate, filterNamaBimtek]);

  var dataDokumentasi = [
    { label: 'Minggu Ini', data: mingguIniRecords },
    { label: 'Minggu Lalu', data: mingguLaluRecords },
    { label: 'Bulan Ini', data: bulanIniRecords },
    { label: 'Dokumentasi', data: dokumentasiRecords },
  ];

  const [activePhoto, setActivePhoto] = useState(0);

  const openDetail = (list, item) => {
    setDocDetail(true);
    setSelectedDoc(dataDokumentasi[list].data[item]);
    setActivePhoto(0);
  };

  return (
    <BimtekLayout>
      <Row className="mb-12">
        <Col xs={5}>
          <InputGroup>
            <Form.Control
              variant="normal"
              type="text"
              placeholder="Cari"
              onChange={(e) => setFilterNamaBimtek(e.target.value)}
            />
            <div className="searchNamaBimtek">
              <Search />
            </div>
          </InputGroup>
        </Col>
        <Col xs={3}>
          <DatePicker name="tgl" control={control} placeholder="Filter Tanggal" />
        </Col>
      </Row>
      {dataDokumentasi.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-100 flex-column">
          <NoPerminataanData />
          <div className="text-black-50 mb-2 mt-2">No Data</div>
        </div>
      ) : null}
      {dataDokumentasi.map((list, i) => (
        <div key={i} className="mb-40">
          <div className={cx(bem.e('title'), 'fw-bold fs-18')}>{list.label}</div>
          <div className={cx(bem.e('title-border'), 'mb-16')}></div>
          {list.data.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center flex-column">
              <NoPerminataanData />
              <div className="text-black-50">No Data</div>
            </div>
          ) : (
            <div className={bem.e('list')}>
              {list.data.map((item, j) => (
                <DokumentasiItem
                  key={j}
                  title={item.namaBimtek}
                  urlPhoto={item.image.location}
                  date={moment(item.tanggalMulaiDisetujui).format('DD MMMM YYYY')}
                  onClick={() => openDetail(i, j)}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      <Modal show={docDetail} onHide={setDocDetail} dialogClassName={bem.e('modal')}>
        <Modal.Header
          className={bem.e('modal-header')}
          style={{ backgroundImage: "url('" + selectedDoc?.image?.location + "')" }}>
          <div onClick={() => setDocDetail(false)} className={cx(bem.e('detail-close'), 'bg-white rounded-circle')}>
            <Close />
          </div>
          <div
            onClick={() => {
              if (activePhoto > 0) setActivePhoto(activePhoto - 1);
            }}
            className={cx(bem.e('detail-left'), 'bg-white rounded-circle')}>
            <div></div>
          </div>
          <div
            onClick={() => {
              if (selectedDoc?.image?.length && activePhoto < selectedDoc.image.length) setActivePhoto(activePhoto + 1);
            }}
            className={cx(bem.e('detail-right'), 'bg-white rounded-circle')}>
            <div></div>
          </div>
          <div className={cx(bem.e('detail-page'), 'sdp-text-white fs-16')}>
            {activePhoto + 1 + ' / ' + (selectedDoc?.image?.length ? selectedDoc.image.length : 1)}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="sdp-text-grey-dark fs-14 mb-16">
            {moment(selectedDoc.tanggalMulaiDisetujui).format('DD MMMM YYYY')}
          </div>
          <div className="sdp-text-black-dark fs-24 fw-bold mb-16">{selectedDoc.namaBimtek}</div>
          <div className="sdp-text-grey-dark fs-16 mb-16">{selectedDoc.namaBimtek}</div>
        </Modal.Body>
      </Modal>
    </BimtekLayout>
  );
};

const DokumentasiItem = ({ urlPhoto, title, date, onClick = () => {} }) => {
  const dataUrl = "url('" + urlPhoto + "')";

  return (
    <div className={cx(bem.e('list-item'), 'mr-16')} onClick={(e) => onClick(e)}>
      <div className={bem.e('content-section')}>
        <div className={cx(bem.e('content-date'), 'fs-14')}>{date}</div>
        <div className={bem.e('content-image')} style={{ backgroundImage: dataUrl }}></div>
      </div>
      <div className={cx(bem.e('content-title'), 'fw-600 fs-14 mt-8')}>{title}</div>
    </div>
  );
};

export default BimTekDokumentasi;
