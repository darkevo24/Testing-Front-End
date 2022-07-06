import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';

const SDIWiki = () => {
  const user = useSelector(userSelector);
  const src = 'https://www.wavemakeronline.com/run-qhhqh823yx/SDI_BPM_master/#/Artikel';
  return (
    <div className="py-40">
      <div className="pt-0">
        <iframe frameBorder="0" width="100%" height="700px" seamless title="Penambahan Atribut CMS" src={src}></iframe>
      </div>
    </div>
  );
};

export default SDIWiki;
