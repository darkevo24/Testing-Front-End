import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import image404 from 'assets/404.png';
import bn from 'utils/bemNames';

const bem = bn('404');

export const NotFound = () => {
  const history = useHistory();
  const goTo = (params) => () => history.push(params);
  return (
    <div className={bem.b()}>
      <img src={image404} className={bem.e('img-not-found')} alt="not-found" />
      <div className="sdp-heading my-24">Telah terjadi kesalahan, halaman yang anda tuju tidak tersedia untuk saat ini</div>
      <Button onClick={goTo('/home')}>Kembali ke Home</Button>
    </div>
  );
};

export default NotFound;
