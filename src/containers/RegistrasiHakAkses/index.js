import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { bpmUrl } from 'utils/constants';

const RegistrasiHakAkses = (props) => {
  const src = bpmUrl.concat('Registrasi');
  return (
    <div className="dashboard">
      <div className="p-0">
        <Row>
          <Col>
            <iframe frameBorder="0" seamless title="Registrasi layanan portal" src={src}></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RegistrasiHakAkses;
