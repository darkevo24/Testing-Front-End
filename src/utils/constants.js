import {
  PertahananSvg,
  PembangunanSvg,
  Bundaya,
  EkonomiSvg,
  KetertibanSvg,
  LingkunganSvg,
  PemerintahanSvg,
  PendidikanSvg,
  PendukungSvg,
  PerlindungamSvg,
  APIManagementIcon,
  ContentManagementIcon,
  DashboardManagementIcon,
  DataManagementIcon,
  KonfigurasiIcon,
  UserManagementIcon,
} from 'assets/icons';
import { SplitCircle } from 'components/Icons';

export const analyticsUrl = 'https://analitik.data.go.id';
export const katalogUrl = 'https://katalog.satudata.go.id';
export const apiUrl = '/api-be';
export const dataUrl = `${katalogUrl}/api`;
export const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

export const getAnalyticsUrl = (path) => `${analyticsUrl}/${path}`;
export const getApiEndpoint = (path) => `${apiUrl}/${path}`;
export const getDataEndpoint = (path) => `${dataUrl}/${path}`;
export const getPortalEndpoint = (path) => `${apiUrl}/portal/${path}`;
export const getV1Endpoint = (path) => `${apiUrl}/v1/${path}`;
export const getCMSEndpoint = (path) => `${apiUrl}/cms/v1/${path}`;
export const getPublicV1Endpoint = (path) => `${apiUrl}/public/v1/${path}`;

export const apiUrls = {
  login: getApiEndpoint('login'),
  dataset: getDataEndpoint('3/action/package_search'),
  perminataanData: getPortalEndpoint('permintaan-data'),
  instansiData: getV1Endpoint('instansi'),
  cmsKomunitasAhliData: getCMSEndpoint('komunitas-ahli'),
  portalKomunitasAhliData: getPortalEndpoint('komunitas-ahli'),
  cmsAuditTrialData: getCMSEndpoint('audit-trail'),
  fileUpload: getApiEndpoint('file/upload'),
  publicFileUpload: getApiEndpoint('file/public-upload'),
  multipleFileUpload: getApiEndpoint('file/uploadMultiple'),
  uploadFoto: getApiEndpoint('file/public-image-upload'),
  bidangData: getCMSEndpoint('komunitas-ahli/bidang-keahlian'),
  daerahData: getV1Endpoint('kabupatenkota/search'),
  produenData: getV1Endpoint('katalog/produsendata'),
  dataindukAllData: getV1Endpoint('katalog/all'),
  dataindukData: getV1Endpoint('katalog/datainduk'),
  katalogData: getV1Endpoint('katalog'),
  listPermintaanData: getApiEndpoint('sekretariat/permintaan-data'),
  detailPermintaanData: getApiEndpoint('sekretariat/permintaan-data'),
  variable: getV1Endpoint('variable'),
  katalogVariable: getV1Endpoint('variable/katalog'),
  daftarSekreteriatData: getV1Endpoint('katalog/sekreteriat/list'),
  daftarData: getV1Endpoint('katalog'),
  daftarDataList: getV1Endpoint('katalog/list'),
  daftarDataSummary: getV1Endpoint('katalog/summary'),
  daftarDataDownload: getV1Endpoint('katalog/file/download'),
  taglineData: getV1Endpoint('tagline'),
  setting: getV1Endpoint('settings'),
  kategoriData: getV1Endpoint('settings/key/BERITA'),
  sdgPillers: getV1Endpoint('settings/key/SDGS'),
  rkpPN: getV1Endpoint('settings/key/RKP'),
  strukturData: getCMSEndpoint('bidang'),
  strukturDataPublic: getApiEndpoint('public/bidang'),
  cmsBeritaData: getCMSEndpoint('berita'),
  cmsBimtekJadwal: getCMSEndpoint('bimtek'),
  cmsBimtekPermintaanData: getCMSEndpoint('bimtek/permintaan'),
  cmsBimtekDokumentasi: getCMSEndpoint('bimtek/dokumentasi'),
  cmsBimtekLogs: getCMSEndpoint('bimtek/logs'),
  cmsAboutUs: getCMSEndpoint('tentang'),
  aboutUs: getApiEndpoint('public/tentang'),
  hubungiKami: getApiEndpoint('public/hubungi-kami'),
  userBeritaPortal: getPublicV1Endpoint('berita'),
  userBeritaLatest: getPublicV1Endpoint('berita/latest'),
  userBeritaPopular: getPublicV1Endpoint('berita/populer'),
  homeDataSetEndPoint: getPublicV1Endpoint('dataset'),
  portalForumSDI: getPortalEndpoint('v1/forum-sdi'),
  cmsForumSDI: getCMSEndpoint('forum-sdi'),
  bimtekSummaryMateriTerdekat: getPortalEndpoint('v1/bimtek/materi-terdekat'),
  bimtekSummaryJadwalTerdekat: getPortalEndpoint('v1/bimtek/jadwal-terdekat'),
  bimtekJadwal: getPortalEndpoint('v1/bimtek/jadwal'),
  bimtekJadwalTags: getCMSEndpoint('bimtek/tags'),
  bimtekJadwalLocations: getV1Endpoint('kabupatenkota'),
  formulirPendaftaran: getPortalEndpoint('v1/jwt-info'),
  addFormulirPendaftaran: getPortalEndpoint('v1/bimtek'),
  bimtekMateri: getPortalEndpoint('v1/bimtek/materi'),
  bimtekMateriDownload: getPortalEndpoint('v1/bimtek/download-zip'),
  bimtekMateriTerdekatDownload: getApiEndpoint('file/public-download'),
  beritaLayout: getPublicV1Endpoint('layout'),
  updateKiriLayout: getPublicV1Endpoint('layout/code/kiri'),
  bimtekDokumentasi: getPortalEndpoint('v1/bimtek/dokumentasi'),
  bimtekPermintaan: getPortalEndpoint('v1/bimtek/permintaan'),
  sosialMedia: getCMSEndpoint('sosial-media'),
  bimtekLogs: getPortalEndpoint('v1/bimtek/logs'),
  cmsContactUs: getCMSEndpoint('hubungi-kami-setting'),
  penggunaManagement: getApiEndpoint('sekretariat/user'),
  detailPenggunaManagement: getApiEndpoint('sekretariat/user'),
  penggunaRoleList: getApiEndpoint('sekretariat/user/role-list'),
  penggunaStatusList: getApiEndpoint('sekretariat/user/status-list'),
  penggunaInstansiList: getApiEndpoint('v1/instansi'),
  penggunaLogs: getApiEndpoint('sekretariat/user'),
};

