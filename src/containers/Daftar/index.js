import DaftarDataProvider from './DaftarDataProvider';
import DaftarPage from './DaftarPage';

export default function DaftarPageWithData() {
  return (
    <DaftarDataProvider>
      <DaftarPage />
    </DaftarDataProvider>
  );
}
