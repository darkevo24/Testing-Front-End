import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';

const PendaftarAhli = () => {
  const user = useSelector(userSelector);
  const src = 'https://bpm.satudata.go.id/#/PendaftaranAhli?userEmail=' + user?.email;
  return (
    <div className="py-40 px-0">
      <div className="pt-0">
        <iframe frameBorder="0" width="100%" height="700px" seamless title="Pendaftar Ahli" src={src}></iframe>
      </div>
    </div>
  );
};

export default PendaftarAhli;
