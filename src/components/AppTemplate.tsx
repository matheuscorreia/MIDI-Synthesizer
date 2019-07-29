import React from 'react';
import styled from 'styled-components';

import Synth from './synthesizer/Synth';
import PianoRoll from './pianoRoll/PianoRoll';

const Wrapper = styled.main`
  overflow: hidden;
  position: relative;

  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const MainGroup = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
`;


const AppTemplate = () => {
  return (
    <Wrapper>
        <Synth />
      <PianoRoll />
    </Wrapper>
  )
}

export default AppTemplate;