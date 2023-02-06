import { React } from 'react';
import styled from 'styled-components';
import BerandaBanner from './BerandaTop.svg';
import Bendera from './Bendera.svg';

const BoxImage = styled.div`
  justify-content: center;
  background: #fef8f5;
  display: flex;
  flex-direction: row;
`;

const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LargeTitle = styled.p`
  font-weight: bold;
  font-size: 40px;
  line-height: 30px;
  z-index: 1;
`;

const MediumTitle = styled.p`
  font-weight: normal;
  font-size: 18px;
  line-height: 17px;
  margin-bottom: 0;
  z-index: 1;
`;

const MediumWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;
`;

const ImageBanner = styled.img`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 768px) {
    width: 250%;
  }
`;

export const BerandaTop = () => {
  // const [banner, setBanner] = useState(null);

  return (
    <BoxImage>
      <ContainerContent>
        <LargeTitle>
          Data <span style={{ color: '#ed1c24' }}>Indonesia,</span>
        </LargeTitle>
        <LargeTitle>
          Dalam Satu <span style={{ color: '#ed1c24' }}>Portal</span>
        </LargeTitle>
        <MediumWrapper>
          <img src={Bendera} style={{ width: '30px', marginRight: '10px' }} />
          <MediumTitle>Temukan data-data Pemerintah dengan mudah!</MediumTitle>
        </MediumWrapper>
      </ContainerContent>
      <div></div>
      <div>
        <ImageBanner src={BerandaBanner} />
      </div>
    </BoxImage>
  );
};

export default BerandaTop;
