import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cx from 'classnames';

import Logo from 'assets/logo-satu-data-id.png';
import bn from 'utils/bemNames';
import Button from 'components/Button.js';
import ContactUs from './form.js';
import TentangProfile from './profile.js';
import {
  getTentang,
  tentangPublicSelector,
  getStruktur,
  strukturPublicSelector,
  getStrukturOrganisasiById,
  detailDataSelector,
} from './reducer';
import styled from 'styled-components';
import { BooleanSchema } from 'yup';
import { Box } from 'containers/Footer/top.js';

const bem = bn('tentang');

const TentangSDI = () => {
  let dispatch = useDispatch();
  const { dataset, error } = useSelector(tentangPublicSelector);
  const { records: organizations, loading: strukturDataLoading } = useSelector(strukturPublicSelector);
  const [openTab, setOpenTab] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { record: detailData } = useSelector(detailDataSelector);

  const handleOpenTab = (id) => {
    setSelectedProfile(id);
    setOpenTab(true);
  };

  useEffect(() => {
    dispatch(getTentang());
    dispatch(getStruktur());
  }, []);

  useEffect(() => {
    if (selectedProfile) {
      document.getElementById('buttonOrg').classList.remove('sdp-tentang__strukturButton__first');
      dispatch(getStrukturOrganisasiById(selectedProfile));
      if (!openTab) {
        setOpenTab(true);
        document.getElementById('buttonOrg').classList.add('sdp-tentang__strukturButton__first');
      }
    }
  }, [selectedProfile]);

  useEffect(() => {
    if (!selectedProfile && organizations.length > 0) {
      setSelectedProfile(organizations[0]?.id);
    }
  }, [organizations]);

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
        <Row className="mt-40 mr-3">
          <Col xs={3} className="p-5">
            <div className={cx(bem.e('title-sm'), 'mb-16')}>Struktur Organisasi</div>
            <div>
              {organizations.map((org) => (
                <div key={org.id}>
                  <Button
                    id="buttonOrg"
                    className={bem.e('strukturButton')}
                    onClick={() => handleOpenTab(org.id)}
                    variant="secondary">
                    {org.organizationName}
                  </Button>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={9} style={{ marginTop: '60px' }}>
            {openTab && <img className={bem.e('photo')} src={detailData?.photo} alt="" style={{ maxWidth: '500px' }} />}
          </Col>
        </Row>
      </div>

      <ContactUs />
    </div>
  );
};

export default TentangSDI;
