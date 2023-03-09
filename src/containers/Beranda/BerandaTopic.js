import React from 'react';
import { useHistory } from 'react-router-dom';
import chunk from 'lodash/chunk';
import styled from 'styled-components';
import { CardWithIconAndText } from 'components/Cards/CardWithIconAndText';
import { isSdiProduction, TOPIC_LIST } from 'utils/constants';

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const BoxTopic = styled.div`
  background: #ff0000;
  color: #fff;
  width: 43px;
  text-orientation: upright;
  writing-mode: vertical-lr;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-weight: bold;
  height: 160px;
  font-size: 16px;
  line-height: 22px;
`;

const BoxFlex = styled.div`
  display: flex;
`;

export const BerandaTopic = () => {
  const topicList = [...TOPIC_LIST];
  topicList.shift(); // Removing the first element (Semua Entry)
  const list = chunk(topicList, isSdiProduction ? 5 : 10);
  const history = useHistory();

  const handleGoNext = (item) => {
    if (item.disabled) {
      return false;
    }
    history.push({
      pathname: '/topic-detail',
      state: item.title,
    });
  };

  return (
    <BoxFlex style={{ margin: isSdiProduction ? '44px 0' : 'auto' }}>
      {isSdiProduction && <BoxTopic>Topik</BoxTopic>}
      <Box>
        {list.map((subList, index) => (
          <BoxFlex key={index}>
            {subList.map((item, itemIndex) => {
              const id = index + 'card' + itemIndex;
              return <CardWithIconAndText item={item} onClick={handleGoNext} key={id} id={id} />;
            })}
          </BoxFlex>
        ))}
      </Box>
    </BoxFlex>
  );
};
