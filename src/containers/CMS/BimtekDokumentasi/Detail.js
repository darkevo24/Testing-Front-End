import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { useHistory } from 'react-router-dom';
import { CMSBimtekForm } from 'components';
import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';
import { LogStatus } from 'components/Sidebars/LogStatus';
import bn from 'utils/bemNames';
import { BimtekDokumentasiDetailSelector, getDokumentasiDetail } from './reducer';

const bem = bn('content-detail');

const CMSDokumentasiDetail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { records } = useSelector(BimtekDokumentasiDetailSelector);
  const fetchDokumentasiDetail = (params) => {
    return dispatch(getDokumentasiDetail(params));
  };

  useEffect(() => {
    fetchDokumentasiDetail(id);
  }, []);

  const dataLog = [
    {
      date: '12 Desember 2021',
      status: 'Selesai',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '10 Desember 2021',
      status: 'Diproses',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '08 Desember 2021',
      status: 'Terkirim',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '08 Desember 2021',
      status: 'Dibuat',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
  ];

  return (
    <Row className={bem.e('section')}>
      <Col sm={9}>
        <div>
          <div className="d-flex justify-content-between mb-4">
            <div className={bem.e('title')}>Dokumentasi Bimbingan Teknis</div>
            <div>
              <Button variant="secondary">
                <DeleteIcon />
              </Button>
              <Button className="ml-10" variant="secondary" style={{ width: '112px' }}>
                Perbarui
              </Button>
            </div>
          </div>
          <CMSBimtekForm disabled={true} isDocumentation={true} data={records} />
        </div>
      </Col>
      <Col sm={3}>
        <LogStatus data={dataLog} />
      </Col>
    </Row>
  );
};

export default CMSDokumentasiDetail;
