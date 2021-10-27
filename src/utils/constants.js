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
} from 'assets/icons';
import React from 'react';

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
