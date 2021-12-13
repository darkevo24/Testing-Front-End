import React from 'react';
import { useHistory } from 'react-router-dom';
import chunk from 'lodash/chunk';
import styled from 'styled-components';
import { CardWithIconAndText } from 'components/Cards/CardWithIconAndText';
import { TOPIC_LIST } from 'utils/constants';

const Box = styled.div`
  margin-top: 0;
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
  topicList.shift();
  const list = chunk(topicList, 5);
  const history = useHistory();

  const handleGoNext = (item) => {
    history.push({
      pathname: '/topic-detail',
      state: item.title,
    });
  };

  return (
    <BoxFlex style={{ margin: '44px 0' }}>
      <BoxTopic>Topik</BoxTopic>
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