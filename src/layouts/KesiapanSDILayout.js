import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { KesiapanSDISidebar } from 'components/Sidebars/KesiapanSDISidebar';

export const KesiapanSDILayout = ({ children }) => {
  const history = useHistory();
  const handleOnClick = () => history.push('/kesiapan-sdi-pusat');

  return (
    <Container fluid className="bimtek-container">
      <div className="bimtek-header" onClick={handleOnClick} style={{ cursor: 'pointer' }}>
        Kesiapan SDI
      </div>
      <Row>
        <Col xs="3">
          <KesiapanSDISidebar />
        </Col>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

export default KesiapanSDILayout;
