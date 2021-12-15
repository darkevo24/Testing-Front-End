import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { yupResolver } from '@hookform/resolvers/yup';
import { FileInput, Input } from 'components';
import SingleSelectDropDown from 'components/DropDown/SingleSelectDropDown';
import MultiSelectDropDown from 'components/DropDown/MultiSelectDropDown';
import TextEditorController from 'components/TextEditorController';
import { useState } from 'react';

const schema = yup
  .object({
    judul: yup.string().required(),
    topik: yup.mixed().required(),
    tag: yup.mixed().required(),
    isiforum: yup.mixed().required(),
    lampiran: yup.mixed(),
  })
  .required();

const CMSForumSDIForm = () => {
  const [files, setFiles] = useState(null);
  const [errorInfo, setErrorInfo] = useState({});
  const list = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
  ];
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      judul: '',
      topik: null,
      tag: null,
      isiforum: '',
      lampiran: null,
    },
  });

  const isValidFile = (size, type, file, key, message) => {
    const clone = { ...errorInfo };
    const isValid = file?.size < size && type.includes(file?.type);
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
  const handleFiles = (file) => {
    const isValid = isValidFile(524288, ['application/pdf', 'image/jpeg'], file, 'image', 'Only PDF with Max 2MB');
    if (isValid) setFiles(file);
  };
  const handleDataSubmit = (data) => {
    console.log('data', data);
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
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 py-7 px-40">
              Batal
            </Button>
            <Button
              key="Simpan"
              variant="light"
              type="submit"
              className="mr-16 bg-gray sdp-text-grey-dark br-4 py-7 px-32 border-0">
              Simpan
            </Button>
            <Button className="mr-16 bg-info sdp-text-white br-4 py-7 px-40 border-0">Kirim</Button>
          </div>
        </div>
        <div className="forum-sdi-wrapper bg-gray-lighter p-32">
          <Row className="mb-3 px-24">
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
              data={list}
              placeholder=""
              rules={{ required: true }}
              error={errors?.topik?.message ? 'Topik is required' : ''}
              isCreatable={true}
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
              error={errors?.tag?.message ? 'Tag is required' : ''}
              name="tag"
              data={list}
            />
            <TextEditorController
              name="isiforum"
              rules={{ required: true }}
              control={control}
              error={errors?.isiforum?.message ? 'Isi Forum is required' : ''}
              labelClass="sdp-form-label fw-normal"
              label="Isi Forum"
              defaultValue=""
              onChange={(e) => setValue({ isiforum: e })}
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
            />
            <FileInput
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
                controlId: 'formFile',
              }}
              label="Lampiran"
              labelClass="sdp-form-label fw-normal"
              name="lampiran"
              control={control}
              uploadInfo="Upload File (max. 512KB)"
              handleOnChange={handleFiles}
            />
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default CMSForumSDIForm;
