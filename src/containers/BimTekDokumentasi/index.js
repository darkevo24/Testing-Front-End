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
import { getBimtekAllDokumentasi, bimtekAllDokumentasi } from './reducer';
import bn from 'utils/bemNames';
import cx from 'classnames';
import moment from 'moment';

const bem = bn('bimtek-dokumentasi');

const BimTekDokumentasi = () => {
  const dispatch = useDispatch();
  const [docDetail, setDocDetail] = useState(false);
  const [params, setParams] = useState({});
  const { control, watch } = useForm({});
  const watchDate = watch('filterDate');

  const { records: dokumentasiRecords } = useSelector(bimtekAllDokumentasi);
  const { singleRecord: singleDokumentasiRecords } = useSelector(bimtekAllDokumentasi);

  useEffect(() => {
    if (watchDate !== undefined) {
      setParams((prev) => {
        const { tgl, ...other } = prev;

        if (!moment(watchDate).isValid()) {
          return other;
        }

        return { ...other, tgl: moment(watchDate).format('YYYY-MM-DD') };
      });
    }
  }, [watchDate]);

  useEffect(() => {
    dispatch(getBimtekAllDokumentasi(params));
  }, [params]);

  const [activePhoto, setActivePhoto] = useState(0);

  const openDetail = (dokumentasiId) => {
    setDocDetail(true);
    dispatch(getBimtekAllDokumentasi({ id: dokumentasiId }));
    setActivePhoto(0);
  };

  const handleImageScroll = (operation) => {
    if (operation === 'increment') {
      if (singleDokumentasiRecords?.images?.length && activePhoto + 1 < singleDokumentasiRecords.images.length) {
        setActivePhoto(activePhoto + 1);
      }
    } else {
      if (activePhoto > 0) setActivePhoto(activePhoto - 1);
    }
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
              onChange={(e) => setParams({ ...params, nama: e.target.value })}
            />
            <div className="searchNamaBimtek">
              <Search />
            </div>
          </InputGroup>
        </Col>
        <Col xs={3}>
          <DatePicker group name="filterDate" control={control} placeholder="Filter Tanggal" />
        </Col>
      </Row>
      {!dokumentasiRecords?.length ? (
        <div className="d-flex justify-content-center align-items-center h-100 flex-column">
          <NoPerminataanData />
          <div className="text-black-50 mb-2 mt-2">No Data</div>
        </div>
      ) : (
        dokumentasiRecords.map((list, dokumentasiDataiIndex) => (
          <div key={dokumentasiDataiIndex} className="mb-40">
            <div className={cx(bem.e('title'), 'fw-bold fs-18')}>{list.sectionName}</div>
            <div className={cx(bem.e('title-border'), 'mb-16')}></div>
            {!list?.sectionData?.length ? (
              <div className="d-flex justify-content-center align-items-center flex-column">
                <NoPerminataanData />
                <div className="text-black-50">No Data</div>
              </div>
            ) : (
              <div className={bem.e('list')}>
                {list.sectionData.map((dokumentasi, index) => (
                  <DokumentasiItem
                    key={index}
                    title={dokumentasi.namaBimtek}
                    urlPhoto={dokumentasi?.image?.location ?? null}
                    date={
                      dokumentasi?.tanggalMulaiDisetujui
                        ? moment(dokumentasi.tanggalMulaiDisetujui).format('DD MMMM YYYY')
                        : null
                    }
                    onClick={() => openDetail(dokumentasi.dokumentasiId)}
                  />
                ))}
              </div>
            )}
          </div>
        ))
      )}

      <Modal show={docDetail} onHide={setDocDetail} dialogClassName={bem.e('modal')}>
        {singleDokumentasiRecords?.images?.map((img, index) => (
          <Modal.Header
            key={index}
            className={bem.e('modal-header')}
            style={{ backgroundImage: `url('${img?.location ?? ''}')` }}>
            <div onClick={() => setDocDetail(false)} className={cx(bem.e('detail-close'), 'bg-white rounded-circle')}>
              <Close />
            </div>
            <div
              onClick={() => handleImageScroll('decrement')}
              className={cx(bem.e('detail-left'), 'bg-white rounded-circle')}>
              <div></div>
            </div>
            <div
              onClick={() => handleImageScroll('increment')}
              className={cx(bem.e('detail-right'), 'bg-white rounded-circle')}>
              <div></div>
            </div>
            <div className={cx(bem.e('detail-page'), 'sdp-text-black fs-16')}>
              {`Image ${activePhoto + 1}
               /
              ${img.length ?? 1}`}
            </div>
          </Modal.Header>
        ))}

        <Modal.Body>
          <div className="sdp-text-grey-dark fs-14 mb-16">
            {moment(singleDokumentasiRecords.tanggalMulaiDisetujui).format('DD MMMM YYYY')}
          </div>
          <div className="sdp-text-black-dark fs-24 fw-bold mb-16">{singleDokumentasiRecords.namaBimtek}</div>
          <div className="sdp-text-grey-dark fs-16 mb-16">{singleDokumentasiRecords.isiDokumentasi}</div>
        </Modal.Body>
      </Modal>
    </BimtekLayout>
  );
};

const DokumentasiItem = ({ urlPhoto, title, date, onClick = () => {} }) => {
  const dataUrl = `url('${urlPhoto}')`;

  return (
    <div className={cx(bem.e('list-item'), 'mr-16')} onClick={onClick}>
      <div className={bem.e('content-section')}>
        {date && <div className={cx(bem.e('content-date'), 'fs-14')}>{date}</div>}
        {urlPhoto && <div className={bem.e('content-image')} style={{ backgroundImage: dataUrl }}></div>}
      </div>
      <div className={cx(bem.e('content-title'), 'fw-600 fs-14 mt-8')}>{title}</div>
    </div>
  );
};

export default BimTekDokumentasi;
