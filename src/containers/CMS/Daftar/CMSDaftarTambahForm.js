import React, { useEffect } from 'react';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import cloneDeep from 'lodash/cloneDeep';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Modal } from 'components';
import SingleSelectDropdown from 'components/DropDown/SingleSelectDropDown';
import { pengaturanAksesOptions } from 'utils/constants';
import { findOption } from 'utils/helper';

const schema = yup.object({
  nama: yup.string().required('Nama is required'),
  pengaturanAkses: yup.object().required('Pengaturan akses is required'),
});

const TambahForm = ({ visible, setModal, selectedRecord, data, handleDataSubmit }) => {
  const isEdit = !!data?.id;
  const variable = cloneDeep(data || {});
  if (isEdit) {
    variable.pengaturanAkses = findOption(pengaturanAksesOptions, variable.pengaturanAkses);
  }
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...variable,
    },
  });

  useEffect(() => {
    reset(variable);
  }, [selectedRecord]);

  return (
    <Modal visible={visible} title="Tambah Variabel" size="lg" onClose={() => setModal(false)} centered={true}>
      <Form noValidate onSubmit={handleSubmit(handleDataSubmit)}>
        <Row>
          <Input
            group
            label="Nama Variabel"
            labelClass="sdp-form-label  fw-normal"
            name="nama"
            error={errors?.nama?.message}
            control={control}
          />
        </Row>
        <Row>
          <Input
            group
            label="ID Konsep"
            labelClass="sdp-form-label  fw-normal"
            name="idKonsep"
            error={errors?.idKonsep?.message}
            control={control}
          />
        </Row>
        <Row>
          <Input
            group
            label="Konsep"
            labelClass="sdp-form-label  fw-normal"
            name="konsep"
            error={errors?.konsep?.message}
            control={control}
          />
        </Row>
        <Row>
          <Input
            group
            label="Definisi"
            labelClass="sdp-form-label  fw-normal"
            name="definisi"
            error={errors?.definisi?.message}
            control={control}
          />
        </Row>
        <Row>
          <label className="sdp-form-label py-8">Pengaturan Akses</label>
          <SingleSelectDropdown
            data={pengaturanAksesOptions}
            placeHolder=""
            error={errors?.pengaturanAkses?.message}
            control={control}
            name="pengaturanAkses"
          />
        </Row>
        <Row className="d-flex mt-32 mb-16">
          <Col className="d-flex justify-content-end">
            <Button variant="secondary" className="wpx-90" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button className="ml-8 wpx-90 btn-info" type="submit">
              Simpan
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TambahForm;
