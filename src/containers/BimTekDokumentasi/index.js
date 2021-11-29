import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { useForm } from 'react-hook-form';
import { DatePicker } from 'components';
import { Search, NoPerminataanData, Close } from 'components/Icons';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('bimtek-dokumentasi');

const BimTekDokumentasi = () => {
  const { control } = useForm({});

  const dataDokumentasi = [
    {
      label: 'Minggu ini',
      data: [
        {
          id: 1,
          photos: [
            'https://i.picsum.photos/id/544/536/354.jpg?hmac=w5hlO2J6AMeb_LBrkxt3mI59Ss5pjTgdJImTKDonzhc',
            'https://i.picsum.photos/id/174/536/354.jpg?hmac=BfySTNvwCB_IZZueijD4RPBFgdEyPtIJRFTotFQ7Bz0',
            'https://i.picsum.photos/id/679/536/354.jpg?hmac=DjxD7ZCUdEANv_Jc2kgtDCPnxeSbfGvI_5O0bpGo7UY',
          ],
          title: 'Belajar Word',
          date: '25 November 2021',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet dolor commodo lectus tempus ullamcorper sit amet sed nulla. Donec aliquam malesuada justo, vitae sagittis sem aliquet a.',
        },
        {
          id: 2,
          photos: [
            'https://i.picsum.photos/id/132/536/354.jpg?hmac=ySCa5N4b-Q3YNUAT2pz9ffGI1Uq3pmk9el_00tooo8A',
            'https://i.picsum.photos/id/557/536/354.jpg?hmac=8K4sIO3JciaBqsEhBcIhOTSrpWJu1zCcRR4UAzoF5g4',
            'https://i.picsum.photos/id/417/536/354.jpg?hmac=Matsrj1iHedTOJ1uSvFWYRPrdtI6xSFcv9slnup-NQo',
          ],
          title: 'Perencanaan dan Program Bimbingan Teknis',
          date: '23 November 2021',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet dolor commodo lectus tempus ullamcorper sit amet sed nulla. Donec aliquam malesuada justo, vitae sagittis sem aliquet a.',
        },
        {
          id: 3,
          photos: [
            'https://i.picsum.photos/id/892/536/354.jpg?hmac=60WxlDjmsmE707hkhf2GjWSxc4kxxl4ggWFAxnQ-vd0',
            'https://i.picsum.photos/id/990/536/354.jpg?hmac=lxIb_KJ25hKUrltIoEOtgpkV73jgyl8K__1dJg28HgM',
          ],
          title: 'Bimbingan Teknis Pemrograman',
          date: '22 November 2021',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet dolor commodo lectus tempus ullamcorper sit amet sed nulla. Donec aliquam malesuada justo, vitae sagittis sem aliquet a.',
        },
      ],
    },
    {
      label: 'Minggu Lalu',
      data: [
        {
          id: 3,
          photos: ['https://i.picsum.photos/id/129/536/354.jpg?hmac=gjW_nduOoXN0pECejBE5tOikjkxxiYjU9JQq_Y-nPBQ'],
          title: 'Bimbingan Teknis Pemrograman',
          date: '30 November 2021',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet dolor commodo lectus tempus ullamcorper sit amet sed nulla. Donec aliquam malesuada justo, vitae sagittis sem aliquet a.',
        },
        {
          id: 1,
          photos: ['https://i.picsum.photos/id/9/536/354.jpg?hmac=5PiiV8cCMwZsDl8bYwpetFqtPuNn5uY2WcKTEb5ykW4'],
          title: 'Belajar Word',
          date: '30 November 2021',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet dolor commodo lectus tempus ullamcorper sit amet sed nulla. Donec aliquam malesuada justo, vitae sagittis sem aliquet a.',
        },
      ],
    },
  ];

  const [docDetail, setDocDetail] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({
    photos: '',
    title: '',
    date: '',
    description: '',
  });
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
            <Form.Control variant="normal" type="text" placeholder="Cari" />
            <Search />
          </InputGroup>
        </Col>
        <Col xs={3}>
          <DatePicker name="filterDate" control={control} placeholder="Filter Tanggal" />
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
                  title={item.title}
                  urlPhoto={item.photos[0]}
                  date={item.date}
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
          style={{ backgroundImage: "url('" + selectedDoc.photos[activePhoto] + "')" }}>
          <div onClick={() => setDocDetail(false)} className={cx(bem.e('detail-close'), 'bg-white rounded-circle')}>
            <Close />
          </div>
          <div
            onClick={() => setActivePhoto(activePhoto - 1)}
            className={cx(bem.e('detail-left'), 'bg-white rounded-circle')}>
            <div></div>
          </div>
          <div
            onClick={() => setActivePhoto(activePhoto + 1)}
            className={cx(bem.e('detail-right'), 'bg-white rounded-circle')}>
            <div></div>
          </div>
          <div className={cx(bem.e('detail-page'), 'sdp-text-white fs-16')}>
            {activePhoto + 1 + ' / ' + selectedDoc.photos.length}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="sdp-text-grey-dark fs-14 mb-16">{selectedDoc.date}</div>
          <div className="sdp-text-black-dark fs-24 fw-bold mb-16">{selectedDoc.title}</div>
          <div className="sdp-text-grey-dark fs-16 mb-16">{selectedDoc.description}</div>
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
