import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dropdown, Input } from 'components';
import { pengaturanData } from 'utils/dataConfig/data-variable';
import { submitForm } from 'utils/helper';

export const dataVariableFormId = 'dafter-form-id';
export const submitDataVariableForm = submitForm(dataVariableFormId);
const schema = yup
  .object({
    name: yup.string().required(),
    konsep: yup.string().required(),
    definisi: yup.string().required(),
    pengaturan: yup.mixed().required(),
  })
  .required();

const DataVariableForm = ({ data, onSubmit }) => {
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
    <div className="dafter-form">
      <Row>
        <Form id={dataVariableFormId} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            group
            label="Name Data"
            name="name"
            placeholder="Add an email or name"
            control={control}
            rules={{ required: true }}
            error={errors.name?.message}
          />
          <Input
            group
            label="Konsep"
            name="konsep"
            placeholder="Add an email or name"
            control={control}
            rules={{ required: true }}
            error={errors.konsep?.message}
          />
          <Input
            group
            label="Definisi"
            name="definisi"
            placeholder="Add an email or name"
            control={control}
            as="textarea"
            rules={{ required: true }}
            error={errors.definisi?.message}
          />
          <Dropdown
            group
            label="Pengaturan Akses"
            name="pengaturan"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={pengaturanData.map((pengaturan) => ({ value: pengaturan, label: pengaturan }))}
            error={errors.pengaturan?.message}
          />
          <Button className="invisible" type="submit" />
        </Form>
      </Row>
    </div>
  );
};

export default DataVariableForm;
