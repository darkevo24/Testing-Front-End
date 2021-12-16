export const idData = ['PD00001', 'PD00002', 'PD00003', 'PD00004', 'PD00005'];

export const namaPemintaData = ['Moehammad Ramadhoni', 'Ibrahim Hanifa', 'Sugeng Rawu', 'Ngatiyem Ngadiman', 'Asep Surasep'];

export const instansiData = ['Bappenas', 'Delta', 'Data', 'Mandiri', 'SDI'];

export const unitKerjaData = ['SDI', 'SDI2', 'SDI3', 'SDI4', 'SDI5'];

export const deskripsiData = [
  'Data Penduduk DKI Jakarta',
  'Data Penduduk Tangerang',
  'Data Penduduk Bogor',
  'Data Penduduk Bandung',
  'Data Penduduk Bekasi',
];

export const targetWaktuData = ['24/04/2018', '16/08/2005', '09/11/2019', '12/01/2011', '30/08/2017'];

export const produsenData = [
  'Kementrian Dalam Negeri',
  'BAPPENAS',
  'Kementrian Keuangan',
  'Kementrian Luar Negeri',
  'Kementrian BUMN',
];

export const tipeData = ['Statistik', 'Keuangan', 'Special', 'Lainnya', 'Kualitatif'];

export const tanggalPermintaanData = ['24/04/2018', '16/08/2005', '09/11/2019', '12/01/2011', '30/08/2017'];

export const statusData = ['Terkirim', 'Diproses', 'Selesai', 'Ditolak', 'Draft'];

export const tujuanPermintaanData = [
  'Untuk mengetahui data covid',
  'Untuk mengetahui data pelanggan',
  'Untuk mengetahui data penduduk',
  'Untuk mengetahui data yang tidak ada',
  'Untuk mengetahui data perkembangan terkini',
];

export const urlData = [
  'https://data.go.id/data',
  'https://data.go.id/data/dataset',
  'https://data.go.id/data/dataset/data',
  'https://data.go.id/data/dataset/vaksin',
  'https://data.go.id/data/dataset/penduduk',
];

const getRandomIndex = () => Math.floor(Math.random() * 5);

/**
 * Generates a random row based on predefined data
 * @returns Generated row
 */
const newRow = () => {
  const dataindex = getRandomIndex();
  return {
    idData: idData[dataindex],
    namaPeminta: namaPemintaData[dataindex],
    instansi: instansiData[dataindex],
    unitKerja: unitKerjaData[dataindex],
    deskripsi: deskripsiData[dataindex],
    targetWaktu: targetWaktuData[dataindex],
    tipe: tipeData[dataindex],
    tanggalPermintaan: tanggalPermintaanData[dataindex],
    produsen: produsenData[dataindex],
    tujuanPermintaan: tujuanPermintaanData[dataindex],
    status: statusData[dataindex],
  };
};

/**
 *
 * @param {Number} length - Length of the data to be generated
 * @returns - Random data generated based on designs
 */
export function makeData(length) {
  const records = Array.from({ length });
  return records.map(newRow);
}
