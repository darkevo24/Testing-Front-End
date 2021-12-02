export const instansiData = [
  'Kementrian Pertanian',
  'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
  'Kementerian Sosial',
  'Kementerian Energi dan Sumber Daya Mineral',
  'Kementerian Pekerjaan Umum dan Perumahan Rakyat',
  'Kementerian Kelautan dan Perikanan',
  'Kementerian Koperasi dan Usaha Kecil Menengah',
  'Kementerian Pemuda dan Olahraga',
  'Kementerian Koordinator Bidang Perekonomian',
];

export const nameData = [
  'Pendidikan Kecakapan Kerja Unggulan (PKKU)',
  'Rencana Definitif Kebutuhan Kelompok (E-RDKK)',
  'Calon Petani Calon Lapangan (CPCL)',
  'Calon Petani Calon Lapangan (CPCL) sub Sektor Perkebunan,',
  'Lahan Pertanian Pangan Berkelanjutan (LP2B)',
];

export const konsepData = ['PKKU', 'RDKK', 'CPCL', 'CPCL sub Sektor Perkebunan', 'LP2B'];

export const definisiData = [
  'Pendidikan Kecakapan Kerja unggulan (PKKU) adalah program layanan pendidikan dan pelatihan berorie',
  'RDKK merupakan alat perumusan untuk memenuhi kebutuhan sarana produksi dan alat mesin pertanian, baik yang berdasarkan kredit/permodalan usahatani bagi anggota poktan yang memerlukan maupun dari swadana petani',
  'CPCL adalah calon petani penerima bantuan dan calon lokasi lahan yang akan menerima bantuan pemerintah',
  'Pendidikan Kecakapan Kerja unggulan (PKKU) adalah program layanan pendidikan dan pelatihan berorie',
  'Lahan Pertanian Pangan Berkelanjutan adalah bidang lahan pertanian yang ditetapkan untuk dilindungi dan dikembangkan secara konsisten guna menghasilkan pangan pokok bagi kemandirian, ketahanan, dan kedaulatan pangan nasional',
];

export const sumberData = [
  'Petunjuk Teknis Pendidikan Kecapaan Kerja Unggulan (PKKU) dan Pendidikan Kecakapan Kewirausa',
  'Peraturan Menteri Pertanian Nomor 82/Permentan/OT.140/8/2013',
  'Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Hasil Tanaman Pangan Tahun Anggaran 2020',
  'Petunjuk Teknis Pendidikan Kecapaan Kerja Unggulan (PKKU) dan Pendidikan Kecakapan Kewirausa',
  'Peraturan Bupati Agam Nomor 12 Tahun 2020 tentang Perlindungan Lahan Pertanian Pangan Berkelanjutan',
];

export const jadwalData = [
  'Harian',
  'Mingguan',
  'Bulanan',
  'Triwulanan',
  'Empat Bulanan',
  'Semesteran',
  'Tahunan',
  'Dua Tahunan',
  'Ad - hoc',
];

export const dibuatData = ['24/04/2018', '16/08/2005', '09/11/2019', '12/01/2011', '30/08/2017'];
export const diperData = ['14/08/2021', '24/02/2015', '13/12/2020', '22/04/2016', '05/10/2019'];
export const produsenData = [
  'Direktorat Jendral Pendidikan & Kebudayaan',
  'Direktorat Jenderal Prasarana dan Sarana Pertanian',
  'Direktorat Jenderal Tanaman Pangan',
  'Direktorat Jenderal Prasarana dan Sarana Pertanian',
  'Direktorat Jenderal Tanaman Pangan',
];

export const indukData = ['PKKU; RDKK;CPCL', 'PKKU; RDKK;CPCL', 'PKKU; RDKK;CPCL', 'PKKU; RDKK;CPCL', 'PKKU; RDKK;CPCL'];

export const formatData = ['csv', 'xlsx', 'pdf', 'png/jpg/jpeg', 'docx', 'json', 'xml'];

export const instansiFilterData = [
  {
    value: 'Kementerian Kesehatan Republik Indonesia',
    label: 'Kementerian Kesehatan Republik Indonesia',
    icon: 'https://freesvg.org/img/1636985147low-poly-pink-background.png',
  },
  {
    value: 'Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia',
    label: 'Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia',
    icon: '',
  },
  {
    value: 'Kementerian Kesehatan Republik Indonesia 1',
    label: 'Kementerian Kesehatan Republik Indonesia 1',
    icon: 'https://freesvg.org/img/1636985147low-poly-pink-background.png',
  },
  {
    value: 'Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia 2',
    label: 'Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia 2',
    icon: '',
  },
];

const getRandomIndex = () => Math.floor(Math.random() * 5);

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
    label: ['SDGs', 'RKP'],
    status: dataIndex % 2 === 0 ? 'active' : 'inactive',
    produsen: produsenData[dataIndex],
    induk: indukData[dataIndex],
    format: formatData[dataIndex],
    link: 'https://umkm.depkop.go.id',
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
