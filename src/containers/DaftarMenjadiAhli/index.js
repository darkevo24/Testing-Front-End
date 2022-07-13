import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { bpmUrl } from 'utils/constants';

const DaftarMenjadiAhli = (props) => {
  const src = bpmUrl.concat('FormRequest');
  return (
    <div className="dashboard">
      <div className="p-32">
        <Row>
          <Col>
            <iframe
              frameBorder="0"
              seamless
              title="Daftar menjadi ahli"
              height="100%"
              scrolling="no"
              width="100%"
              src={src}></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DaftarMenjadiAhli;
