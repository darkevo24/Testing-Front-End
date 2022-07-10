import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breadcrumbs } from 'components/Breadcrumb';
import { bpmUrl } from 'utils/constants';

const RegistrasiHakAkses = (props) => {
  const breadcrumbsList = [
    {
      path: '#',
      label: 'Sandbox',
    },
    {
      isActive: true,
      label: 'Registrasi Hak Akses',
    },
  ];
  const src = bpmUrl.concat('FormRequest');
  return (
    <div className="dashboard">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <div className="p-0">
        <Row>
          <Col>
            <iframe frameBorder="0" seamless title="Daftar menjadi ahli" src={src}></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RegistrasiHakAkses;
