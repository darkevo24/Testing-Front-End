import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import map from 'lodash/map';
import ColumnData from 'components/ColumnData';
import Loader from 'components/Loader';
import { daftarDetailsDataSelector, getDaftarDetail } from './reducer';

export function DaftarPopoverContent({ daftarId }) {
  const dispatch = useDispatch();
  const daftarDetails = useSelector(daftarDetailsDataSelector);
  const daftar = daftarDetails?.result[daftarId];
  useEffect(() => {
    if (daftarId && !daftar) {
      dispatch(getDaftarDetail(daftarId));
    }
  }, [daftarId]);
  const items = [
    { label: 'ID Konsep', value: get(daftar, 'idKonsep', '-') },
    { label: 'KONSEP', value: get(daftar, 'konsep', '-') },
    {
      label: 'DEFINISI',
      value: get(daftar, 'definisi', '-'),
    },
    {
      label: 'sumber definisi',
      value: get(daftar, 'sumberDefinisi', '-'),
    },
    { label: 'dATA INDUK', value: map(get(daftar, 'indukData'), (value) => value).join('; ') || '-' },
    { label: 'fORMAT', value: get(daftar, 'format', '-') },
    { label: 'LINK AKSES', value: get(daftar, 'linkAkses', '-'), variant: 'link' },
    { label: 'PILAR SDGS', value: get(daftar, 'kodePilarDeskripsi', '-') },
    { label: 'Tujuan sdgs', value: get(daftar, 'kodeTujuanDeskripsi', '-') },
    { label: 'PN RKP', value: get(daftar, 'kodePNTKPDeskripsi', '-') },
    { label: 'PP RKP', value: get(daftar, 'kodePPRKPDeskripsi', '-') },
    { label: 'PRIORITAS', value: 'Ya' },
  ];
  if (daftarDetails.loading) {
    return <Loader />;
  }
  return <ColumnData items={items} />;
}

export default DaftarPopoverContent;
