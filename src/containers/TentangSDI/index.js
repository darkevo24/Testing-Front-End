import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cx from 'classnames';

import Logo from 'assets/logo-satu-data-id.png';
import bn from 'utils/bemNames';

import ContactUs from './form.js';
import TentangProfile from './profile.js';
import { getTentang, tentangPublicSelector, getStruktur, strukturPublicSelector } from './reducer';

const bem = bn('tentang');

const TentangSDI = () => {
  let dispatch = useDispatch();
  const { dataset, error } = useSelector(tentangPublicSelector);
  const { records } = useSelector(strukturPublicSelector);

  const fetchData = () => {
    dispatch(getTentang());
    dispatch(getStruktur());
  };

  useEffect(() => fetchData(), []);

  const getYoutubeEmbed = (url) => {
    // eslint-disable-next-line
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return '//www.youtube.com/embed/' + match[2];
    } else {
      return 'error';
    }
  };

  return (
    <div>
      <div className={bem.e('container')}>
        <div className={bem.e('logo')}>
          <img src={Logo} alt="" />
        </div>
        {!dataset ? (
          <div className="text-center">{error}</div>
        ) : (
          <div>
            <iframe
              width="100%"
              height="500"
              title="sample"
              src={getYoutubeEmbed(dataset.video)}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
            <div className="mt-24">
              <div className={cx(bem.e('title'), 'mb-3')}>{dataset.judul}</div>
              <p className={bem.e('description')} dangerouslySetInnerHTML={{ __html: unescape(dataset.isi) }}></p>
            </div>
          </div>
        )}
        <div className="mt-100">
          <Row className="align-items-center mb-3">
            <Col>
              <div className={bem.e('red-line')}></div>
            </Col>
            <Col>
              <div className={cx(bem.e('title'), 'text-center')}>Struktur Organisasi</div>
            </Col>
            <Col>
              <div className={bem.e('red-line')}></div>
            </Col>
          </Row>
          {[1, 2].map((level) => (
            <div key={`level-${level}`} className="text-center">
              {records
                .filter((item) => item.level === level)
                .map((bidang) => {
                  return bidang.profil.map((profil, key) => (
                    <TentangProfile key={key} name={profil.nama} position={bidang.nama} urlPhoto={profil.foto} />
                  ));
                })}
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Row className="align-items-center mb-3">
            <Col xs={3}>
              <div className={bem.e('title-sm')}>Bidang Operational</div>
            </Col>
            <Col>
              <div className={bem.e('grey-line')}></div>
            </Col>
          </Row>
          <div className="d-flex flex-wrap">
            {records
              .filter((item) => item.level !== 1 && item.level !== 2)
              .sort((a, b) => a.level - b.level)
              .map((item, key) => (
                <div key={key}>
                  <div className={bem.e('card-top')}></div>
                  <div className={bem.e('card')}>{item.nama}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <ContactUs />
    </div>
  );
};

export default TentangSDI;
