import { Breadcrumbs } from 'components/Breadcrumb';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './kesiapanSdiDaerah.scss';
import KesiapanSDILayout from '../../layouts/KesiapanSDILayout';

const KesiapanSDIDaerah = () => {
  const breadcrumbsList = [
    {
      path: '/home',
      label: 'Beranda',
    },
    {
      isActive: true,
      label: 'Kesiapan SDI Daerah',
    },
  ];

  return (
    <div className="kesiapan-sd-pusat-wrapper">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <KesiapanSDILayout>
        <div>
          <Row className="kesiapan-sdi-daerah mb-3 rectangle">
            <Col className="justify-content-center align-items-center just">
              <span className="fw-bold">Iframe Superset</span>
            </Col>
          </Row>
        </div>
      </KesiapanSDILayout>
    </div>
  );
};

export default KesiapanSDIDaerah;
