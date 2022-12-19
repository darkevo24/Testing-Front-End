import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as StarRed } from 'assets/star-red.svg';
import { ReactComponent as ArrowRightRed } from 'assets/arrow-right-red.svg';
import { getPopularTopic, popularTopicSelector } from './reducer';

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

const TopikPopuler = () => {
  const dispatch = useDispatch();
  const hisotry = useHistory();

  useEffect(() => {
    dispatch(getPopularTopic('populer/tagline'));
  }, []);
  const { records: dataPopularTopic } = useSelector(popularTopicSelector);

  const handleClick = (e, id, keterangan) => {
    e.preventDefault();
    hisotry.push(`/berita-topik/${id}/${keterangan}`);
  };

  return (
    <Wrapper>
      <TopikItem>
        <StarRed />
        <Title>Topik Populer</Title>
      </TopikItem>
      {dataPopularTopic.length > 0 &&
        dataPopularTopic.map((value, index) => {
          return (
            <TopikItem className="child" key={index}>
              <span>{value.keterangan}</span>
              <span className="cursor-pointer">
                <ArrowRightRed onClick={(e) => handleClick(e, value.id, value.keterangan)} />
              </span>
            </TopikItem>
          );
        })}
    </Wrapper>
  );
};

export default TopikPopuler;
