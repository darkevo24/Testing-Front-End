import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from 'components';
import { submitForm } from 'utils/helper';

export const kesiapanDataFormId = 'kesiapan-data-form-id';
export const submitKesiapanDataForm = submitForm(kesiapanDataFormId);
const schema = yup
  .object({
    title: yup.mixed().required(),
    modifiedBy: yup.mixed().required(),
    modified: yup.mixed().required(),
    status: yup.mixed().required(),
    createdBy: yup.mixed().required(),
    owner: yup.mixed().required(),
  })
  .required();

const KesiapanDataForm = ({ data, onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  return (
    <div className="kesiapan-data-form">
      <Row>
        <Form id={kesiapanDataFormId} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            group
            label="Table Name"
            name="title"
            control={control}
            rules={{ required: true }}
            error={errors.title?.message}
          />
          <Input
            group
            label="Diperbarui Oleh"
            name="modifiedBy"
            control={control}
            rules={{ required: true }}
            error={errors.modifiedBy?.message}
          />
          <Input
            group
            label="Jadwal Pembaruan"
            name="modifiedBy"
            control={control}
            rules={{ required: true }}
            error={errors.modifiedBy?.message}
          />
          <Input
            group
            label="Status"
            name="status"
            control={control}
            rules={{ required: true }}
            error={errors.status?.message}
          />
          <Input
            group
            label="Dibuat Oleh"
            name="createdBy"
            control={control}
            rules={{ required: true }}
            error={errors.createdBy?.message}
          />
          <Input
            group
            label="Pemilik"
            name="owner"
            control={control}
            rules={{ required: true }}
            error={errors.owner?.message}
          />
          <Button className="invisible" type="submit" />
        </Form>
      </Row>
    </div>
  );
};

export default KesiapanDataForm;
