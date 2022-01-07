import { ReactComponent as TwitterIcon } from 'assets/twitter.svg';
import styled from 'styled-components';
import { Timeline } from 'react-twitter-widgets';
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
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'datagoid',
      }}
      options={{
        height: '400',
      }}
    />
  </div>
);

export default Tweets;
