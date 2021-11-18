import { Breadcrumbs } from 'components/Breadcrumb';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KesiapanSDILayout from '../../layouts/KesiapanSDILayout';
import { useState } from 'react';
import { icons } from '../../components/Icons';
import { useHistory } from 'react-router-dom';

const KesiapanSDIDaerah = () => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const showDisplayDropdown = () => {
    displayDropdown ? setDisplayDropdown(false) : setDisplayDropdown(true);
  };
  const hideDisplayDropdown = () => {
    setDisplayDropdown(false);
  };
  const DownIcon = icons['downChevron'];
  const breadcrumbsList = [
    {
      path: '/home',
      label: 'Beranda',
    },
    {
      path: '/Dashboard',
      label: 'Dashboard',
    },
    {
      isActive: true,
      label: 'Kesiapan SDI Daerah',
    },
  ];

  const ShowModal = () => {
    const history = useHistory();
    const goToPusat = () => {
      history.push('/kesiapan-sdi-pusat');
    };
    const goToDaerah = () => {
      history.push('/kesiapan-sdi-daerah');
    };
    return (
      <div className="kesiapan-sdi-modal">
        <p className="fw-bold mx-1" onClick={goToPusat}>
          Pusat
        </p>
        <p className="fw-bold mx-1 active" onClick={goToDaerah}>
          Daerah
        </p>
      </div>
    );
  };

  return (
    <div className="kesiapan-sd-pusat-wrapper">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <KesiapanSDILayout>
        <div className="d-flex align-items-center">
          <div className="icon-box-lg" onClick={showDisplayDropdown}>
            <DownIcon />
          </div>
          <div>
            <h5 className="fw-bold">Daerah</h5>
          </div>
        </div>
        <div onClick={hideDisplayDropdown}>
          {displayDropdown ? <ShowModal /> : null}
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

export default KesiapanSDIDaerah;
