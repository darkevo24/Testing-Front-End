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
import React from 'react';

export const apiUrl = '/api-be';
export const dataUrl = '/data/api';

export const getApiEndpoint = (path) => `${apiUrl}/${path}`;
export const getDataEndpoint = (path) => `${dataUrl}/${path}`;
export const getPortalEndpoint = (path) => `${apiUrl}/portal/${path}`;
export const getV1Endpoint = (path) => `${apiUrl}/v1/${path}`;
export const getCMSEndpoint = (path) => `${apiUrl}/cms/v1/${path}`;

export const apiUrls = {
  login: getApiEndpoint('login'),
  dataset: getDataEndpoint('3/action/package_search'),
  perminataanData: getPortalEndpoint('permintaan-data'),
  instansiData: getV1Endpoint('instansi'),
  cmsKomunitasAhliData: getCMSEndpoint('komunitas-ahli'),
  portalKomunitasAhliData: getPortalEndpoint('komunitas-ahli'),
  fileUpload: getApiEndpoint('file/upload'),
  uploadFoto: getApiEndpoint('file/public-image-upload'),
  bidangData: getCMSEndpoint('komunitas-ahli/bidang-keahlian'),
  daerahData: getV1Endpoint('kabupatenkota/search'),
  produenData: getV1Endpoint('katalog/produsendata'),
  dataindukData: getV1Endpoint('katalog/datainduk'),
  daftarData: getV1Endpoint('katalog'),
  taglineData: getV1Endpoint('tagline'),
  kategoriData: getV1Endpoint('settings/key/BERITA'),
  sdgPillers: getV1Endpoint('settings/key/SDGS'),
  rkpPN: getV1Endpoint('settings/key/RKP'),
  strukturData: getCMSEndpoint('bidang'),
  cmsBeritaData: getCMSEndpoint('berita'),
};

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

const Text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.';

export const CMS_DASHBOARD = [
  {
    title: 'Content Management',
    description: Text,
    icon: <ContentManagementIcon />,
    iconColor: 'sdp-text-blue',
    link: '/cms/about-us',
  },
  {
    title: 'Data Management',
    description: Text,
    icon: <DataManagementIcon />,
    iconColor: 'sdp-text-red-dark',
  },
  {
    title: 'User Management',
    description: Text,
    icon: <UserManagementIcon />,
    iconColor: 'sdp-text-teal',
  },
  {
    title: 'Dashboard Management',
    description: Text,
    icon: <DashboardManagementIcon />,
    iconColor: 'sdp-text-blue',
  },
  {
    title: 'API Management',
    description: Text,
    icon: <APIManagementIcon />,
    iconColor: 'sdp-text-orange',
  },
  {
    title: 'Konfigurasi',
    description: Text,
    icon: <KonfigurasiIcon />,
    iconColor: 'sdp-text-teal',
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