export const priorityOptions = [
  { value: 1, label: 'Semua' },
  { value: 2, label: 'Ya' },
  { value: 3, label: 'Tidak' },
];

const arrayToOptionsMapper = (indexValue) => (label, value) => ({
  label,
  value: indexValue ? value : label,
});

export const JADWAL_PERMUTAKHIRAN = [
  'Harian',
  'Mingguan',
  'Bulanan',
  'Triwulanan',
  'Empat Bulanan',
  'Semesteran',
  'Tahunan',
  'Dua Tahunan',
  'Ad-hoc',
];

export const jadwalPermutakhiranOptions = JADWAL_PERMUTAKHIRAN.map(arrayToOptionsMapper(true));

export const FORMATS = ['csv', 'xlsx', 'pdf', 'png/jpg/jpeg', 'docx', 'json', 'xml'];

export const formatOptions = FORMATS.map(arrayToOptionsMapper());

export const pengaturanAksesOptions = ['Terbuka', 'Terbatas', 'Tertutup'].map(arrayToOptionsMapper());

export const TOPIC_LIST = [
  { title: 'Semua', items: [], icon: <SplitCircle /> },
  { title: 'Pertahanan dan Luar Negeri', items: ['Pertahanan', 'Luar Negeri'], icon: <EkonomiSvg /> },
  {
    title: 'Ekonomi dan Industri',
    items: [
      'Industri',
      'Perdagangan',
      'Pertanian',
      'Perkebunan',
      'Peternakan',
      'Perikanan',
      'Badan Usaha Milik negara',
      'Investasi',
      'Koperasi',
      'Usaha Kecil dan Menengah',
      'Pariwisata',
    ],
    icon: <LingkunganSvg />,
  },
  {
    title: 'Pembangunan Daerah',
    items: ['Pekerjaan Umum', 'Transmigrasi', 'Transportasi', 'Perumahan', 'Kawasan/Daerah Tertinggal'],
    icon: <Bundaya />,
  },
  {
    title: 'Perlindungan Sosial dan Kesehatan',
    items: ['Kesehatan', 'Sosial', 'Pemberdayaan Perempuan'],
    icon: <PerlindungamSvg />,
  },
  { title: 'Ketertiban Umum dan Keselamatan', items: ['Hukum', 'Keamanan', 'Hak Asasi Manusia'], icon: <PembangunanSvg /> },
  {
    title: 'Pendidikan dan Tenaga Kerja',
    items: ['Pendidikan', 'Ketenagakerjaan', 'Ilmu Pengetahuan', 'Teknologi', 'Pemuda'],
    icon: <PendidikanSvg />,
  },
  {
    title: 'Lingkungan dan Sumber Daya Alam',
    items: ['Pertambangan', 'energi', 'Kehutanan', 'Kelautan', 'Lingkungan Hidup'],
    icon: <PemerintahanSvg />,
  },
  { title: 'Budaya dan Agama', items: ['Agama', 'Kebudayaan', 'Olahraga'], icon: <PendukungSvg /> },
  {
    title: 'Pemerintahan Umum',
    items: [
      'Dalam Negeri',
      'Keuangan',
      'Informasi',
      'Komunikasi',
      'Perencanaan Pembangunan Nasional',
      'Aparatur Negara',
      'Kessekretariatan Negara',
      'Pertanahan',
      'Kependudukan',
    ],
    icon: <KetertibanSvg />,
  },
  {
    title: 'Pendukung Umum',
    items: ['Kebijakan Pemerintah', 'Manajemen Kegiatan', 'Kewilayahan', 'Data Dukung Lainnya'],
    icon: <PertahananSvg />,
  },
];

