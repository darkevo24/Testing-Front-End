import PertumbuhanEkonomi from 'assets/icons/Dashboard/PertumbuhanEkonomi.png';
import TingkatKemiskinan from 'assets/icons/Dashboard/TingkatKemiskinan.png';
import TingkatPengangguranTerbuka from 'assets/icons/Dashboard/TingkatPengangguranTerbuka.png';
import RasioGini from 'assets/icons/Dashboard/RasioGini.png';
import IndeksPembangunanManusia from 'assets/icons/Dashboard/IndeksPembangunanManusia.png';
import NilaiTukarPetani from 'assets/icons/Dashboard/NilaiTukarPetani.png';
import NilaiTukarNelayan from 'assets/icons/Dashboard/NilaiTukarNelayan.png';
import PertumbuhanEkonomiBanner from 'assets/icons/Dashboard/PertumbuhanEkonomiBanner.png';
import TingkatKemiskinanBanner from 'assets/icons/Dashboard/TingkatKemiskinanBanner.png';
import TingkatPengangguranBanner from 'assets/icons/Dashboard/TingkatPengangguranBanner.png';
import RasioGiniBanner from 'assets/icons/Dashboard/RasioGiniBanner.png';
import IndeksPembangunanManusiaBanner from 'assets/icons/Dashboard/IndeksPembangunanManusiaBanner.jpg';
import NilaiTukarPetaniBanner from 'assets/icons/Dashboard/NilaiTukarPetaniBanner.jpg';
import NilaiTukarNelayanBanner from 'assets/icons/Dashboard/NilaiTukarNelayanBanner.jpg';

export const TOPIC_DASHBOARD = [
  {
    title: 'Pertumbuhan Ekonomi',
    banner: PertumbuhanEkonomiBanner,
    content:
      'https://public.tableau.com/views/pertumbuhan_ekonomi/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
    items: ['Ekonomi'],
    width: '1010px',
    height: '830px',
    color: '#000',
    icon: <img style={{ width: '50px' }} src={PertumbuhanEkonomi} alt="Pertumbuhan Ekonomi" />,
  },
  {
    title: 'Tingkat Kemiskinan',
    banner: TingkatKemiskinanBanner,
    content:
      'https://dashboard.layanan.go.id/views/Tingkat_kemiskinan/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:embed=true',
    items: ['Kemiskinan'],
    width: '1105px',
    height: '835px',
    color: '#fff',
    icon: <img style={{ width: '50px' }} src={TingkatKemiskinan} alt="Tingkat Kemiskinan" />,
  },
  {
    title: 'Pengangguran Terbuka',
    banner: TingkatPengangguranBanner,
    content:
      'https://public.tableau.com/views/tingkat_pengangguran_terbuka/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
    items: ['Pengangguran'],
    width: '1210px',
    height: '935px',
    color: '#000',
    icon: <img style={{ width: '50px' }} src={TingkatPengangguranTerbuka} alt="Tingkat Pengangguran Terbuka" />,
  },
  {
    title: 'Gini Rasio',
    banner: RasioGiniBanner,
    content:
      'https://public.tableau.com/views/gini_rasio/GiniRasio2022?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
    items: ['Gini Rasio'],
    width: '1205px',
    height: '835px',
    color: '#fff',
    icon: <img style={{ width: '50px' }} src={RasioGini} alt="Rasio Gini" />,
  },
  {
    title: 'Indeks Pembangunan Manusia',
    banner: IndeksPembangunanManusiaBanner,
    content:
      'https://dashboard.layanan.go.id/views/IndeksPembangunanManusia/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link:showVizHome=no&:embed=true',
    items: ['Pembangunan Manusia'],
    width: '1530px',
    height: '1950px',
    color: '#000',
    icon: <img style={{ width: '50px' }} src={IndeksPembangunanManusia} alt="Indeks Pembangunan Manusia" />,
  },
  {
    title: 'Nilai Tukar Petani',
    banner: NilaiTukarPetaniBanner,
    content:
      'https://dashboard.layanan.go.id/views/NilaiTukarPetani/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link:showVizHome=no&:embed=true',
    items: ['Nilai Tukar Petani'],
    width: '1205px',
    height: '935px',
    color: '#000',
    icon: <img style={{ width: '50px' }} src={NilaiTukarPetani} alt="Nilai Tukar Petani" />,
  },
  {
    title: 'Nilai Tukar Nelayan',
    banner: NilaiTukarNelayanBanner,
    content:
      'https://dashboard.layanan.go.id/views/NilaiTukarNelayan/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link:showVizHome=no&:embed=true',

    items: ['Nilai Tukar Nelayan'],
    width: '1205px',
    height: '835px',
    color: '#000',
    icon: <img style={{ width: '50px' }} src={NilaiTukarNelayan} alt="Nilai Tukar Nelayan" />,
  },
];
