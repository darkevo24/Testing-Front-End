import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';
import { bpmUrl } from 'utils/constants';

const AnggaranPersetujuanBiaya = () => {
  const history = useHistory();
  const handleCreate = (e) => {
    e.preventDefault();
    history.push('/cms/persetujuan-anggaran');
  };
  const user = useSelector(userSelector);
  const src = bpmUrl.concat('PersetujuanAnggaranBiayaCMS?userEmail=' + user?.email);
  return (
    <div className="py-40">
      <div className="pt-0">
        <iframe frameBorder="0" width="100%" height="700px" seamless title="Persetujuan Anggaran Biaya" src={src}></iframe>
      </div>
    </div>
  );
};

export default AnggaranPersetujuanBiaya;
