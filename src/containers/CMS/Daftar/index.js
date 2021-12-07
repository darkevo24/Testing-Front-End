import { useEffect } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'components/Icons';
import DaftarTable from 'containers/Daftar/DaftarTable';
import {
  getDatainduk,
  getInstansi,
  getProduen,
  dataindukDataSelector,
  produenDataSelector,
  instansiDataSelector,
} from '../../Daftar/reducer';
import bn from 'utils/bemNames';

const bem = bn('daftar');

const DaftarPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const dataindukData = useSelector(dataindukDataSelector);
  const instansiData = useSelector(instansiDataSelector);
  const produenData = useSelector(produenDataSelector);

  const instansiOptions =
    instansiData?.result?.map((instansi) => ({
      value: instansi.id,
      label: instansi.nama,
    })) || [];
  const produenOptions =
    produenData?.result?.map((produen) => ({
      value: produen,
      label: produen,
    })) || [];
  const dataindukOptions =
    dataindukData?.result?.map((datainduk) => ({
      value: datainduk,
      label: datainduk,
    })) || [];
  const priorityOptions = [
    { value: 1, label: 'Semua' },
    { value: 2, label: 'Ya' },
    { value: 3, label: 'Tidak' },
  ];
  useEffect(() => {
    dispatch(getInstansi());
    dispatch(getProduen());
    dispatch(getDatainduk());
  }, []);

  const daftarTableOptions = {
    bem,
    dataindukOptions,
    instansiOptions,
    priorityOptions,
    produenOptions,
  };
  return (
    <div className="daftar-page p-32 pb-100">
      <div className={cx(bem.e('header-wrapper'), 'mb-30')}>
        <div className="sdp-heading-big">{t('sandbox.daftar.title')}</div>
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

      <DaftarTable cms {...daftarTableOptions} />
    </div>
  );
};

export default DaftarPage;
