import React from 'react';
import styled from 'styled-components';
import { Top } from './Top';
import { Search } from './Search';
import { Topic } from './Topic';
import { Cards } from './Cards';

const Container = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
const BerandaPage = () => (
  <>
    <Top />
    <Container>
      <Search />
      <Topic />
      <Cards />
    </Container>
  </>
);

export default BerandaPage;
