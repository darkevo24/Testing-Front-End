import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';
import { bpmUrl } from 'utils/constants';

export const ForumSDIIframe = (props) => {
  const user = useSelector(userSelector);
  const src = bpmUrl.concat('Forum?userEmail=' + user?.email);
  return (
    <div className="dashboard">
      <div className="p-0">
        <Row>
          <Col>
            <iframe frameBorder="0" seamless title="Forum sdi" src={src}></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
};
