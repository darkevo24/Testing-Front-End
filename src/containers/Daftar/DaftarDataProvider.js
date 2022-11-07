import { Children, isValidElement, cloneElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import Notification from 'components/Notification';
import bn from 'utils/bemNames';
import { priorityOptions } from 'utils/constants';
import {
  daftarDataSubmit,
  dataVariableSubmit,
  getProduen,
  getSDGTujuan,
  getRKPpp,
  downloadDaftarData,
  produenOptionsSelector,
  tujuanSDGPillerOptionsSelector,
  rkpPPOptionsSelector,
  dafterDataWithIdSelector,
  dafterLogDataWithIdSelector,
  getDaftarDataDetailById,
  getDaftarDataDetailLog,
  getKatalogVariables,
  katalogVariableDataSelector,
  getAttribut,
  attributDinamisSelector,
} from './reducer';
import {
  dataindukOptionsSelector,
  instansiOptionsSelector,
  sdgPillerOptionsSelector,
  rkpPNOptionsSelector,
  getDatainduk,
  getInstansiData,
  getSDGPillers,
  getRKPpn,
  dataindukAllOptionsSelector,
  getAllDatainduk,
} from 'containers/App/reducer';
import { /* createFileAndDownload, fileTypes,*/ prepareFormPayload } from 'utils/helper';

const bem = bn('daftar');

const DaftarDataProvider = ({ children }) => {
  const dispatch = useDispatch();
  const produenOptions = useSelector(produenOptionsSelector);

  const dataindukAllOptions = useSelector(dataindukAllOptionsSelector);
  const dataIndukOptions = useSelector(dataindukOptionsSelector);
  const instansiOptions = useSelector(instansiOptionsSelector);
  const attributDinamis = useSelector(attributDinamisSelector);
  const sdgPillerOptions = useSelector(sdgPillerOptionsSelector);
  const rkpPNOptions = useSelector(rkpPNOptionsSelector);

  const rkpPPOptions = useSelector(rkpPPOptionsSelector);
  const tujuanSDGPillerOptions = useSelector(tujuanSDGPillerOptionsSelector);
  const dafterDataWithId = useSelector(dafterDataWithIdSelector);
  const dafterLogDataWithId = useSelector(dafterLogDataWithIdSelector);
  const katalogVariableData = useSelector(katalogVariableDataSelector);

  useEffect(() => {
    if (!instansiOptions?.length) dispatch(getInstansiData());
    if (!produenOptions?.length) dispatch(getProduen());
    if (!dataIndukOptions?.length) dispatch(getDatainduk());
    if (!dataindukAllOptions?.length) dispatch(getAllDatainduk());
    if (!sdgPillerOptions?.length) dispatch(getSDGPillers());
    if (!rkpPPOptions?.length) dispatch(getRKPpn());
    dispatch(getAttribut());
  }, []);

  const convertAtribut = () => {
    let result = [];
    let temp = [];
    for (let i = 0; i < attributDinamis?.result?.length; i++) {
      if ((i + 1) % 2 == 0) {
        temp.push(attributDinamis?.result[i]);
        result.push(temp);
        temp = [];
      } else temp.push(attributDinamis?.result[i]);
      if (i == attributDinamis.result.length - 1 && temp.length < 2 && temp.length) {
        result.push(temp);
      }
    }
    return result;
  };

  const getDafterDataById = (id) => {
    dispatch(getDaftarDataDetailById(id));
    dispatch(getDaftarDataDetailLog(id));
    dispatch(getKatalogVariables({ daftarId: id }));
  };

  const onPilarSdgChange = (pilarSDG) => {
    dispatch(getSDGTujuan(pilarSDG));
  };

  const onPnRKPChange = (pnRKP) => {
    dispatch(getRKPpp(pnRKP));
  };

  const onDownloadData = async (params) => {
    try {
      await dispatch(downloadDaftarData(params));
      // This is directly handled in the fetch response to make it worth!!
      // createFileAndDownload(downloadResponse.payload, fileTypes.excel, new Date().getTime());
    } catch (error) {
      // console.log('error: ', error);
    }
  };

  const handleDaftarFromSubmit = (data, cb, cms = false) => {
    const payload = prepareFormPayload(data, {
      dropdowns: [
        'instansi',
        'jadwalPemutakhiran',
        'kodePNRKP',
        'kodePPRKP',
        'kodePilar',
        'kodeTujuan',
        'format',
        'indukData',
        'rujukan',
      ],
      toArray: ['indukData'],
      stringify: ['rujukan', 'additionalData'],
      dates: ['tanggalDibuat', 'tanggalDiperbaharui'],
    });
    payload.format = isArray(payload.format) ? payload.format.join(', ') : payload.format;

    dispatch(daftarDataSubmit(payload)).then((res) => {
      const hasError = res?.type?.includes('rejected');
      const isEdit = !!data.id;
      if (isFunction(cb)) {
        cb(res, hasError);
      }
      if (cms) return;
      if (hasError) {
        return Notification.show({
          message: (
            <div>
              Error <span className="fw-bold">{res.error.message}</span> Data Tidak {isEdit ? 'Diperbarui' : 'Ditambahkan'}
            </div>
          ),
          icon: 'cross',
        });
      }
      Notification.show({
        type: 'secondary',
        message: (
          <div>
            Daftar <span className="fw-bold">{payload.nama}</span> Berhasil {isEdit ? 'Diperbarui' : 'Ditambahkan'}
          </div>
        ),
        icon: 'check',
      });
    });
  };
  const daftarProps = {
    bem,
    dataIndukOptions,
    instansiOptions,
    priorityOptions,
    dataVariableSubmit,
    produenOptions,
    katalogVariableData,
    sdgPillerOptions,
    tujuanSDGPillerOptions,
    dataindukAllOptions,
    attributDinamisChanged: convertAtribut(),
    dataindukEditOptions: dataindukAllOptions.filter((val) => val.value !== dafterDataWithId?.result?.id),
    rkpPNOptions,
    rkpPPOptions,
    dafterDataWithId,
    attributDinamis,
    dafterLogDataWithId,
    getDafterDataById,
    getKatalogVariables,
    onPilarSdgChange,
    onPnRKPChange,
    onDownloadData,
    handleDaftarFromSubmit,
  };

  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, daftarProps);
    }
    return child;
  });
};

export default DaftarDataProvider;
