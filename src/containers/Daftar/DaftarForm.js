import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import RBDropdown from 'react-bootstrap/Dropdown';
import RBDropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { DatePicker, Dropdown, Input, RequiredFilledLabel } from 'components';
import { jadwalPermutakhiranOptions, formatOptions } from 'utils/constants';
import { /*dateTransform,*/ emptyOptionPad, submitForm, findOption } from 'utils/helper';
import {
  daftarDetailsDataSelector,
  getDaftarDetail,
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
    jadwalPemutakhiran: yup.mixed().required(),
    produsenData: yup.string().required(),
    format: yup.mixed().required(),
    linkAkses: yup.string().required(),
  })
  .required();

const DaftarForm = ({
  daftarId,
  onSubmit,
  userInstansi,
  dataindukAllOptions = [],
  instansiOptions = [],
  sdgPillerOptions = [],
  rkpPNOptions = [],
  attributDinamis,
}) => {
  const dispatch = useDispatch();
  const tujuanSDGPillerOptions = useSelector(addTujuanSDGPillerOptionsSelector);
  const rkpPPOptions = useSelector(addRkpPPOptionsSelector);
  const daftarDetails = useSelector(daftarDetailsDataSelector);
  const storeDaftar = daftarDetails?.result[daftarId];
  const [dataDinamis, setDataDinamis] = useState({});

  useEffect(() => {
    if (daftarId && !storeDaftar) {
      dispatch(getDaftarDetail(daftarId));
    }
  }, [daftarId]);
  const isEdit = !isEmpty(storeDaftar);
  const daftar = cloneDeep(storeDaftar || {});
  daftar.instansi = findOption(instansiOptions, userInstansi?.id);
  if (isEdit) {
    daftar.jadwalPemutakhiran = findOption(jadwalPermutakhiranOptions, daftar.jadwalPemutakhiran);
    daftar.indukData = findOption(dataindukAllOptions, daftar.indukData);
    daftar.format = findOption(formatOptions, daftar.format ? daftar.format.split(', ') : daftar.format);
    daftar.kodePilar = findOption(sdgPillerOptions, daftar.kodePilar);
    daftar.kodeTujuan = findOption(tujuanSDGPillerOptions, daftar.kodeTujuan);
    daftar.kodePNRKP = findOption(rkpPNOptions, daftar.kodePNRKP);
    daftar.kodePPRKP = findOption(rkpPPOptions, daftar.kodePPRKP);
    daftar.tanggalDibuat = new Date(daftar.tanggalDibuat);
    daftar.tanggalDiperbaharui = new Date(daftar.tanggalDibuat);
    daftar.rujukan = findOption(dataindukAllOptions, daftar.rujukan ? JSON.parse(daftar.rujukan) : daftar.rujukan);
  }

  useEffect(() => {
    const daftarAdditionalData = storeDaftar && JSON?.parse(daftar.additionalData);
    const obj = attributDinamis?.result?.reduce(
      (obj, item) =>
        Object.assign(obj, {
          [item.name]: daftarAdditionalData?.filter((elm) => elm.key === item.name)[0].value || '',
        }),
      {},
    );
    setDataDinamis(obj);
  }, [attributDinamis, daftarDetails]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...daftar },
  });
  const handleSubmitData = (daftarFormData) => {
    const arr = [];
    attributDinamis?.result?.forEach((elm) => {
      arr.push({
        key: elm.name,
        value: typeof dataDinamis[elm.name] == 'object' ? dataDinamis[elm.name].value : dataDinamis[elm.name],
      });
    });
    daftarFormData['additionalData'] = [...arr];
    onSubmit(daftarFormData);
  };

  const watchKodePilar = watch('kodePilar', false);
  const watchKodePNRKP = watch('kodePNRKP', false);

  useEffect(() => {
    dispatch(getAddDaftarSDGTujuan(watchKodePilar?.value));
  }, [watchKodePilar]);

  useEffect(() => {
    dispatch(getAddDaftarRKPpp(watchKodePNRKP?.value));
  }, [watchKodePNRKP]);

  useEffect(() => {
    reset(daftar);
  }, [storeDaftar]);

  const optionDropdown = (options) => {
    const result = [];
    options.forEach((item) => {
      result.push({ label: item, value: item });
    });
    return result;
  };

  const handleChangeAttributDinamis = (value, name) => {
    setDataDinamis((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const ppOption = findOption(rkpPPOptions, get(daftar, 'kodePPRKP.value', daftar.kodePPRKP));
    if (daftar.kodePPRKP && ppOption) {
      setValue('kodePPRKP', ppOption);
    }
  }, [rkpPPOptions]);

  useEffect(() => {
    const tujuanOption = findOption(tujuanSDGPillerOptions, get(daftar, 'kodeTujuan.value', daftar.kodeTujuan));
    if (daftar.kodeTujuan && tujuanOption) {
      setValue('kodeTujuan', tujuanOption);
    }
  }, [tujuanSDGPillerOptions]);

  return (
    <div className="daftar-form">
      <Row>
        <Form id={daftarFormId} onSubmit={handleSubmit(handleSubmitData)} noValidate>
          <Dropdown
            group
            label={<RequiredFilledLabel label={'Instansi'} />}
            name="instansi"
            control={control}
            disabled
            rules={{ required: true }}
            placeholder="Select"
            options={instansiOptions}
            error={errors.instansi?.message}
          />
          <Input
            group
            label={<RequiredFilledLabel label={'Nama Data'} />}
            name="nama"
            control={control}
            rules={{ required: true }}
            error={errors.nama?.message}
          />
          <Input
            group
            label={<RequiredFilledLabel label={'ID Konsep'} />}
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
            rules={{ required: false }}
            error={errors.konsep?.message}
          />
          <Input
            group
            label={<RequiredFilledLabel label={'Definisi'} />}
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
            rules={{ required: false }}
            error={errors.sumberDefinisi?.message}
          />
          <Dropdown
            group
            label={<RequiredFilledLabel label={'Jadwal Pemutakhiran'} />}
            name="jadwalPemutakhiran"
            control={control}
            rules={{ required: true }}
            placeholder="Select"
            options={jadwalPermutakhiranOptions}
            error={errors.jadwalPemutakhiran?.message}
          />
          <DatePicker
            group
            label={<RequiredFilledLabel label={'Dibuat'} />}
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
            rules={{ required: false }}
            error={errors.tanggalDiperbaharui?.message}
          />
          <Input
            group
            label={<RequiredFilledLabel label={'Produsen Data'} />}
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
            rules={{ required: false }}
            placeholder="Select"
            options={emptyOptionPad(dataindukAllOptions)}
            error={errors.indukData?.message}
          />
          <Dropdown
            group
            label={<RequiredFilledLabel label={'Format'} />}
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
            label={<RequiredFilledLabel label={'Link Akses'} />}
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
            rules={{ required: false }}
            placeholder="Select"
            options={emptyOptionPad(sdgPillerOptions)}
            error={errors.kodePilar?.message}
          />
          <Dropdown
            group
            label="Tujuan SDGs"
            name="kodeTujuan"
            control={control}
            rules={{ required: false }}
            placeholder="Select"
            options={emptyOptionPad(tujuanSDGPillerOptions)}
            error={errors.kodeTujuan?.message}
          />
          <Dropdown
            group
            label="PN RKP"
            name="kodePNRKP"
            control={control}
            rules={{ required: false }}
            placeholder="Select"
            options={emptyOptionPad(rkpPNOptions)}
            error={errors.kodePNRKP?.message}
          />
          <Dropdown
            group
            label="PP RKP"
            name="kodePPRKP"
            control={control}
            rules={{ required: false }}
            placeholder="Select"
            options={emptyOptionPad(rkpPPOptions)}
            error={errors.kodePPRKP?.message}
          />
          <Dropdown
            group
            label="Rujukan"
            name="rujukan"
            multi
            control={control}
            rules={{ required: false }}
            placeholder="Select"
            options={emptyOptionPad(dataindukAllOptions)}
            error={errors.rujukan?.message}
          />
          {attributDinamis?.result?.map((attr) =>
            attr.type === 'dropdown' ? (
              <Form.Group className="mb-3">
                <Form.Label>{attr.name}</Form.Label>
                <RBDropdownButton title={dataDinamis[attr?.name] || 'Select'} variant="secondary">
                  {emptyOptionPad(optionDropdown(JSON?.parse(attr.dropdownContent))).map((option, index) => (
                    <RBDropdown.Item
                      key={`${index}-${option.value}`}
                      onClick={(e) => handleChangeAttributDinamis(option.value, attr.name)}
                      active={dataDinamis[attr.name] === option.value}>
                      {option.label}
                    </RBDropdown.Item>
                  ))}
                </RBDropdownButton>
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>{attr.name}</Form.Label>
                <div className="sdp-input-main-container">
                  <InputGroup className="sdp-input-wrapper">
                    <Form.Control
                      as={attr.type === 'textarea' ? 'textarea' : 'input'}
                      onChange={(e) => handleChangeAttributDinamis(e.target.value, attr.name)}
                      type={attr.type}
                      value={dataDinamis ? dataDinamis[attr?.name] : ''}
                    />
                  </InputGroup>
                </div>
              </Form.Group>
            ),
          )}
          <Button className="invisible" type="submit" />
        </Form>
      </Row>
    </div>
  );
};

export default DaftarForm;
