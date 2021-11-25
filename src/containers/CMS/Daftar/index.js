import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';
import DafterTable from 'containers/Dafter/DafterTable';
import bn from 'utils/bemNames';
const bem = bn('dafter');

const DaftarPage = () => {
  const { t } = useTranslation();
  return (
    <div className="dafter-page p-32 pb-100">
      <div className={cx(bem.e('header-wrapper'), 'mb-30')}>
        <div className="sdp-heading-big">{t('sandbox.dafter.title')}</div>
        <div className="d-flex justify-content-between mt-26">
          <div className="d-flex">
            <Button variant="info" className="text-nowrap" onClick={() => {}}>
              {t('common.addData')}
            </Button>
            <Button variant="secondary" className="ml-8 text-nowrap" onClick={() => {}}>
              {t('common.download')}
            </Button>
          </div>
          <InputGroup className={bem.e('cms-search')}>
            <Form.Control
              variant="normal"
              type="text"
              placeholder={t('common.searchPlaceholder')}
              value={''}
              onChange={() => {}}
            />
            <div className="icon-container">
              <Search />
            </div>
          </InputGroup>
        </div>
      </div>

      <DafterTable bem={bem} cms />
    </div>
  );
};

export default DaftarPage;
