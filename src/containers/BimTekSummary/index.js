import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { BimtekLayout } from 'layouts/BimtekLayout';
import BimTekSumJadwal from './jadwal.js';
import BimTekSumCarousel from './carousel.js';
import { ReactComponent as Download } from 'assets/download.svg';
import { ReactComponent as ArrowRIght } from 'assets/arrow-right-white.svg';
import './bimteksummary.scss';

const BimtekSummary = () => {
  const MateriItem = styled.div`
    border-top: 1px solid #e1e2ea;
    padding: 12px 16px;
    font-family: Myriad Pro;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0px;
    text-align: left;
    color: #2d2627;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const Button = styled.div`
    background: #f5f6fa;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
  `;

  const ButtonNext = styled.div`
    background: #ff0000;
    border-radius: 4px;
    padding: 8px 10px;
    cursor: pointer;
    position: absolute;
    right: 18px;
    bottom: 28px;
    z-index: 2;
  `;

  let responseJadwal = [
    {
      title: 'Perencanaan dan Program Bimbingan Teknis Tahap 1',
      startDate: '09 Agustus 2021',
      endDate: '12 Agustus 2021',
      city: 'Jakarta',
      location: 'Grand Ball Room, Hotel Mulia Senayan,  Senayan, Kebayoran Baru, Jakarta Selatan,  DKI Jakarta',
      speaker: 'Dr. Amelia Suganda',
      materi:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Perencanaan dan Program Bimbingan Teknis Tahap 2',
      startDate: '13 Agustus 2021',
      endDate: '15 Agustus 2021',
      city: 'Jakarta',
      location: 'Grand Ball Room, Hotel Mulia Senayan,  Senayan, Kebayoran Baru, Jakarta Selatan,  DKI Jakarta',
      speaker: 'Dr. Amelia Suganda',
      materi:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];
  let dataJadwal = responseJadwal.slice(0, 3);

  let responseMateri = [
    { title: 'Bimtek Keuangan' },
    { title: 'Bimtek Perencanaan dan Program' },
    { title: 'Bimtek Kepegawaian' },
    { title: 'Bimtek Pendidikan dan Pelatihan' },
    { title: 'test2' },
  ];
  let dataMateri = responseMateri.slice(0, 4);

  let responseThumbnail = [
    {
      title: 'Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-11',
      url: 'https://source.unsplash.com/user/c_v_r',
      location: 'Jakarta',
      date: '25 Agustus 2021',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Content Test',
      url: 'https://source.unsplash.com/user/c_v_r',
      location: 'Bandung',
      date: '26 Agustus 2021',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];
  let dataThumbnail = responseThumbnail.slice(0, 5);

  const history = useHistory();
  const gotoJadwal = () => history.push('/bimtek-jadwal');

  return (
    <BimtekLayout>
      <div>
        <div style={{ position: 'relative' }}>
          <ButtonNext>
            <ArrowRIght />
          </ButtonNext>
          <div className="bimteksum-carousel">
            {dataThumbnail.map((item, key) => (
              <BimTekSumCarousel
                key={key}
                url={item.url}
                title={item.title}
                desc={item.desc}
                location={item.location}
                date={item.date}
              />
            ))}
          </div>
        </div>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <div>
              <div className="bimteksum-title">Jadwal</div>
              <div className="bimteksum-title-border"></div>
            </div>
            <div onClick={gotoJadwal} className="bimteksum-viewall">
              Lihat Semua
            </div>
          </div>
          {dataJadwal.map((item, key) => (
            <BimTekSumJadwal
              key={key}
              title={item.title}
              startDate={item.startDate}
              endDate={item.endDate}
              city={item.city}
            />
          ))}
        </div>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <div>
              <div className="bimteksum-title">Materi</div>
              <div className="bimteksum-title-border"></div>
            </div>
            <div className="bimteksum-viewall">Lihat Semua</div>
          </div>
          {dataMateri.map((item, key) => (
            <MateriItem key={key}>
              {item.title}
              <Button>
                <Download />
              </Button>
            </MateriItem>
          ))}
        </div>
      </div>
    </BimtekLayout>
  );
};

export default BimtekSummary;
