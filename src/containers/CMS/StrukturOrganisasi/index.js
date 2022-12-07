import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { isFulfilled } from 'redux-thunk-status';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Input } from 'components';
import InputGroup from 'react-bootstrap/InputGroup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { getStrukturOrganisasi, strukturDatasetSelector, getStrukturOrganisasiById, detailDataSelector } from './reducer';

import { ReactComponent as Plus } from 'assets/plus.svg';
import { useHistory } from 'react-router-dom';
import bn from 'utils/bemNames';
import cx from 'classnames';
import styled from 'styled-components';
import { apiUrls, post, put } from 'utils/request';
import { isEmpty } from 'lodash';

const Wrapper = styled.div`
  width: 100%;
  margin: 40px;
`;
const DetailWrapper = styled.div`
  width: 60%;
  min-width: 600px;
  margin: 40px;
`;

const Arrow = styled.i`
  border: solid gray;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;

  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;

const bem = bn('bimtek-form');

const CMSStrukturOrganisasi = () => {
  const dispatch = useDispatch();
  const { records: organizations } = useSelector(strukturDatasetSelector);
  const { record: detailData } = useSelector(detailDataSelector);
  const fetchData = (params) => {
    return dispatch(getStrukturOrganisasi(params));
  };
  const [newButton, setNewButton] = useState('');
  const [opentab, setOpentab] = useState(false);

  const [foto, setFoto] = useState(null);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [fotoLoading, setFotoLoading] = useState(false);

  const schema = yup
    .object({
      id: yup.number(),
      organizationName: yup.string().required(),
      officialMemo: yup.object({
        fileName: yup.string().required(),
        location: yup.string().required(),
        fileType: yup.string().required(),
        size: yup.number().required(),
      }),
    })
    .required();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...detailData,
    },
  });

  const handleFoto = (file) => {
    // eslint-disable-next-line
    let fileName = file.name.replace(/[&/\\#, +()$~%'":*?<>{}]/g, '');
    let newFile = new File([file], fileName, { type: 'image/png' });
    uploadFoto(newFile);
  };

  const uploadFoto = async (file) => {
    setFotoLoading(true);
    try {
      let fotoFormData = new FormData();
      fotoFormData.append('file', file);
      await post(apiUrls.uploadFoto, fotoFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        setFoto(res.data);
      });
    } catch (e) {
      errors.foto.message = e?.error?.message;
    }
  };

  useEffect(() => {
    fetchData();
    console.log('organizations', organizations);
    console.log('detailData', detailData);
  }, []);

  useEffect(() => {
    if (selectedProfile) {
      console.log('selectedProfile', selectedProfile);
      dispatch(getStrukturOrganisasiById(selectedProfile));
    }
  }, [selectedProfile]);

  const addStruktur = () => {
    //add new button counter
    setNewButton(Number(newButton + 1));
    console.log(newButton);
  };

  const removeStruktur = (id) => {
    //remove button counter
    setNewButton(Number(newButton - 1));
    console.log(newButton);
  };

  const openTab = async (id) => {
    console.log('id', id);
    setOpentab(true);
    setSelectedProfile(id);
    console.log('detailData', detailData);
  };

  const updateData = () => {
    const payload = {
      id: detailData?.id,
      organizationName: detailData?.organizationName,
      officialMemo: foto,
    };
    // post payload to api
    put(apiUrls.cmsOrganization, payload).then((res) => {
      console.log(res);
    });
  };
  return (
    <Wrapper>
      <Row>
        <Col xs={3} clasName="p-5">
          <div className={cx(bem.e('title'), 'mb-16')}>Struktur Organisasi</div>
          <div style={{ marginBottom: '25px' }}>
            {organizations.map((org) => (
              <div className="w-100 d-flex justify-content-between" style={{ marginBottom: '5px' }} key={org.id}>
                <Button onClick={() => removeStruktur(org.id)} style={{ width: '15%' }} variant="secondary">
                  -
                </Button>
                <Button
                  onClick={() => openTab(org.id)}
                  className="bg-white sdp-text-grey-dark border-gray-stroke"
                  variant="secondary"
                  style={{ width: '80%' }}>
                  <div style={{ width: '100%', display: 'flex' }}>
                    {' '}
                    <div style={{ display: 'flex', flex: 'start' }}>{org.organizationName}</div>
                    <div style={{ textAlign: 'left' }}>
                      <Arrow />
                    </div>
                  </div>
                </Button>
              </div>
            ))}
            {newButton > 0 &&
              Array.from(Array(newButton).keys()).map((i) => (
                <div className="w-100 d-flex justify-content-between" style={{ marginBottom: '5px' }} key={newButton[i]}>
                  <Button onClick={() => removeStruktur(newButton[i])} style={{ width: '15%' }} variant="secondary">
                    -
                  </Button>
                  <Button
                    onClick={() => openTab(newButton[i])}
                    className="bg-white sdp-text-grey-dark border-gray-stroke"
                    variant="secondary"
                    style={{ width: '80%' }}>
                    <div style={{ width: '100%', display: 'flex' }}>
                      {' '}
                      <div style={{ display: 'flex', flex: 'start' }}></div>
                      <div style={{ textAlign: 'left' }}>
                        <Arrow />
                      </div>
                    </div>
                  </Button>
                </div>
              ))}
          </div>

          <Button className="mx-auto" variant="success" onClick={addStruktur}>
            <Plus width="16" />
            Tambah
          </Button>
        </Col>
        <Col xs={9}>
          {opentab && (
            <DetailWrapper>
              <InputGroup>
                <Input group label="Nama" name="organizationName" control={control} error={errors.nama?.message} />
                <Button
                  variant="light"
                  type="primary"
                  className="mr-16 bg-gray sdp-text-grey-dark br-4 py-13 px-32 border-0"
                  onClick={updateData}>
                  Simpan
                </Button>
              </InputGroup>
              <Form.Group className="mb-24">
                <Form.Label>Gambar</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  defaultValue={detailData?.photo}
                  onChange={(e) => handleFoto(e.target.files[0])}
                />
              </Form.Group>
              <div style={{ backgroundImage: `url(${detailData?.photo})` }} className={bem.e('profile-circle')}></div>
            </DetailWrapper>
          )}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default CMSStrukturOrganisasi;
