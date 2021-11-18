import { ReactComponent as StarRed } from 'assets/star-red.svg';
import { ReactComponent as ArrowRightRed } from 'assets/arrow-right-red.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const TopikItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e1e2ea;
  padding: 16px 0;

  &.child {
    justify-content: space-between;
    padding: 16px;
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #2d2627;
  margin-left: 12px;
`;

const topics = ['Satu Data MKG', 'Rumah Data Riau', 'Data Geospasial'];

const TopikPopuler = (props) => {
  return (
    <Wrapper>
      <TopikItem>
        <StarRed />
        <Title>Topik Populer</Title>
      </TopikItem>
      {Array.apply(null, { length: props.jumlah }).map((e, i) => (
        <TopikItem className="child" key={'tp' + i}>
          <span>{topics[i % 3]}</span>
          <ArrowRightRed />
        </TopikItem>
      ))}
    </Wrapper>
  );
};

export default TopikPopuler;
