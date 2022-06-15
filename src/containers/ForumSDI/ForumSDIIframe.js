import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';

export const ForumSDIIframe = (props) => {
  const user = useSelector(userSelector);
  const src = 'https://bpm.satudata.go.id/#/Forum?userEmail=' + user?.email;
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
