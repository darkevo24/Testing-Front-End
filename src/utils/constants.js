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
import { FaceBookIcon, InstagramIcon, TwitterIcon, YouTubeIcon } from '../assets/icons/SocialMedia';
import React from 'react';

export const apiUrl = '/api';
export const dataUrl = '/data/api';
export const portalUrl = '/portal';
export const v1Url = '/v1';

export const getApiEndpoint = (path) => `${apiUrl}/${path}`;
export const getDataEndpoint = (path) => `${dataUrl}/${path}`;
export const getPortalEndpoint = (path) => `${apiUrl + portalUrl}/${path}`;
export const getV1Endpoint = (path) => `${v1Url}/${path}`;

export const apiUrls = {
  login: getApiEndpoint('login'),
  dataset: getDataEndpoint('3/action/package_search'),
  perminataanData: getPortalEndpoint('permintaan-data'),
  instansiData: getV1Endpoint('instansi'),
};

export const TOPIC_LIST = [
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
    icon: <FaceBookIcon />,
  },
  {
    name: 'twitter',
    icon: <TwitterIcon />,
  },
  {
    name: 'instagram',
    icon: <InstagramIcon />,
  },
  {
    name: 'youtube',
    icon: <YouTubeIcon />,
  },
];
