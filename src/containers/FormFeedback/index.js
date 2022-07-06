import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { bpmUrl } from 'utils/constants';

const FormFeedback = (props) => {
  let urlParams = window.location.search;
  let queryString = new URLSearchParams(urlParams).toString();
  const src = bpmUrl.concat('FeedbackUserCreate?' + queryString);
  return (
    <div className="dashboard">
      <div className="p-32">
        <Row>
          <Col>
            <iframe
              frameBorder="0"
              seamless
              title="Form Feedback"
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

export default FormFeedback;
