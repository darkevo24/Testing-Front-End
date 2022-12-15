import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Input } from 'components';
import InputGroup from 'react-bootstrap/InputGroup';
import { yupResolver } from '@hookform/resolvers/yup';

import Notification from 'components/Notification';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { getStrukturOrganisasi, strukturDatasetSelector, getStrukturOrganisasiById, detailDataSelector } from './reducer';

import { ReactComponent as Plus } from 'assets/plus.svg';
import bn from 'utils/bemNames';
import cx from 'classnames';
import styled from 'styled-components';
import { apiUrls, post, put, deleteRequest } from 'utils/request';

const Wrapper = styled.div`
  width: 100%;
  margin: 40px;
`;
const DetailWrapper = styled.div`
  width: 60%;
  min-width: 600px;
  margin: 40px;
  margin-top: 10px;
`;

const WrapperButton = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-evenly;
`;

const RemoveButton = styled(Button)`
  width: 20px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StrukturButton = styled(Button)`
  background-color: white;
  color: grey-dark;
  border: 1px solid #d1d5da;
  width: 80%;
  height: 35px;
  font-size: 14px;
  &:hover {
    background-color: white;
    border: 1px solid red;
  }
`;

const AddButton = styled(Button)`
  height: 35px;
  font-size: 14px;
  margin-left: 40px;
`;

const Arrow = styled.i`
  border: solid gray;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;

  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;

const InputStruktur = styled(Input)`
  height: 35px;
  width: 80%;
}
`;

const InputGroupStruktur = styled(InputGroup)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SaveButton = styled(Button)`
  width: 100px;
  height: 35px;
  border-radius: 4px !important;
`;

const UploadButton = styled.div`
  background-color: transparent;
  border: 1px solid #0087d2;
  color: #0087d2;
  display: inline;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  height: 25px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UploadNew = styled.div`
  height: 250px;
  justify-content: center;
  align-items: center;
  width: 250px;
  display: flex;
  background-size: cover;
  background-color: #bfc6cd;
`;
const bem = bn('content-table');

const infoUpload = '**Image min width 1280px  |  file max 15mb (.png)';

