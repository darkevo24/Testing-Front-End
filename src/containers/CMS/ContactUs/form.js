import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Input } from 'components';
import { NoPerminataanData } from 'components/Icons';
import { ReactComponent as Plus } from 'assets/plus.svg';
import { submitForm } from 'utils/helper';

const schema = yup
  .object({
    alamatLine1: yup.string().required(),
  })
  .required();

export const formContactId = 'form-contact-id';
export const submitContactForm = submitForm(formContactId);

const CMSContactForm = ({ data, disabled, onSubmit = () => {} }) => {
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
    <Form id={formContactId} onSubmit={handleSubmit(onSubmit)}>
      <Input
        group
        label="Alamat Line 1"
        name="alamatLine1"
        control={control}
        disabled={disabled}
        error={errors.alamatLine1?.message}
      />
      <Input
        group
        label="Alamat Line 2"
        name="alamatLine2"
        control={control}
        disabled={disabled}
        error={errors.alamatLine2?.message}
      />
      <Input
        group
        label="Nomor Telepon"
        name="nomorTelepon"
        control={control}
        disabled={disabled}
        error={errors.nomorTelepon?.message}
      />
      <Input
        group
        label="Nomor Fax"
        name="nomorFax"
        control={control}
        disabled={disabled}
        error={errors.nomorFax?.message}
      />
      <Input group label="Email" name="email" control={control} disabled={disabled} error={errors.email?.message} />
      <div className="mt-32">
        <div className="d-flex justify-content-between mb-3">
          <div className="fs-16 fw-bold">Tautan Sosial Media</div>
          {!disabled && (
            <div className="sdp-text-red fw-600 cursor-pointer">
              <Plus width="16" /> Tambah
            </div>
          )}
        </div>
        <div>
          {!data.sosialMedia ? (
            <div className="text-center mt-62">
              <NoPerminataanData />
              <div className="text-black-50 mb-2 mt-2">No Data</div>
            </div>
          ) : (
            data.sosialMedia.map((sosmed, index) => <div key={index}>{sosmed.tipe}</div>)
          )}
        </div>
      </div>
      <Button className="invisible" type="submit" />
    </Form>
  );
};

export default CMSContactForm;
