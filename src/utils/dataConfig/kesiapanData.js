export const titleData = [
  'Hasil Assessment',
  'Kumpulan Dashboard',
  'COVID Vaccine Dashboard',
  'Unicode Test',
  'Sales Dashboard',
  'Video Games Sales',
  'Misc Charts',
  "World Bank's Data",
];

export const modifiedByData = ['Superset Admin', '', 'Admin', 'User', 'User Admin'];

export const modifiedData = [
  '3 jam lalu',
  '6 jam lalu',
  'kemarin',
  '2 hari lalu',
  '3 hari lalu',
  'seminggu lalu',
  'sebulan lalu',
];

export const createdByData = ['Superset Admin', 'Admin', '', 'User', 'User Admin'];

export const ownerData = ['SA', 'A', '', 'U', 'UA'];

export const statusData = ['Published', 'Draft', 'Saved', 'Waiting Approval', 'Waiting Queue'];

const getRandomIndex = () => Math.floor(Math.random() * 5);

/**
 * Generates a random row based on predefined data
 * @returns Generated row
 */
const newRow = () => {
  const dataIndex = getRandomIndex();
  return {
    title: titleData[dataIndex],
    modified: modifiedData[dataIndex],
    modifiedBy: modifiedByData[dataIndex],
    status: statusData[dataIndex],
    createdBy: createdByData[dataIndex],
    owner: ownerData[dataIndex],
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
