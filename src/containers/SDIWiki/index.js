import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cx from 'classnames';

import Logo from 'assets/logo-satu-data-id.png';
import bn from 'utils/bemNames';

const bem = bn('tentang');

const src = 'https://www.wavemakeronline.com/run-qhhqh823yx/SDI_BPM_master/#/Wiki';

const SDIWiki = () => {
  return (
    <div>
      <iframe frameBorder="0" width="100%" height="700px" seamless title="Penambahan Atribut CMS" src={src}></iframe>
    </div>
  );
};

export default SDIWiki;
