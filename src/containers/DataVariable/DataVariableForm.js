import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { Dropdown, Input } from 'components';
import { pengaturanAksesOptions } from 'utils/constants';
import { submitForm, findOption } from 'utils/helper';

export const dataVariableFormId = 'daftar-form-id';
export const submitDataVariableForm = submitForm(dataVariableFormId);
const schema = yup
  .object({
    nama: yup.string().required(),
    pengaturanAkses: yup.mixed().required(),
  })
  .required();

const DataVariableForm = ({ data, onSubmit }) => {
  const isEdit = !isEmpty(data?.id);
  const variable = cloneDeep(data || {});
  if (isEdit) {
    variable.pengaturanAkses = findOption(pengaturanAksesOptions, variable.pengaturanAkses);
  }
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...variable,
    },
  });

  return (
    <div className="daftar-form">
      <Row>
        <Form id={dataVariableFormId} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            group
            label="Name Data"
            name="nama"
            placeholder="Add an email or name"
            control={control}
            rules={{ required: true }}
            error={errors.nama?.message}
          />
          <Input
            group
            label="Konsep"
            name="konsep"
            placeholder="Konsep"
            control={control}
            rules={{ required: true }}
            error={errors.konsep?.message}
          />
          <Input
            group
            label="ID Konsep"
            name="idKonsep"
            placeholder="ID Konsep"
            control={control}
            rules={{ required: true }}
            error={errors.idKonsep?.message}
          />
          <Input
            group
            label="Definisi"
            name="definisi"
            placeholder="Definisi"
            control={control}
            as="textarea"
            rules={{ required: true }}
            error={errors.definisi?.message}
          />
          <Dropdown
            group
            label="Pengaturan Akses"
            name="pengaturanAkses"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={pengaturanAksesOptions}
            error={errors.pengaturanAkses?.message}
          />
          <Button className="invisible" type="submit" />
        </Form>
      </Row>
    </div>
  );
};

export default DataVariableForm;
