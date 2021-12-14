import { Children, isValidElement, cloneElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isFunction from 'lodash/isFunction';
import Notification from 'components/Notification';
import bn from 'utils/bemNames';
import { priorityOptions } from 'utils/constants';
import {
  addDaftarData,
  getProduen,
  getSDGTujuan,
  getRKPpp,
  produenOptionsSelector,
  tujuanSDGPillerOptionsSelector,
  rkpPPOptionsSelector,
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
import { prepareFormPayload } from 'utils/helper';

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

  useEffect(() => {
    dispatch(getInstansiData());
    dispatch(getProduen());
    dispatch(getDatainduk());
    dispatch(getSDGPillers());
    dispatch(getRKPpn());
  }, []);

  const onPilarSdgChange = (pilarSDG) => {
    dispatch(getSDGTujuan(pilarSDG));
  };

  const onPnRKPChange = (pnRKP) => {
    dispatch(getRKPpp(pnRKP));
  };

  const handleTambahFromSubmit = (data, cb) => {
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

    dispatch(addDaftarData(payload)).then((res) => {
      if (isFunction(cb)) {
        cb(res);
      }
      const hasError = res.type.includes('rejected');
      if (hasError) {
        Notification.show({
          message: (
            <div>
              Error <span className="fw-bold">{res.error.message}</span> Data Tidak Ditambahkan
            </div>
          ),
          icon: 'cross',
        });
        return;
      }
      Notification.show({
        type: 'secondary',
        message: (
          <div>
            Daftar <span className="fw-bold">{payload.nama}</span> Berhasil Ditambahkan
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
    onPilarSdgChange,
    onPnRKPChange,
    handleTambahFromSubmit,
  };

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, daftarProps);
    }
    return child;
  });

  return childrenWithProps;
};

export default DaftarDataProvider;
