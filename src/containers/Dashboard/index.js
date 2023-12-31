import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Dropdown } from 'react-bootstrap';
import { Breadcrumbs } from 'components/Breadcrumb';

const Dashboard = (props) => {
  const [currentDashboard, setCurrentDashboard] = useState(props.options[0]);
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

  useEffect(() => {
    setCurrentDashboard(props.options[0]);
  }, [props]);

  return (
    <div className="dashboard">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <div className="p-32">
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
                          active={currentDashboard?.title === el.title}>
                          {el.title}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className="p-0">
                  <div className="fw-600 fs-16">{currentDashboard?.title}</div>
                </Col>
              </Row>
            </div>
            <Row className="mb-3">
              <Col className="justify-content-center align-items-center">
                <iframe frameBorder="0" seamless title={currentDashboard?.title} src={currentDashboard?.url}></iframe>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
