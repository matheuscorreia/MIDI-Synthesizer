import React, { useState } from 'react';
import styled from 'styled-components';

import Synth from './synthesizer/Synth';
import PianoRoll from './pianoRoll/PianoRoll';
import PianoRollCollapse from './pianoRoll/PianoRollCollapse';
import PianoRollCollapseSwitch from './pianoRoll/PianoRollCollapseSwitch';
import MidiControlsWrapper from './midiControls/MidiControlsWrapper';

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
  const [ isPianoRollCollapsed, setIsPianoRollCollapsed ] = useState(true);

  return (
    <Wrapper>
      <Synth />
      <PianoRollCollapse isCollapsed={isPianoRollCollapsed}>
        <MidiControlsWrapper>
          <PianoRollCollapseSwitch isCollapsed={isPianoRollCollapsed} setIsCollapsed={setIsPianoRollCollapsed} />
        </MidiControlsWrapper>
        <PianoRoll />
      </PianoRollCollapse>
    </Wrapper>
  )
}

export default AppTemplate;