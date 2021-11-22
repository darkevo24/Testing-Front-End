import { Breadcrumbs } from 'components/Breadcrumb';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import dropdownArrow from '../../assets/drop-down-arraw.svg';
import '../../assets/styles/pages/_dashboard.scss';
import { Dropdown, ListGroup } from 'react-bootstrap';

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
            <div className="dashboard-title mb-3" hidden={props.title === 'Dashboard Saya'}>
              <Row className="align-items-center">
                <Col xs={'auto'}>
                  <Dropdown>
                    <Dropdown.Toggle></Dropdown.Toggle>
                    <Dropdown.Menu>
                      {props.options.map((el, i) => (
                        <Dropdown.Item
                          key={'option-' + i}
                          onClick={() => setCurrentDashboard(el)}
                          active={currentDashboard.title === el.title}>
                          {el.title}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className="p-0">
                  <div className="fw-600 fs-16">{currentDashboard.title}</div>
                </Col>
              </Row>
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
