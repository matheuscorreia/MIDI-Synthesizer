import React from 'react';
import styled from 'styled-components';

import Synth from './synthesizer/Synth';
import Menu from './menu/Menu';
import PlayBar from './playbar/PlayBar';

const Wrapper = styled.main`
  overflow: hidden;
  position: relative;
  height: calc(100vh - 60px);

  display: flex;
  justify-content: flex-start;

  padding-bottom: 60px;
`;

const MainGroup = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
`;


const AppTemplate = () => {
  return (
    <Wrapper>
      <MainGroup>
        <Synth />
      </MainGroup>
      <Menu />
      <PlayBar />
    </Wrapper>
  )
}

export default AppTemplate;