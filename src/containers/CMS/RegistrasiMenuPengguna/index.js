import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';

const RegistrasiMenuPengguna = () => {
  const history = useHistory();
  const handleCreate = (e) => {
    e.preventDefault();
    history.push('/cms/penambahan-atribut-cms/new-atribut-cms');
  };
  const user = useSelector(userSelector);
  const src = 'https://bpm.satudata.go.id/#/PenambahanAtributCMS?userEmail=' + user?.email;
  return (
    <div className="py-40">
      <div className="pt-0">
        <iframe frameBorder="0" width="100%" height="700px" seamless title="Penambahan Atribut CMS" src={src}></iframe>
      </div>
    </div>
  );
};

export default RegistrasiMenuPengguna;
