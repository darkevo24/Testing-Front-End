import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker, Dropdown, Input } from 'components';
import { jadwalPermutakhiranOptions, formatOptions } from 'utils/constants';
import { submitForm } from 'utils/helper';
import {
  getAddDaftarSDGTujuan,
  getAddDaftarRKPpp,
  addTujuanSDGPillerOptionsSelector,
  addRkpPPOptionsSelector,
} from './reducer';

export const daftarFormId = 'daftar-form-id';
export const submitDaftarForm = submitForm(daftarFormId);
const schema = yup
  .object({
    instansi: yup.mixed().required(),
    nama: yup.string().required(),
    konsep: yup.string().required(),
    definisi: yup.string().required(),
    sumberDefinisi: yup.string().required(),
    jadwalPemutakhiran: yup.mixed().required(),
    tanggalDibuat: yup.date().required(),
    tanggalDiperbaharui: yup.date().required(),
    produsenData: yup.string().required(),
    indukData: yup.mixed().required(),
    format: yup.mixed().required(),
    linkAkses: yup.string().required(),
  })
  .required();

const DaftarForm = ({
  data,
  onSubmit,
  dataindukOptions = [],
  instansiOptions = [],
  sdgPillerOptions = [],
  rkpPNOptions = [],
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });
  const dispatch = useDispatch();

  const tujuanSDGPillerOptions = useSelector(addTujuanSDGPillerOptionsSelector);
  const rkpPPOptions = useSelector(addRkpPPOptionsSelector);

  const watchKodePilar = watch('kodePilar', false);
  const watchKodePNRKP = watch('kodePNRKP', false);

  useEffect(() => {
    if (watchKodePilar) {
      dispatch(getAddDaftarSDGTujuan(watchKodePilar.value));
    }
  }, [watchKodePilar]);

  useEffect(() => {
    if (watchKodePNRKP) {
      dispatch(getAddDaftarRKPpp(watchKodePNRKP.value));
    }
  }, [watchKodePNRKP]);
  return (
    <div className="daftar-form">
      <Row>
        <Form id={daftarFormId} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Dropdown
            group
            label="Instansi"
            name="instansi"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={instansiOptions}
            error={errors.instansi?.message}
          />
          <Input
            group
            label="Name Data"
            name="nama"
            control={control}
            rules={{ required: true }}
            error={errors.name?.message}
          />
          <Input
            group
            label="ID Konsep"
            name="idKonsep"
            control={control}
            rules={{ required: true }}
            error={errors.idKonsep?.message}
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
            name="sumberDefinisi"
            control={control}
            rules={{ required: true }}
            error={errors.sumber?.message}
          />
          <Dropdown
            group
            label="Jadwal Pemutakhiran"
            name="jadwalPemutakhiran"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={jadwalPermutakhiranOptions}
            error={errors.jadwal?.message}
          />
          <DatePicker
            group
            label="Dibuat"
            name="tanggalDibuat"
            control={control}
            rules={{ required: true }}
            error={errors.dibuat?.message}
          />
          <DatePicker
            group
            label="Diperbarui"
            name="tanggalDiperbaharui"
            control={control}
            rules={{ required: true }}
            error={errors.diper?.message}
          />
          <Input
            group
            label="Produsen Data"
            name="produsenData"
            control={control}
            rules={{ required: true }}
            error={errors.produsen?.message}
          />
          <Dropdown
            group
            label="Data Induk"
            name="indukData"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={dataindukOptions}
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
            options={formatOptions}
            error={errors.format?.message}
          />
          <Input
            group
            label="Link Akses"
            name="linkAkses"
            isLink
            control={control}
            rules={{ required: true }}
            error={errors.link?.message}
            leftIconClass="border-right-0"
            rightIconClass="cursor-pointer"
            className="border-left-0"
          />
          <Dropdown
            group
            label="Pilar SDGs"
            name="kodePilar"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={sdgPillerOptions}
            error={errors.pilarSDGs?.message}
          />
          <Dropdown
            group
            label="Tujuan SDGs"
            name="kodeTujuan"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={tujuanSDGPillerOptions}
            error={errors.tujuanSDGs?.message}
          />
          <Dropdown
            group
            label="PN RKP"
            name="kodePNRKP"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={rkpPNOptions}
            error={errors.pnRKP?.message}
          />
          <Dropdown
            group
            label="PP RKP"
            name="kodePPRKP"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={rkpPPOptions}
            error={errors.ppRKP?.message}
          />
          <Button className="invisible" type="submit" />
        </Form>
      </Row>
    </div>
  );
};

export default DaftarForm;
