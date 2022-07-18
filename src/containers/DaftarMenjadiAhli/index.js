import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { bpmUrl } from 'utils/constants';

const DaftarMenjadiAhli = (props) => {
  const src = bpmUrl.concat('FormRequest');
  return (
    <div>
      <div className="pt-32">
        <Row>
          <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
            <iframe
              frameBorder="0"
              seamless
              title="Daftar menjadi ahli"
              height="2200px"
              scrolling="yes"
              width="100%"
              src={src}></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DaftarMenjadiAhli;
