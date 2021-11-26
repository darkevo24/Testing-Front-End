export const nameData = ['ID UMKM', 'ID UMKM', 'ID UMKM'];

export const konsepData = ['1234567890', '1234567890', '1234567890'];

export const definisiData = [
  'Koden Unik yang digunakan untuk membedakan antar UMKM',
  'CPCL adalah calon petani penerima bantuan dan calon lokasi lahan yang akan menerima bantuan pemerintah',
  'Pendidikan Kecakapan Kerja unggulan (PKKU) adalah program layanan pendidikan dan pelatihan berorie',
];

export const pengaturanData = ['Terbuka', 'Terbuka', 'Terbuka'];
export const codeData = ['Ya', 'Tidak', 'Tidak'];

const getRandomIndex = () => Math.floor(Math.random() * 3);

/**
 * Generates a random row based on predefined data
 * @returns Generated row
 */
const newRow = () => {
  const dataIndex = getRandomIndex();
  return {
    name: nameData[dataIndex],
    'id-konsep': konsepData[dataIndex],
    konsep: 'ID',
    definisi: definisiData[dataIndex],
    pengaturan: pengaturanData[dataIndex],
    code: codeData[dataIndex],
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
