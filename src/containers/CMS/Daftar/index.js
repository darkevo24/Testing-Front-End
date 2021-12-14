import DaftarDataProvider from 'containers/Daftar/DaftarDataProvider';
import CMSDaftarPage from './CMSDaftarPage';

export default function DaftarPageWithData() {
  return (
    <DaftarDataProvider>
      <CMSDaftarPage />
    </DaftarDataProvider>
  );
}
