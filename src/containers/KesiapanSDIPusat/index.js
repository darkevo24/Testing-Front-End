import { Breadcrumbs } from 'components/Breadcrumb';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KesiapanSDILayout from '../../layouts/KesiapanSDILayout';

const KesiapanSDIPusat = () => {
  const breadcrumbsList = [
    {
      path: '/home',
      label: 'Beranda',
    },
    {
      isActive: true,
      label: 'Kesiapan SDI Pusat',
    },
  ];

  return (
    <div className="kesiapan-sd-pusat-wrapper">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <KesiapanSDILayout>
        <div>
          <Row className="kesiapan-sdi-iframe-container mb-3">
            <Col className="justify-content-center align-items-center just">
              <span className="fw-bold">Iframe Superset</span>
            </Col>
          </Row>
        </div>
      </KesiapanSDILayout>
    </div>
  );
};

export default KesiapanSDIPusat;