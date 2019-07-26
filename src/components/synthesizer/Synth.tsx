import React from 'react';
import styled from 'styled-components';

import ModeSelection from './modules/Oscillator';
import VolumeEnvelope from './modules/VolumeEnvelope';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 120px 210px 210px 210px;
  grid-template-rows: 145px;
  padding: 10px;
`;

const Synth = () => {
  return (
    <Wrapper>
      <ModeSelection />
      <VolumeEnvelope />
    </Wrapper>
  )
};

export default Synth;