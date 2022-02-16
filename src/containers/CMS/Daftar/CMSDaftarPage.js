import React, { useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import { Search } from 'components/Icons';
import { FilterSearchInput } from 'components/Table';
import DaftarTable from 'containers/Daftar/DaftarTable';
import { sekreteriatDaftarDataSelector } from 'containers/Daftar/reducer';
import { useSelector } from 'react-redux';

const CMSDaftarPage = (props) => {
  const [search, setSearch] = useState('');
  const { t } = useTranslation();
  const { bem } = props;
  const history = useHistory();
  const { bodyParams } = useSelector(sekreteriatDaftarDataSelector);

  return (
    <div className="daftar-page p-32 pb-100">
      <div className={cx(bem.e('header-wrapper'), 'mb-30')}>
        <div className="sdp-heading-big">{t('sandbox.daftar.title')}</div>
        <div className="d-flex justify-content-between mt-26">
          <div className="d-flex">
            <Button variant="info" className="text-nowrap" onClick={() => history.push('/cms/daftar/manage-dafter-data/')}>
              {t('common.addData')}
            </Button>
            <Button variant="secondary" className="ml-8 text-nowrap" onClick={() => props.onDownloadData(bodyParams)}>
              {t('common.download')}
            </Button>
          </div>
          <div>
            <FilterSearchInput
              className={bem.e('cms-search')}
              searchPlaceholder="Cari Data"
              setGlobalFilter={(value) => setSearch(value)}
              searchThreshold={300}
            />
          </div>
        </div>
      </div>
      <DaftarTable cms {...props} textSearch={search} />
    </div>
  );
};

export default CMSDaftarPage;
