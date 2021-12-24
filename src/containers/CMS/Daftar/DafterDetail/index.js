import React from 'react';
import DaftarDataProvider from 'containers/Daftar/DaftarDataProvider';
import { DaftarDetailPage } from './DafterDetailPage';

export default function DaftarDataDetailPage() {
  return (
    <DaftarDataProvider>
      <DaftarDetailPage />
    </DaftarDataProvider>
  );
}
