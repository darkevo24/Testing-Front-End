import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import { FileInput, Input } from 'components';
import SingleSelectDropDown from 'components/DropDown/SingleSelectDropDown';
import MultiSelectDropDown from 'components/DropDown/MultiSelectDropDown';
import TextEditorController from 'components/TextEditorController';
import Modal from 'components/Modal';
import { apiUrls, post, put } from 'utils/request';
import {
  getCMSForumSDITags,
  getCMSForumSDITopik,
  getCMSForumSDIDataById,
  cmsForumSDIGetDetailSelector,
  cmsForumSDIGetTopikSelector,
  cmsForumSDIGetTagsSelector,
} from './reducer';
import { Close } from 'components/Icons';

const schema = yup
  .object({
    judul: yup.string().required(),
    topik: yup.mixed().required(),
    tags: yup.mixed().required(),
    isi: yup.string().required(),
  })
  .required();

const CMSForumSDIForm = () => {
  const [lampiran, setLampiran] = useState(null);
  const [errorInfo, setErrorInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [formData, setFormData] = useState({});
  const [apiError, setAPIError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { detailResult, detailError } = useSelector(cmsForumSDIGetDetailSelector);
  const { topikResult, topikLoading } = useSelector(cmsForumSDIGetTopikSelector);
  const { tagsResult, tagsLoading } = useSelector(cmsForumSDIGetTagsSelector);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    // watch,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      judul: '',
      topik: null,
      tags: null,
      isi: '',
    },
  });

  const value = getValues();
  useEffect(() => {
    if (!topikResult?.length) dispatch(getCMSForumSDITopik());
    if (!tagsResult?.length) dispatch(getCMSForumSDITags());
    if (!id) setShowUploadFile(true);
  }, []);

  useEffect(() => {
    if (!id) return;
    if (detailResult?.id !== +id) dispatch(getCMSForumSDIDataById(id));
    else {
      setDefaultData();
    }
  }, [id]);

  useEffect(() => {
    if (detailResult?.id !== +id) return;
    setDefaultData();
  }, [detailResult]);

  const setDefaultData = () => {
    const topikResID = topikResult?.records.find((elem) => detailResult?.topik === elem?.id);
    setUploadedFiles(detailResult?.lampiran);
    const fields = [
      { name: 'judul', value: detailResult?.judul || '' },
      { name: 'topik', value: [{ value: topikResID?.id, label: topikResID?.name }] || '' },
      { name: 'tags', value: detailResult?.tags.map((elem) => ({ value: elem, label: elem })) },
      { name: 'isi', value: detailResult?.isi || '' },
    ];
    fields.forEach(({ name, value }) => setValue(name, value));
  };

  const isValidFile = (size, file, key, message) => {
    const clone = { ...errorInfo };
    const isValid = file?.size < size;
    if (!isValid) {
      setErrorInfo({
        ...errorInfo,
        [key]: message,
      });
      return false;
    }
    delete clone[key];
    setErrorInfo(clone);
    return true;
  };

  const handleFiles = (files) => {
    const isValid = isValidFile(524288, files, 'lampiran', 'Only File with Max 512KB');
    if (!isValid) setLampiran(files);
  };

  const uplodFile = async () => {
    try {
      let fileFormData = new FormData();
      fileFormData.append('file', lampiran);
      const response = await post(`${apiUrls.publiFileUpload}`, fileFormData, {
        headers: { 'Content-Type': undefined },
      });
      return [response?.data] || [{}];
    } catch (e) {
      setAPIError(e.message);
    }
  };

  const removeFiles = (item) => {
    const list = [...uploadedFiles];
    const index = uploadedFiles.findIndex((file) => file.fileName === item.fileName);
    list.splice(index, 1);
    setUploadedFiles(list);
  };

  const goBack = () => {
    if (id) {
      history.push(`/cms/forum-sdi-detail/${id}`);
      return;
    }
    history.push('/cms/forum-sdi');
  };

  const handleDataSubmit = (data) => {
    const clone = { ...errorInfo };
    if ((!id && !lampiran) || (id && !uploadedFiles.length && !lampiran)) {
      clone['lampiran'] = 'lampiran is required';
    }
    if (!isEmpty(clone)) {
      setErrorInfo(clone);
      return;
    }
    setShowModal(true);
    setFormData(data);
  };

  const topikDropDownList = topikResult?.records.map((elem) => ({ value: elem?.id, label: elem?.nama }));
  const tagDropDownList = tagsResult?.content.map((elem) => ({ value: elem, label: elem }));

  const onSubmit = async () => {
    setLoader(true);
    let fileLink;
    if (!id || (id && lampiran)) {
      fileLink = await uplodFile();
    }
    if (lampiran && !fileLink) {
      setShowModal(false);
      setLoader(false);
    } else {
      try {
        const method = id ? put : post;
        const url = id ? `${apiUrls.cmsForumSDI}/${id}` : apiUrls.cmsForumSDI;
        await method(url, {
          judul: formData?.judul || '',
          topik: formData?.topik?.value || null,
          tags: formData.tags.map((elem) => elem.label) || [],
          isi: formData?.isi || '',
          lampiran: fileLink || [{}],
        });
        goBack();
      } catch (e) {
        setLoader(false);
        setShowModal(false);
        setAPIError(e.message);
      }
    }
  };
  return (
    <div className="cms-forum-sdi-forum-wrapper">
      <Form noValidate onSubmit={handleSubmit(handleDataSubmit)}>
        <div className="d-flex justify-content-between border-bottom-gray-stroke">
          <div className="d-flex align-items-center">
            <label className="fw-bold fs-24 lh-29 p-32">Forum SDI Baru</label>
            <Button
              key="Batal"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 py-7 px-40"
              onClick={goBack}>
              Batal
            </Button>
            <Button
              key="Simpan"
              variant="light"
              type="submit"
              className="mr-16 bg-gray sdp-text-grey-dark br-4 py-7 px-32 border-0">
              Simpan
            </Button>
          </div>
        </div>
        <div className="forum-sdi-wrapper bg-gray-lighter p-32">
          <Row className="mb-3 px-24">
            {apiError || (id && detailError) ? (
              <label className="sdp-error mb-20">{apiError || (id && detailError)}</label>
            ) : null}
            <Input
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              label="Judul"
              labelClass="sdp-form-label fw-normal"
              control={control}
              name="judul"
              error={errors?.judul?.message ? 'Judul is required' : ''}
            />
            <SingleSelectDropDown
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              name="topik"
              control={control}
              label="Topik"
              labelClass="sdp-form-label  fw-normal"
              data={topikDropDownList}
              placeholder=""
              rules={{ required: true }}
              error={errors?.topik?.message ? 'Topik is required' : ''}
              isCreatable={true}
              loading={topikLoading}
            />
            <MultiSelectDropDown
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              isMulti
              control={control}
              label="Tag"
              labelClass="sdp-form-label  fw-normal"
              placeholder=""
              rules={{ required: true }}
              error={errors?.tags?.message ? 'Tag is required' : ''}
              name="tags"
              data={tagDropDownList}
              loading={tagsLoading}
            />
            <TextEditorController
              rules={{ required: true }}
              control={control}
              error={errors?.isi?.message ? 'Isi Forum is required' : ''}
              labelClass="sdp-form-label fw-normal"
              label="Isi Forum"
              name="isi"
              onChange={(e) => setValue({ isi: e })}
              defaultValue={(id && (detailResult?.isi || '')) || value.isi || ''}
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
            />
            {id ? (
              <Form.Group as={Col} className="cms-forum-sdi-input mt-5 mb-10" md="8">
                <label className="sdp-form-label mb-8">Lampiran</label>
                <div className="input-data d-flex align-items-center bg-gray border-gray-stroke p-9 br-4">
                  {uploadedFiles.map((elem) => (
                    <label className="sdp-text-blue bg-light-blue mr-10">
                      {elem?.fileName}
                      <span className="sdp-text-black-dark ml-10 svg-8 cursor-pointer" onClick={() => removeFiles(elem)}>
                        <Close variant="dark" />
                      </span>
                    </label>
                  ))}
                  <label className="sdp-text-black bg-gray cursor-pointer" onClick={() => setShowUploadFile(true)}>
                    + Upload new file
                  </label>
                </div>
              </Form.Group>
            ) : null}
            {showUploadFile && (
              <FileInput
                error={errorInfo?.lampiran}
                group
                groupClass="mb-16"
                groupProps={{
                  md: 8,
                  as: Col,
                  controlId: 'formFile',
                }}
                label={!id ? 'Lampiran' : ''}
                labelClass="sdp-form-label fw-normal"
                name="lampiran"
                control={control}
                uploadInfo="Upload file (max. 512KB)"
                handleOnChange={handleFiles}
                className="h-100"
              />
            )}
          </Row>
        </div>
      </Form>
      <Modal visible={showModal} onClose={() => setShowModal(false)} title="" showHeader={false}>
        <label className="p-24">Simpan Perubahan Data?</label>
        <div className="d-flex justify-content-end mt-50">
          <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button className="br-4 px-39 py-13" variant="info" onClick={onSubmit}>
            {loader && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />}
            Konfirmasi
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CMSForumSDIForm;