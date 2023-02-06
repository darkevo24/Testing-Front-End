import { React } from 'react';
import styled from 'styled-components';
import PertumbuhanEkonomiBanner from 'assets/icons/Dashboard/PertumbuhanEkonomiBanner.png';
import TingkatKemiskinanBanner from 'assets/icons/Dashboard/TingkatKemiskinanBanner.png';
import TingkatPengangguranBanner from 'assets/icons/Dashboard/TingkatPengangguranBanner.png';
import RasioGiniBanner from 'assets/icons/Dashboard/RasioGiniBanner.png';

let img = PertumbuhanEkonomiBanner;
let color = '#000';

const BoxImage = styled.div`
  justify-content: center;
  // background-repeat: no-repeat;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 350px;

  // background-image fit screen
  // background-image: url(${img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContainerContent = styled.div`
  width: 1100px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LargeTitle = styled.p`
  font-weight: bold;
  font-size: 50px;
  line-height: 30px;
  z-index: 1;
  color: #ed1c24;
`;

export const BerandaTop = ({ dashboard }) => {
  if (!dashboard.title) {
    return (dashboard.title = 'Pertumbuhan Ekonomi');
  }

  if (dashboard.title === 'Pertumbuhan Ekonomi') {
    img = PertumbuhanEkonomiBanner;
    color = '#000';
  }

  if (dashboard.title === 'Tingkat Kemiskinan') {
    img = TingkatKemiskinanBanner;
    color = '#fff';
  }
  if (dashboard.title === 'Tingkat Pengangguran Terbuka') {
    img = TingkatPengangguranBanner;
    color = '#000';
  }
  if (dashboard.title === 'Rasio Gini') {
    img = RasioGiniBanner;
    color = '#fff';
  }
  const first = dashboard.title.split(' ')[0];
  const second = dashboard.title.split(' ')[1];
  return (
    <BoxImage style={{ backgroundImage: `url(${img})` }}>
      <ContainerContent>
        <LargeTitle>
          <span style={{ color, marginRight: '10px' }}>{first}</span>
          {second}
        </LargeTitle>
      </ContainerContent>
    </BoxImage>
  );
};

export default BerandaTop;
