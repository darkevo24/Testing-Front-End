const instansiData = [
  'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
  'Kementerian Pertanian',
  'Kebudayaan',
  'Riset',
  'Dan Teknologi',
];

const nameData = [
  'Pendidikan Kecakapan Kerja Unggulan (PKKU)',
  'Rencana Definitif Kebutuhan Kelompok (E-RDKK)',
  'Calon Petani Calon Lapangan (CPCL)',
  'Calon Petani Calon Lapangan (CPCL) sub Sektor Perkebunan,',
  'Lahan Pertanian Pangan Berkelanjutan (LP2B)',
];

const konsepData = ['PKKU', 'RDKK', 'CPCL', 'CPCL sub Sektor Perkebunan', 'LP2B'];

const definisiData = [
  'Pendidikan Kecakapan Kerja unggulan (PKKU) adalah program layanan pendidikan dan pelatihan berorie',
  'RDKK merupakan alat perumusan untuk memenuhi kebutuhan sarana produksi dan alat mesin pertanian, baik yang berdasarkan kredit/permodalan usahatani bagi anggota poktan yang memerlukan maupun dari swadana petani',
  'CPCL adalah calon petani penerima bantuan dan calon lokasi lahan yang akan menerima bantuan pemerintah',
  'Pendidikan Kecakapan Kerja unggulan (PKKU) adalah program layanan pendidikan dan pelatihan berorie',
  'Lahan Pertanian Pangan Berkelanjutan adalah bidang lahan pertanian yang ditetapkan untuk dilindungi dan dikembangkan secara konsisten guna menghasilkan pangan pokok bagi kemandirian, ketahanan, dan kedaulatan pangan nasional',
];

const sumberData = [
  'Petunjuk Teknis Pendidikan Kecapaan Kerja Unggulan (PKKU) dan Pendidikan Kecakapan Kewirausa',
  'Peraturan Menteri Pertanian Nomor 82/Permentan/OT.140/8/2013',
  'Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Hasil Tanaman Pangan Tahun Anggaran 2020',
  'Petunjuk Teknis Pendidikan Kecapaan Kerja Unggulan (PKKU) dan Pendidikan Kecakapan Kewirausa',
  'Peraturan Bupati Agam Nomor 12 Tahun 2020 tentang Perlindungan Lahan Pertanian Pangan Berkelanjutan',
];

const jadwalData = ['Tahunan', 'Harian', 'Tahunan', 'Harian', 'Tahunan'];

const dibuatData = ['24/04/2018', '16/08/2005', '09/11/2019', '12/01/2011', '30/08/2017'];
const diperData = ['14/08/2021', '24/02/2015', '13/12/2020', '22/04/2016', '05/00/2019'];
const produsenData = [
  'Direktorat Jendral Pendidikan & Kebudayaan',
  'Direktorat Jenderal Prasarana dan Sarana Pertanian',
  'Direktorat Jenderal Tanaman Pangan',
  'Direktorat Jenderal Prasarana dan Sarana Pertanian',
  'Direktorat Jenderal Tanaman Pangan',
];

const formatData = ['csv;xlsx;', 'xlsx;', 'text;plain;'];

const getRandomIndex = () => Math.floor(Math.random() * instansiData.length);

/**
 * Generates a random row based on predefined data
 * @returns Generated row
 */
const newRow = () => {
  const dataIndex = getRandomIndex();
  return {
    instansi: instansiData[dataIndex],
    name: nameData[dataIndex],
    konsep: konsepData[dataIndex],
    definisi: definisiData[dataIndex],
    sumber: sumberData[dataIndex],
    jadwal: jadwalData[dataIndex],
    dibuat: dibuatData[dataIndex],
    diper: diperData[dataIndex],
    produsen: produsenData[dataIndex],
    format: formatData[dataIndex],
    link: 'https://umkm.depkop.go.id',
  };
};

/**
 *
 * @param {Number} length - Length of the data to be generated
 * @returns - Random data generated based on designs
 */
export default function makeData(length) {
  const records = Array.from({ length });
  return records.map(newRow);
}
