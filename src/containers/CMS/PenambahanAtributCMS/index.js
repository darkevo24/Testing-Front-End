import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PenambahanAtributCMS = () => {
  const history = useHistory();
  const handleCreate = (e) => {
    e.preventDefault();
    history.push('/cms/penambahan-atribut-cms/new-atribut-cms');
  };
  return (
    <div className="py-40 px-10">
      <div className="px-30">
        <h1>Penambahan Atribut CMS</h1>
        <Button className="" variant="info" style={{ width: '152px' }} onClick={handleCreate}>
          Tambah Atribut
        </Button>
      </div>
      <div className="pt-0">
        <iframe
          frameBorder="0"
          width="100%"
          height="700px"
          frameBorder="0"
          seamless
          title="Penambahan Atribut CMS"
          src="https://bpm.satudata.go.id/#/PenambahanAtributCMS"></iframe>
      </div>
    </div>
  );
};

export default PenambahanAtributCMS;
