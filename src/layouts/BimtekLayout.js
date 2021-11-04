import {useHistory} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BimTekSidebar } from 'components/Sidebars/BimTekSidebar';

export const BimtekLayout = ({ children }) => {
  const history = useHistory();
  const handleOnClick = () => history.push('/bimtek-summary');

  return (
    <Container fluid className="bimtek-container">
      <div
        className="bimtek-header"
        onClick={handleOnClick}
        style={{cursor: "pointer"}}
      >
        Bimbingan Teknis
      </div>
      <Row>
        <Col xs="3">
          <BimTekSidebar/>
        </Col>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default BimtekLayout;