const CMSStrukturOrganisasi = () => {
  const dispatch = useDispatch();
  const { records: organizations } = useSelector(strukturDatasetSelector);
  const { record: detailData } = useSelector(detailDataSelector);
  const fetchData = (params) => {
    return dispatch(getStrukturOrganisasi(params));
  };
  const [newButton, setNewButton] = useState('');
  const [opentab, setOpentab] = useState(false);
  const [formType, setFormType] = useState('update');

  const [selectedOrganization, setSelectedOrganization] = useState({});
  const [selectedProfile, setSelectedProfile] = useState(null);

  const schema = yup
    .object({
      id: yup.number(),
      organizationName: yup.string().required(),
      officialMemo: yup.object({
        location: yup.string().nullable(),
      }),
    })
    .defined();

  useEffect(() => {
    if (detailData) {
      const organization = {
        id: detailData.id,
        organizationName: detailData.organizationName,
        officialMemo: {
          location: detailData.photo,
        },
      };
      setSelectedOrganization(organization);
    }
  }, [detailData]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: '',
      organizationName: '',
      officialMemo: {
        location: '',
      },
    },
  });

  useEffect(() => {
    if (selectedOrganization) {
      reset(selectedOrganization);
    }
  }, [selectedOrganization]);

  const openUploadForm = (id) => {
    const elmButton = document.getElementById(id);
    elmButton.click();
  };

  const addFoto = async (e) => {
    let file = e.target.files[0];
    let fileName = file.name.replace(/[&/\\#, +()$~%'":*?<>{}]/g, '');
    let newFile = new File([file], fileName, { type: 'image/png' });
    uploadFoto(newFile);
  };

  const uploadFoto = async (file) => {
    try {
      let fotoFormData = new FormData();
      fotoFormData.append('file', file);
      await post(apiUrls.uploadFoto, fotoFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        setSelectedOrganization({ ...selectedOrganization, officialMemo: { location: res.data.location } });
      });
    } catch (e) {
      errors.foto.message = e?.error?.message;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProfile) {
      dispatch(getStrukturOrganisasiById(selectedProfile));
    }
  }, [selectedProfile]);

  const addStruktur = () => {
    setNewButton(Number(newButton + 1));
  };

  const removeStruktur = (id) => {
    if (id) {
      deleteRequest(`${apiUrls.cmsOrganization}/${id}`).then((res) => {
        Notification.show({
          type: 'secondary',
          message: 'Organization Deleted Successfully',
          icon: 'check',
        });
        dispatch(getStrukturOrganisasi());
      });
    } else {
      setNewButton(Number(newButton - 1));
    }
  };

  const openTab = async (operation, organizationId) => {
    if (operation === 'edit' || operation === 'null') {
      setSelectedProfile(organizationId);
    }

    setValue('organizationName', '');
    setFormType(operation);
    setOpentab(true);
  };

  const onSubmit = (data, e) => {
    if (formType === 'create') {
      reset(selectedOrganization);
      post(apiUrls.cmsOrganization, {
        organizationName: data.organizationName,
      }).then((res) => {
        const content = res.data.content;
        const updatedData = {
          id: content.id,
          organizationName: content.organizationName,
          officialMemo: {
            location: content.photo,
          },
        };
        setSelectedOrganization(updatedData);
        Notification.show({
          type: 'secondary',
          message: 'Organization Created Successfully',
          icon: 'check',
        });
        setSelectedOrganization(updatedData);
        dispatch(getStrukturOrganisasi());
      });
    } else {
      put(apiUrls.cmsOrganization, data).then((res) => {
        const content = res.data.content;
        const updatedData = {
          id: content.id,
          organizationName: content.organizationName,
          officialMemo: {
            location: content.photo,
          },
        };
        Notification.show({
          type: 'secondary',
          message: 'Organization Updated Successfully',
          icon: 'check',
        });
        setSelectedOrganization(updatedData);
        dispatch(getStrukturOrganisasi());
      });
    }
  };

  const onError = (errors, e) => {
    console.log('errors', errors);
  };

  return (
    <Wrapper>
      <Row>
        <Col xs={3} className="p-5 " style={{ borderRight: '1px solid #bfc6cd', height: '100vh' }}>
          <div className={cx(bem.e('title-small'), 'mb-16')}>Struktur Organisasi</div>
          <div style={{ marginBottom: '25px' }}>
            {organizations.map((org) => (
              <WrapperButton key={org.id}>
                <RemoveButton onClick={() => removeStruktur(org.id)} variant="secondary">
                  -
                </RemoveButton>
                <StrukturButton onClick={() => openTab('edit', org.id)} variant="secondary">
                  <Row>
                    <Col xs={10} className="d-flex flex-start">
                      {org.organizationName}
                    </Col>
                    <Col xs={2}>
                      <Arrow />
                    </Col>
                  </Row>
                </StrukturButton>
              </WrapperButton>
            ))}
            {newButton > 0 &&
              Array.from(Array(newButton).keys()).map((i) => (
                <WrapperButton key={newButton[i]}>
                  <RemoveButton onClick={() => removeStruktur(newButton[i])} variant="secondary">
                    -
                  </RemoveButton>
                  <StrukturButton onClick={() => openTab('create', newButton[i])} variant="secondary">
                    <Row>
                      <Col xs={10} className="d-flex flex-start"></Col>
                      <Col xs={2}>
                        <Arrow />
                      </Col>
                    </Row>
                  </StrukturButton>
                </WrapperButton>
              ))}
          </div>

          <AddButton variant="success" onClick={addStruktur}>
            <Plus width="14" /> Tambah
          </AddButton>
        </Col>
        <Col xs={9} className="pl-32">
          {opentab && (
            <DetailWrapper>
              <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <InputGroupStruktur>
                  <div style={{ width: '80%' }}>
                    <InputStruktur group name="organizationName" control={control} error={errors.nama?.message} />
                  </div>{' '}
                  <SaveButton className="mx-10" variant="info" onClick={handleSubmit(onSubmit, onError)}>
                    Simpan
                  </SaveButton>
                </InputGroupStruktur>

                {formType === 'edit' && (
                  <>
                    <Form.Group>
                      <Form.Label>Gambar</Form.Label>
                    </Form.Group>
                    {!selectedOrganization?.officialMemo?.location ? (
                      <>
                        <UploadNew>
                          <UploadButton onClick={() => openUploadForm('sdp-upload-dokumentasi')}>Upload</UploadButton>
                          <input id="sdp-upload-dokumentasi" type="file" style={{ display: 'none' }} onChange={addFoto} />
                        </UploadNew>
                        <span className="sdp-text-black-lighter fs-12 mt-6 align-center">{infoUpload}</span>
                      </>
                    ) : (
                      <>
                        <img src={selectedOrganization?.officialMemo?.location} alt="foto" style={{ maxWidth: '100vh' }} />
                        <div>
                          <UploadButton className="mt-3" onClick={() => openUploadForm('sdp-upload-dokumentasi')}>
                            Ubah Gambar
                          </UploadButton>
                          <input id="sdp-upload-dokumentasi" type="file" style={{ display: 'none' }} onChange={addFoto} />
                        </div>
                      </>
                    )}
                  </>
                )}
              </Form>
            </DetailWrapper>
          )}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default CMSStrukturOrganisasi;
