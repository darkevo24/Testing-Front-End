import React from 'react';
import { useHistory } from 'react-router-dom';
import chunk from 'lodash/chunk';
import styled from 'styled-components';
import { CardWithIconAndText } from 'components/Cards/CardWithIconAndText';
import { TOPIC_LIST } from 'utils/constants';

const Box = styled.div`
  // margin-top: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const BoxFlex = styled.div`
  display: flex;
`;

export const BerandaTopic = () => {
  const topicList = [...TOPIC_LIST];
  topicList.shift(); // Removing the first element (Semua Entry)
  const list = chunk(topicList, 10);
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
    <BoxFlex>
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
