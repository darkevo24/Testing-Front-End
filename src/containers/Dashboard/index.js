import { Breadcrumbs } from 'components/Breadcrumb';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import dropdownArrow from '../../assets/drop-down-arraw.svg';
import '../../assets/styles/pages/_dashboard.scss';
import { ListGroup } from 'react-bootstrap';

const Dashboard = (props) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState(props.options[0]);
  const showDisplayDropdown = () => {
    displayDropdown ? setDisplayDropdown(false) : setDisplayDropdown(true);
  };
  const hideDisplayDropdown = () => {
    setDisplayDropdown(false);
  };
  const breadcrumbsList = [
    {
      path: '/home',
      label: 'Beranda',
    },
    {
      path: '/Dashboard',
      label: 'Dashboard',
    },
    {
      isActive: true,
      label: props.title,
    },
  ];

  console.log(props.options);

  return (
    <div className="kesiapan-sd-pusat-wrapper">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <Container fluid className="bimtek-container">
        <div className="bimtek-header">{props.title}</div>
        <Row>
          <Col>
            <div className="align-items-center mb-3" hidden={props.title === 'Dashboard Saya'} style={{ display: 'flex' }}>
              <div className="dropdown-box" onClick={showDisplayDropdown}>
                <img src={dropdownArrow} alt="Dropdown" width="10" />
              </div>
              <div className="fw-600">{currentDashboard.title}</div>
            </div>
            <div className="position-relative" onClick={hideDisplayDropdown}>
              <div className="dashboard-modal" hidden={!displayDropdown}>
                <ListGroup>
                  {props.options.map((el, i) => (
                    <ListGroup.Item
                      key={'option-' + i}
                      onClick={() => setCurrentDashboard(el)}
                      active={currentDashboard.title === el.title}>
                      {el.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
              <Row className="kesiapan-sdi-iframe-container mb-3">
                <Col className="justify-content-center align-items-center just">
                  <iframe
                    width="1000"
                    height="1000"
                    frameBorder="0"
                    seamless
                    title={props.title}
                    src={currentDashboard.url}></iframe>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
