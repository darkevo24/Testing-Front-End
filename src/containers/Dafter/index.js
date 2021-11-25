import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'components/Breadcrumb';
import { Search } from 'components/Icons';
import Tabs from 'components/Tabs';
import DafterTable from './DafterTable';
import SdgTable from './SdgTable';
import RkpTable from './RkpTable';
import DaftarDataSayaTable from './DaftarDataSayaTable';
import bn from 'utils/bemNames';

const bem = bn('dafter');

const Dafter = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(t('sandbox.dafter.tabs.dafter.key'));
  const activeTitle = t(`sandbox.dafter.tabs.${activeTab}.title`);
  const tabs = useMemo(
    () => [
      {
        key: t('sandbox.dafter.tabs.dafter.key'),
        title: t('sandbox.dafter.tabs.dafter.title'),
        component: <DafterTable bem={bem} />,
      },
      {
        key: t('sandbox.dafter.tabs.sdg.key'),
        title: t('sandbox.dafter.tabs.sdg.title'),
        component: <SdgTable bem={bem} />,
      },
      {
        key: t('sandbox.dafter.tabs.rkp.key'),
        title: t('sandbox.dafter.tabs.rkp.title'),
        component: <RkpTable bem={bem} />,
      },
      {
        key: t('sandbox.dafter.tabs.dafterSafa.key'),
        title: t('sandbox.dafter.tabs.dafterSafa.title'),
        component: <DaftarDataSayaTable bem={bem} />,
      },
    ],
    [],
  );
  const breadcrumbsList = useMemo(
    () => [
      {
        path: '/home',
        label: t('sandbox.title'),
      },
      {
        path: '/dafter',
        label: t('sandbox.dafter.title'),
      },
      {
        isActive: true,
        label: activeTitle,
      },
    ],
    [activeTab, t],
  );

  return (
    <div className="dafter-page pb-100">
      <Breadcrumb breadcrumbsList={breadcrumbsList} />
      <Row>
        <Col sm={{ span: 10, offset: 1 }}>
          <div className={cx(bem.e('header-wrapper'), 'd-flex justify-content-between align-items-center mt-42 mb-50')}>
            <div className="sdp-heading-big">{activeTitle}</div>
            <div className="d-flex">
              <InputGroup>
                <Form.Control
                  variant="normal"
                  type="text"
                  placeholder={t('sandbox.dafter.searchPlaceholder')}
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
    </div>
  );
};

export default Dafter;
