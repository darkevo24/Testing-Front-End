import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const NewPenambahanAtributCMS = () => {
  const history = useHistory();
  const handleCreate = (e) => {
    e.preventDefault();
    history.push('/cms/penambahan-atribut-cms');
  };
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
        <iframe
          frameBorder="0"
          width="100%"
          height="700px"
          frameBorder="0"
          seamless
          title="Penambahan Atribut CMS"
          src="https://bpm.satudata.go.id/#/PenambahanAtributForm"></iframe>
      </div>
    </div>
  );
};

export default NewPenambahanAtributCMS;
