import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker, Dropdown, Input } from 'components';
import { formatData, instansiData, jadwalData, nameData } from 'utils/dataConfig/dafter';
import { submitForm } from 'utils/helper';

export const daftarFormId = 'dafter-form-id';
export const submitDafterForm = submitForm(daftarFormId);
const schema = yup
  .object({
    instansi: yup.mixed().required(),
    name: yup.string().required(),
    konsep: yup.string().required(),
    definisi: yup.string().required(),
    sumber: yup.string().required(),
    jadwal: yup.mixed().required(),
    dibuat: yup.mixed().required(),
    diper: yup.mixed().required(),
    produsen: yup.string().required(),
    induk: yup.mixed().required(),
    format: yup.mixed().required(),
    link: yup.string().required(),
  })
  .required();

const DafterForm = ({ data, onSubmit }) => {
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
          <DatePicker
            group
            label="Dibuat"
            name="dibuat"
            control={control}
            rules={{ required: true }}
            error={errors.dibuat?.message}
          />
          <DatePicker
            group
            label="Diperbarui"
            name="diper"
            control={control}
            rules={{ required: true }}
            error={errors.diper?.message}
          />
          <Input
            group
            label="Produsen Data"
            name="produsen"
            control={control}
            rules={{ required: true }}
            error={errors.produsen?.message}
          />
          <Dropdown
            group
            label="Data Induk"
            name="induk"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={nameData.map((name) => ({ value: name, label: name }))}
            error={errors.induk?.message}
          />
          <Dropdown
            group
            label="Format"
            name="format"
            multi
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={formatData.map((format) => ({ value: format, label: format }))}
            error={errors.format?.message}
          />
          <Input
            group
            label="Link Akses"
            name="link"
            isLink
            control={control}
            rules={{ required: true }}
            error={errors.link?.message}
          />
          <Button className="invisible" type="submit" />
        </Form>
      </Row>
    </div>
  );
};

export default DafterForm;