export const CMS_DASHBOARD = [
  {
    title: 'Content Management',
    description: 'Manajemen About Us, Struktur Organisasi, Contact Us, Berita, Bimbingan Teknis, Komunitas Ahli, Forum SDI',
    icon: <ContentManagementIcon />,
    iconColor: 'bg-blue',
    link: '/cms/about-us',
  },
  {
    title: 'Data Management',
    description: 'Manajemen Data',
    icon: <DataManagementIcon />,
    iconColor: 'bg-red',
  },
  {
    title: 'User Management',
    description: 'Manajemen Pengguna, Instansi, Unit Kerja, dan Hak Akses',
    icon: <UserManagementIcon />,
    iconColor: 'bg-teal',
  },
  {
    title: 'API Management',
    description: 'Manajmen API',
    icon: <APIManagementIcon />,
    iconColor: 'bg-orange',
  },
  {
    title: 'Konfigurasi',
    description: 'Konfigurasi Log Aktivitas, Sekuriti, Aset, Media Sosial',
    icon: <KonfigurasiIcon />,
    iconColor: 'bg-teal',
  },
  {
    title: 'Dashboard Management',
    description: 'Manajemen Dashboard',
    icon: <DashboardManagementIcon />,
    iconColor: 'bg-blue',
  },
];

export const Kontak_list = [
  {
    name: 'facebook',
    icon: 'facebookSvg',
  },
  {
    name: 'twitter',
    icon: 'twitterSvg',
  },
  {
    name: 'instagram',
    icon: 'instgramSvg',
  },
  {
    name: 'youtube',
    icon: 'youtubeSvg',
  },
];

export const CMS_KOMUNITAS_LEVEL = ['Pusat', 'Daerah'];
export const CMS_KOMUNITAS_LEVEL_PUSAT = ['Walidata', 'Sekretariat SDI'];
export const CMS_KOMUNITAS_LEVEL_DAERAH = ['Walidata', 'Walidata Pendukung', 'Koordinator Forum SDI', 'Sekretariat'];
export const CMS_KOMUNITAS_PENDIDIKAN = ['S3', 'S2', 'S1/Sederajat', 'Diploma', 'SMA/SMK/Sederajat'];

export const STATUS_DATA = {
  draft: 'DRAFT',
  waitingApproval: 'MENUNGGU_PERSETUJUAN',
  approved: 'DISETUJUI',
  rejected: 'DITOLAK',
  canceled: 'DIBATALKAN',
  published: 'DITAYANGKAN',
  unpublished: 'TIDAK_DITAYANGKAN',
};

export const STATUS_DATA_BERITA = [
  'DRAFT',
  'DRAFT', // from BE is 'SAVE' but actual is same as 'DRAFT'
  'MENUNGGU_PERSETUJUAN',
  'DISETUJUI',
  'DITOLAK',
  'DITAYANGKAN',
  'TIDAK_DITAYANGKAN',
  'DIHAPUS',
  'DIARSIPKAN',
];

export const USER_ROLES = {
  CONTENT_CREATOR: 'CONTENT_CREATOR',
  CONTENT_EDITOR: 'CONTENT_EDITOR',
  ADMIN: 'ADMIN',
  SEKRETARIAT: 'SEKRETARIAT',
  WALIDATA: 'WALIDATA',
  EKSEKUTIF: 'EKSEKUTIF',
  USER: 'USER',
  PIC_SDGS: 'PIC_SDGS',
  PIC_BAPPENAS: 'PIC_BAPPENAS',
};
