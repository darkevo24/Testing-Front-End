import moment from 'moment';

export const prefixID = (id) => {
  if (id < 10) return `PD0000${id}`;
  else if (id < 100) return `PD000${id}`;
  else if (id < 1000) return `PD00${id}`;
  else if (id < 10000) return `PD0${id}`;
  else return `PD${id}`;
};

export const getClass = (status) => {
  switch (status) {
    case 'draft':
      return {
        divBG: 'bg-gray',
        textColor: 'sdp-text-disable',
        text: 'Dibuat',
        divText: 'Draft',
      };
    case 'diproses':
      return {
        divBG: 'bg-orange-light',
        textColor: 'sdp-text-orange-dark',
        text: 'Diprosses',
        divText: 'Permintaan sedang Diproses',
      };
    case 'ditolak':
      return {
        divBG: 'bg-red-light',
        textColor: 'sdp-text-red',
        text: 'Ditolak',
        divText: 'Ditolak',
      };
    case 'terkirim':
      return {
        divBG: 'bg-purple-light',
        textColor: 'sdp-text-purple',
        text: 'Terkirim',
        divText: 'Terkirim',
      };
    case 'selesai':
      return {
        divBG: 'bg-green-light',
        textColor: 'sdp-text-green-light',
        text: 'Disetujui',
        divText: 'Selesai',
      };
    default:
      return {};
  }
};

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
  { data: data?.['producen'] || '', title: 'Produsen Data' },
  { data: data?.['jenisData'] || '', title: 'Jenis Data' },
];
