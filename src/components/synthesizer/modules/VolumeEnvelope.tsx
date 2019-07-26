import React, { useContext } from 'react';
import styled from 'styled-components';

import Envelope from '../common/EnvelopeControls';
import EnvelopeVisualizer from '../common/EnvelopeVisualizer';
import Section from '../../common/Section';
import SectionHeader from '../../common/SectionHeader';

import useEnvelope from '../../../hooks/useEnvelope';

import SynthEngineContext from '../../contexts/SynthEngineContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VolumeEnvelope = () => {
  const synthEngine = useContext(SynthEngineContext)!;

  const [
    [attack, setAttack],
    [decay, setDecay],
    [sustain, setSustain],
    [release, setRelease],
  ] = useEnvelope(synthEngine.getVolumeEnvelope());

  return (
    <Section>
      <SectionHeader fullWidth>Volume Envelope</SectionHeader>
      <EnvelopeVisualizer
        attack={attack}
        decay={decay}
        sustain={sustain}
        release={release}
      />
      <Envelope
        name='volume'
        attack={attack}
        decay={decay}
        sustain={sustain}
        release={release}
        onAttackChange={setAttack}
        onDecayChange={setDecay}
        onSustainChange={setSustain}
        onReleaseChange={setRelease}
      />
    </Section>
  )
};

export default VolumeEnvelope;