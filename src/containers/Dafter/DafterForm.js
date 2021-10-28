import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dropdown, Input } from 'components';
import { instansiData, jadwalData } from 'utils/dataConfig/dafter';
import { submitForm } from 'utils/helper';

export const daftarFormId = 'dafter-form-id';
export const submitDafterForm = submitForm(daftarFormId);
const schema = yup
  .object({
    instansi: yup.string().required(),
    name: yup.string().required(),
    konsep: yup.string().required(),
    definisi: yup.string().required(),
    sumber: yup.string().required(),
    jadwal: yup.string().required(),
  })
  .required();

const DafterForm = ({ data, onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="dafter-form">
      <Row>
        <Form id={daftarFormId} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Dropdown
            group
            label="Instansi"
            name="instansi"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={instansiData.map((instansi) => ({ value: instansi, label: instansi }))}
            error={errors.instansi?.message}
          />
          <Input
            group
            label="Name Data"
            name="name"
            control={control}
            rules={{ required: true }}
            error={errors.name?.message}
          />
          <Input
            group
            label="Konsep"
            name="konsep"
            control={control}
            rules={{ required: true }}
            error={errors.konsep?.message}
          />
          <Input
            group
            label="Definisi"
            name="definisi"
            control={control}
            as="textarea"
            rules={{ required: true }}
            error={errors.definisi?.message}
          />
          <Input
            group
            label="Sumber Definisi"
            name="sumber"
            control={control}
            rules={{ required: true }}
            error={errors.sumber?.message}
          />
          <Dropdown
            group
            label="Jadwal Pemutakhiran"
            name="jadwal"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={jadwalData.map((jadwal) => ({ value: jadwal, label: jadwal }))}
            error={errors.jadwal?.message}
          />
          <Button className="invisible" type="submit" />
        </Form>
      </Row>
    </div>
  );
};

export default DafterForm;
