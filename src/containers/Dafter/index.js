import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Search } from 'components/Icons';
import Tabs from 'components/Tabs';
import DafterTable from './DafterTable';
import bn from 'utils/bemNames';

const bem = bn('dafter');

const Dafter = () => {
  const [activeTab, setActiveTab] = useState('dafter');
  const { t } = useTranslation();
  const tabs = useMemo(
    () => [
      {
        key: t('dafter.tabs.dafter.key'),
        title: t('dafter.tabs.dafter.title'),
        component: <DafterTable />,
      },
      {
        key: t('dafter.tabs.sdg.key'),
        title: t('dafter.tabs.sdg.title'),
        component: <DafterTable />,
      },
      {
        key: t('dafter.tabs.rkp.key'),
        title: t('dafter.tabs.rkp.title'),
        component: <DafterTable />,
      },
      {
        key: t('dafter.tabs.dafterSafa.key'),
        title: t('dafter.tabs.dafterSafa.title'),
        component: <DafterTable />,
      },
    ],
    [],
  );
  return (
    <Container fluid className="dafter-page pb-100">
      <Row>
        <Col sm={{ span: 10, offset: 1 }}>
          <div className={cx(bem.e('header-wrapper'), 'd-flex justify-content-between align-items-center mt-42 mb-50')}>
            <div className="sdp-heading-big">{t('dafter.title')}</div>
            <div className="d-flex">
              <InputGroup>
                <Form.Control
                  variant="normal"
                  type="text"
                  placeholder={t('dafter.searchPlaceholder')}
                  value={''}
                  onChange={() => {}}
                />
                <div className="icon-container">
                  <Search />
                </div>
              </InputGroup>
              <Button className="btn-rounded ml-16 px-32 text-nowrap" onClick={() => {}}>
                {t('common.download')}
              </Button>
            </div>
          </div>
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.key} eventKey={tab.key} title={tab.title}>
                {tab.component}
              </Tabs.Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Dafter;
