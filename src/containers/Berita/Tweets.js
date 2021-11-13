import { ReactComponent as TwitterIcon } from 'assets/twitter.svg';
import twittermock from 'assets/twitter-mock.png';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #2d2627;
  margin-left: 12px;
`;

const Tweets = () => (
  <div>
    <TitleWrapper>
      <TwitterIcon />
      <Title>Tweets</Title>
    </TitleWrapper>
    <img src={twittermock} alt="Tweets" style={{ width: '100%' }} />
  </div>
);

export default Tweets;
