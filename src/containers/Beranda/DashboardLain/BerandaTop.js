import { React } from 'react';
import styled from 'styled-components';
import PertumbuhanEkonomiBanner from 'assets/icons/Dashboard/PertumbuhanEkonomiBanner.png';
import TingkatKemiskinanBanner from 'assets/icons/Dashboard/TingkatKemiskinanBanner.png';
import TingkatPengangguranBanner from 'assets/icons/Dashboard/TingkatPengangguranBanner.png';
import RasioGiniBanner from 'assets/icons/Dashboard/RasioGiniBanner.png';
import IndeksPembangunanManusiaBanner from 'assets/icons/Dashboard/IndeksPembangunanManusiaBanner.jpg';
import NilaiTukarPetaniBanner from 'assets/icons/Dashboard/NilaiTukarPetaniBanner.jpg';
import NilaiTukarNelayanBanner from 'assets/icons/Dashboard/NilaiTukarNelayanBanner.jpg';

let img = PertumbuhanEkonomiBanner;
let color = '#000';

const BoxImage = styled.div`
  justify-content: center;
  // background-repeat: no-repeat;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 350px;
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
  //checking if dashboard.title have more than 2 word
  const first = dashboard?.title?.split(' ')[0];
  const second = dashboard?.title?.split(' ')[1];

  const count = dashboard?.title?.split(' ').length;
  let title;
  if (count === 2) {
    title = (
      <div>
        <span style={{ color: dashboard.color, marginRight: '10px' }}>{first}</span>
        {second}
      </div>
    );
  } else {
    const third = dashboard?.title?.split(' ')[2];
    title = (
      <div>
        <div style={{ color: dashboard.color, marginBottom: '15px' }}>{first}</div>
        <div>
          {second} {third}
        </div>
      </div>
    );
  }

  return (
    <BoxImage style={{ backgroundImage: `url(${dashboard.banner})` }}>
      <ContainerContent>
        <LargeTitle> {title}</LargeTitle>
      </ContainerContent>
    </BoxImage>
  );
};

export default BerandaTop;
