import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { DatePicker, Dropdown, Input } from 'components';
import { jadwalPermutakhiranOptions, formatOptions } from 'utils/constants';
import { dateTransform, submitForm, findOption } from 'utils/helper';
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
    idKonsep: yup.string().required(),
    konsep: yup.string().required(),
    definisi: yup.string().required(),
    sumberDefinisi: yup.string().required(),
    jadwalPemutakhiran: yup.mixed().required(),
    tanggalDibuat: yup.date().required().transform(dateTransform),
    tanggalDiperbaharui: yup.date().required().transform(dateTransform),
    produsenData: yup.string().required(),
    indukData: yup.mixed().required(),
    format: yup.mixed().required(),
    linkAkses: yup.string().required(),
    kodePilar: yup.mixed().required(),
    kodeTujuan: yup.mixed().required(),
    kodePNRKP: yup.mixed().required(),
    kodePPRKP: yup.mixed().required(),
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
  const dispatch = useDispatch();
  const tujuanSDGPillerOptions = useSelector(addTujuanSDGPillerOptionsSelector);
  const rkpPPOptions = useSelector(addRkpPPOptionsSelector);

  const isEdit = !isEmpty(data);
  const daftar = cloneDeep(data || {});
  if (isEdit) {
    daftar.instansi = findOption(instansiOptions, daftar.intansiId);
    daftar.jadwalPemutakhiran = findOption(jadwalPermutakhiranOptions, daftar.jadwalPemutakhiran);
    daftar.indukData = findOption(dataindukOptions, daftar.indukData);
    daftar.format = findOption(formatOptions, daftar.format);
    daftar.kodePilar = findOption(sdgPillerOptions, daftar.kodePilar);
    daftar.kodeTujuan = findOption(tujuanSDGPillerOptions, daftar.kodeTujuan);
    daftar.kodePNRKP = findOption(rkpPNOptions, daftar.kodePNRKP);
    daftar.kodePPRKP = findOption(rkpPPOptions, daftar.kodePPRKP);
  }
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...daftar },
  });

  const watchKodePilar = watch('kodePilar', false);
  const watchKodePNRKP = watch('kodePNRKP', false);

  useEffect(() => {
    if (watchKodePilar?.value) {
      dispatch(getAddDaftarSDGTujuan(watchKodePilar.value));
    }
  }, [watchKodePilar]);

  useEffect(() => {
    if (watchKodePNRKP?.value) {
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
            error={errors.sumberDefinisi?.message}
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
            error={errors.tanggalDibuat?.message}
          />
          <DatePicker
            group
            label="Diperbarui"
            name="tanggalDiperbaharui"
            control={control}
            rules={{ required: true }}
            error={errors.tanggalDiperbaharui?.message}
          />
          <Input
            group
            label="Produsen Data"
            name="produsenData"
            control={control}
            rules={{ required: true }}
            error={errors.produsenData?.message}
          />
          <Dropdown
            group
            label="Data Induk"
            name="indukData"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={dataindukOptions}
            error={errors.indukData?.message}
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
            error={errors.linkAkses?.message}
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
            error={errors.kodePilar?.message}
          />
          <Dropdown
            group
            label="Tujuan SDGs"
            name="kodeTujuan"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={tujuanSDGPillerOptions}
            error={errors.kodeTujuan?.message}
          />
          <Dropdown
            group
            label="PN RKP"
            name="kodePNRKP"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={rkpPNOptions}
            error={errors.kodePNRKP?.message}
          />
          <Dropdown
            group
            label="PP RKP"
            name="kodePPRKP"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={rkpPPOptions}
            error={errors.kodePPRKP?.message}
          />
          <Button className="invisible" type="submit" />
        </Form>
      </Row>
    </div>
  );
};

export default DaftarForm;
