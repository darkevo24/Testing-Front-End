import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { bpmUrl } from 'utils/constants';

const NewPenambahanAtributCMS = () => {
  const history = useHistory();
  const handleCreate = (e) => {
    e.preventDefault();
    history.push('/cms/penambahan-atribut-cms');
  };
  const src = bpmUrl.concat('PenambahanAtributForm');
  return (
    <div className="py-40 px-10">
      <div className="px-30">
        <div className="wrapper-left">
          <Button className="" variant="info" style={{ width: '152px' }} onClick={handleCreate}>
            Kembali
          </Button>
        </div>
        <div className="wrapper-right"></div>
      </div>
      <div className="pt-0">
        <iframe frameBorder="0" width="100%" height="700px" seamless title="Penambahan Atribut CMS" src={src}></iframe>
      </div>
    </div>
  );
};

export default NewPenambahanAtributCMS;
