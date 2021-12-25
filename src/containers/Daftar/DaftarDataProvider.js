import { Children, isValidElement, cloneElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import Notification from 'components/Notification';
import bn from 'utils/bemNames';
import { priorityOptions } from 'utils/constants';
import {
  daftarDataSubmit,
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
} from 'containers/App/reducer';
import { /* createFileAndDownload, fileTypes,*/ prepareFormPayload } from 'utils/helper';

const bem = bn('daftar');

const DaftarDataProvider = ({ children }) => {
  const dispatch = useDispatch();
  const produenOptions = useSelector(produenOptionsSelector);

  const dataindukOptions = useSelector(dataindukOptionsSelector);
  const instansiOptions = useSelector(instansiOptionsSelector);
  const sdgPillerOptions = useSelector(sdgPillerOptionsSelector);
  const rkpPNOptions = useSelector(rkpPNOptionsSelector);

  const rkpPPOptions = useSelector(rkpPPOptionsSelector);
  const tujuanSDGPillerOptions = useSelector(tujuanSDGPillerOptionsSelector);
  const dafterDataWithId = useSelector(dafterDataWithIdSelector);
  const dafterLogDataWithId = useSelector(dafterLogDataWithIdSelector);

  useEffect(() => {
    if (!instansiOptions?.length) dispatch(getInstansiData());
    if (!produenOptions?.length) dispatch(getProduen());
    if (!dataindukOptions?.length) dispatch(getDatainduk());
    if (!sdgPillerOptions?.length) dispatch(getSDGPillers());
    if (!rkpPPOptions?.length) dispatch(getRKPpn());
  }, []);

  const getDafterDataById = (id) => {
    dispatch(getDaftarDataDetailById(id));
    dispatch(getDaftarDataDetailLog(id));
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
      ],
      toArray: ['indukData'],
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
    dataindukOptions,
    instansiOptions,
    priorityOptions,
    produenOptions,
    sdgPillerOptions,
    tujuanSDGPillerOptions,
    rkpPNOptions,
    rkpPPOptions,
    dafterDataWithId,
    dafterLogDataWithId,
    getDafterDataById,
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
