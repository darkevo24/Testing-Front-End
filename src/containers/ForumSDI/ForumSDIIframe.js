import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ForumSDIIframe = (props) => {
  const src = 'https://bpm.satudata.go.id/#/Forum?userEmail=brijesh@deltadatamandiri.com';
  return (
    <div className="dashboard">
      <div className="p-0">
        <Row>
          <Col>
            <iframe frameBorder="0" seamless title="google" src={src}></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
};
