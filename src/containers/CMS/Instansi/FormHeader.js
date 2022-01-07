import Button from 'react-bootstrap/Button';
import bn from 'utils/bemNames';

const bem = bn('instansi-data-new');

const FormHeader = ({ onBatalClick, onHandleSubmitForm }) => {
  return (
    <div className={bem.e('header-log')}>
      <div className="wrapper-left d-flex flex-row">
        <h1>Buat Unit Kerja Baru</h1>
        <Button className="mx-4" variant="outline-secondary" onClick={onBatalClick}>
          Batal
        </Button>
        <Button className="mx-4" variant="info" onClick={onHandleSubmitForm}>
          Simpan
        </Button>
      </div>
      <div className="wrapper-right">
        <span>Saved 1 Minute ago </span>
        <span className="status">Draft</span>
      </div>
    </div>
  );
};

export default FormHeader;
