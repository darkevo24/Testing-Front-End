import moment from 'moment';

export const getUserInfo = (data) => [
  { data: data?.['name'] || '', title: 'Nama Lengkap' },
  { data: data?.['nip'] || '', title: 'NIP/NIK' },
  { data: data?.['status'] || '', title: 'Status Kepegawaian' },
  { data: data?.['instansi'] || '', title: 'Instansi' },
  { data: data?.['unit'] || '', title: 'Unit Kerja' },
];

export const getPerminataanInfo = (data) => [
  { data: data?.['deskripsi'] || '', title: 'Deskripsi Data' },
  { data: data?.['tujuanPermintaan'] || '', title: 'Tujuan Permintaan Data' },
  { data: data?.['tanggalTarget'] ? moment(data['tanggalTarget']).format('DD MMMM YYYY') : '', title: 'Target Waktu' },
  { data: data?.['instansi']?.nama || '', title: 'Produsen Data' },
  { data: data?.['jenisData'] || '', title: 'Jenis Data' },
];
