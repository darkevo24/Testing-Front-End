import moment from 'moment';

export const titleData = [
  'Data Keadaan Iklim Rata-Rata Berau Tahun 2019-2021',
  'Data Kependudukan Desa Seburing Kecamatan Semparuk Kabupaten Sambas - 31 Dese...',
  'Kementerian Sosial',
  'Kementerian Energi dan Sumber Daya Mineral',
  'Kementerian Pekerjaan Umum dan Perumahan Rakyat',
  'Kementerian Kelautan dan Perikanan',
  'Kementerian Koperasi dan Usaha Kecil Menengah',
  'Kementerian Pemuda dan Olahraga',
  'Kementerian Koordinator Bidang Perekonomian',
];

export const descriptionData = [
  'Data Kependudukan Desa Seburing Kecamatan Semparuk Kabupaten Sambas Pada Periode Semester 2 Tahun 2020 Sumber : Direktorat Jenderal Kependudukan dan Pencatatan Sipil, Kemendagri RI',
  'Data Kependudukan Desa Seburing Kecamatan Semparuk Kabupaten Sambas Pada Periode Semester 2 Tahun 2020 Sumber : Direktorat Jenderal Kependudukan dan Pencatatan Sipil, Kemendagri RI',
];

export const formatData = ['csv', 'xlsx', 'json', 'xml'];

const getRandomIndex = () => Math.floor(Math.random() * 2);

/**
 * Generates a random row based on predefined data
 * @returns Generated row
 */
const newRow = () => {
  const dataIndex = getRandomIndex();
  return {
    title: titleData[dataIndex],
    description: descriptionData[dataIndex],
    tags: formatData,
    link: 'https://umkm.depkop.go.id',
    linkTitle: 'Pemerintah Kabupaten Banjar Negara',
    date: moment().format('DD MMMM YYYY'),
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
