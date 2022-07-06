import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breadcrumbs } from 'components/Breadcrumb';
import { bpmUrl } from 'utils/constants';
import { userSelector } from 'containers/Login/reducer';
import { useSelector } from 'react-redux';

const Glosarium = (props) => {
  const breadcrumbsList = [
    {
      path: '#',
      label: 'Layanan',
    },
    {
      isActive: true,
      label: 'Glosarium',
    },
  ];
  const user = useSelector(userSelector);
  const src = bpmUrl.concat('GlosariumPortal?userEmail=' + user?.email);
  return (
    <div>
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <div className="p-32">
        <Row>
          <Col>
            <iframe
              frameBorder="0"
              scrolling="no"
              width="100%"
              height="1400px"
              seamless
              title="Glosarium"
              src={src}></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Glosarium;
