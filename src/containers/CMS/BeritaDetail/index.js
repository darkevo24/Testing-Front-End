import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import {
  setDetailBerita,
  setEditBerita,
  detailDataSelector,
  deleteBerita,
  setPreviewBerita,
  setStatusBerita,
} from '../BeritaBaru/reducer';
import { useDispatch, useSelector } from 'react-redux';

import { LogStatus } from 'components/Sidebars/LogStatus';
import { CMSForm, Loader, CMSTopDetail, CMSModal } from 'components';
import { submitBeritaForm, submitNewKategori } from 'components/CMSForm';
import { Trash, EyeSvg, SaveSvg } from 'components/Icons';
import Notification from 'components/Notification';
import bn from 'utils/bemNames';

const bem = bn('content-detail');

const CMSBeritaDetail = (props) => {
  const idBerita = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, record } = useSelector(detailDataSelector);
  const fetchData = (params) => {
    dispatch(setDetailBerita(params));
  };

  useEffect(() => {
    if (record.id?.toString() !== idBerita) {
      fetchData({ id: idBerita });
    }
  }, [idBerita]);

  const [beritaStatus, setBeritaStatus] = useState(record);
  const [modalLabel, setModalLabel] = useState('');

  const actionSubmit = (status) => {
    setBeritaStatus(status);
    let label = '';
    switch (status) {
      case 0:
        label = 'Simpan Berita?';
        break;
      case 2:
        label = 'Kirim Berita?';
        break;
      case 3:
        label = 'Apakah anda yakin ingin <b className="sdp-text-blue">menyetujui</b> Berita?';
        break;
      case 4:
        label = 'Apakah anda yakin ingin <b className="sdp-text-blue">menolak</b> Berita?';
        break;
      case 5:
        label = 'Apakah anda yakin ingin <b className="sdp-text-blue">menayangkan</b> Berita?';
        break;
      case 6:
        label = 'Apakah anda yakin ingin <b className="sdp-text-blue">tidak menayangkan</b> Berita?';
        break;
      case 7:
        label = 'Apakah anda yakin ingin <b className="sdp-text-blue">menghapus</b> Berita?';
        break;
      default:
        return;
    }
    setModalLabel(<span dangerouslySetInnerHTML={{ __html: label }}></span>);
  };

  const onSubmit = (data) => {
    // preview berita
    if (beritaStatus === 9) {
      return dispatch(setPreviewBerita(data)).then(() => history.push('/berita/preview'));
    }

    const publishDate = data.publishDate ? data.publishDate.split(' ')[0] : '';
    const publishTime = data.publishTime ? data.publishTime : '';
    data.publishDate = !publishDate ? '' : !publishTime ? publishDate + ' 00:00:00' : publishDate + ' ' + publishTime;
    // set default publishDate when publish
    if (beritaStatus === 2) {
      const currentDate = new Date().toISOString();
      data.publishDate = currentDate.split('T')[0] + ' ' + currentDate.split('T')[1].split('.')[0];
    }

    data.taglineId = data.taglineId.map((tag) => tag.value);
    data.status = beritaStatus;
    setBeritaStatus(-1); // close confirmation modal

    if (data.kategori.value === 'new') {
      // action create kategori
      submitNewKategori(data.kategori.label).then((res) => {
        data.kategori = res.data.content.id;
        submitEditBerita(data);
      });
      return;
    }
    data.kategori = data.kategori.value;
    submitEditBerita(data);
  };

  const submitEditBerita = (data) => {
    switch (data.status) {
      case 3:
      case 4:
      case 5:
      case 6:
        // update status
        dispatch(setStatusBerita({ payload: { status: data.status, note: data.note ? data.note : '' }, id: idBerita })).then(
          (res) => notifyResponse(res),
        );
        break;
      case 5:
        // delete
        dispatch(deleteBerita({ id: idBerita })).then((res) => notifyResponse(res));
        break;
      default:
        return dispatch(setEditBerita({ payload: data, id: idBerita })).then((res) => notifyResponse(res));
    }
  };

  const notifyResponse = (res) => {
    res?.payload
      ? Notification.show({
          type: 'secondary',
          message: (
            <div>
              Berita <span className="fw-bold">{res.meta.arg?.payload?.judul}</span> Berhasil Diubah
            </div>
          ),
          icon: 'check',
        })
      : Notification.show({
          message: (
            <div>
              Error <span className="fw-bold">{res.error?.message}</span> Data Tidak Diubah
            </div>
          ),
          icon: 'cross',
        });
  };

  const previewBerita = () => {
    Promise.resolve()
      .then(() => setBeritaStatus(9))
      .then(() => submitBeritaForm());
  };

  return (
    <div>
      <CMSTopDetail status={record?.status} />
      <Row className={bem.e('section')}>
        <Col sm={8}>
          <div>
            <div className="d-flex justify-content-between mb-3">
              <div className={bem.e('title')}>Edit Berita</div>
              {record?.status === 2 ? (
                <div>
                  <Button variant="secondary" onClick={() => actionSubmit(7)}>
                    <Trash />
                  </Button>
                  <Button
                    onClick={() => previewBerita()}
                    variant="light"
                    className="ml-8 bg-white sdp-text-grey-dark border-gray-stroke">
                    <EyeSvg />
                  </Button>
                  <Button
                    onClick={() => actionSubmit(0)}
                    variant="light"
                    className="ml-8 bg-white sdp-text-grey-dark border-gray-stroke">
                    <SaveSvg />
                  </Button>
                  <Button
                    onClick={() => actionSubmit(4)}
                    variant="light"
                    className="ml-10 bg-white border-gray-stroke sdp-text-black-dark"
                    style={{ width: '112px' }}>
                    Tolak
                  </Button>
                  <Button onClick={() => actionSubmit(3)} className="ml-10" variant="info" style={{ width: '112px' }}>
                    Setujui
                  </Button>
                </div>
              ) : record?.status === 3 || record?.status === 5 || record?.status === 6 ? (
                <div>
                  <Button variant="secondary" onClick={() => actionSubmit(7)}>
                    <Trash />
                  </Button>
                  <Button
                    onClick={() => previewBerita()}
                    variant="light"
                    className="ml-8 bg-white sdp-text-grey-dark border-gray-stroke">
                    <EyeSvg />
                  </Button>
                  <Button
                    onClick={() => actionSubmit(0)}
                    variant="light"
                    className="ml-8 bg-white sdp-text-grey-dark border-gray-stroke">
                    <SaveSvg />
                  </Button>
                  {record?.status === 3 || record?.status === 6 ? (
                    <Button
                      onClick={() => actionSubmit(5)}
                      variant="light"
                      className="ml-10 bg-white border-gray-stroke sdp-text-black-dark"
                      style={{ width: '112px' }}>
                      Publish
                    </Button>
                  ) : (
                    <Button
                      onClick={() => actionSubmit(6)}
                      variant="light"
                      className="ml-10 bg-white border-gray-stroke sdp-text-black-dark"
                      style={{ width: '112px' }}>
                      Unpublish
                    </Button>
                  )}
                </div>
              ) : (
                <div>
                  <Button variant="secondary" onClick={() => actionSubmit(7)}>
                    <Trash />
                  </Button>
                  <Button
                    onClick={() => previewBerita()}
                    variant="light"
                    className="ml-10 bg-white border-gray-stroke sdp-text-black-dark"
                    style={{ width: '112px' }}>
                    Lihat
                  </Button>
                  <Button onClick={() => actionSubmit(2)} className="ml-10" variant="info" style={{ width: '112px' }}>
                    Kirim
                  </Button>
                </div>
              )}
            </div>
            {!loading ? <CMSForm data={record} onSubmit={onSubmit} /> : null}
          </div>
        </Col>
        <Col sm={3}>
          <LogStatus data={[]} />
        </Col>
        {loading && <Loader fullscreen={true} />}
      </Row>
      {beritaStatus >= 0 && beritaStatus < 9 ? (
        <CMSModal
          loader={false}
          onClose={() => setBeritaStatus(-1)}
          confirmButtonAction={submitBeritaForm}
          label={modalLabel}
        />
      ) : null}
    </div>
  );
};

export default CMSBeritaDetail;
