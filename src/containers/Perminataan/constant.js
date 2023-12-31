import moment from 'moment';

export const getUserInfo = (data) => [
  { data: data?.['nama'] || '', title: 'Nama Lengkap' },
  { data: data?.['employeeIdNumber'] || '', title: 'NIP/NIK' },
  { data: data?.['employeeStatus'] || '', title: 'Status Kepegawaian' },
  { data: data?.['instansiName'] || '', title: 'Instansi' },
  { data: data?.['unitKerjaName'] || '', title: 'Unit Kerja' },
];

export const getPerminataanInfo = (data) => [
  { data: data?.['deskripsi'] || '', title: 'Deskripsi Data' },
  { data: data?.['tujuanPermintaan'] || '', title: 'Tujuan Permintaan Data' },
  { data: data?.['tanggalTarget'] ? moment(data['tanggalTarget']).format('DD MMMM YYYY') : '', title: 'Target Waktu' },
  { data: data?.['instansi']?.nama || '', title: 'Produsen Data' },
  { data: data?.['jenisData'] || '', title: 'Jenis Data' },
];
export const getPerminataanInfoOfficialMemo = (data) => [
  { data: data?.['officialMemo']?.location, title: 'Surat Permintaan Data', name: data?.['officialMemo']?.fileName },
];
