import React from 'react';
import styled from 'styled-components';

import Knob from './Knob';
import KnobLabel from './KnobLabel';

const EnvelopeWrapper = styled.ul`
  width: 100%;

  display: flex;
  justify-content: space-around;

  padding: 0;
  margin: 5px 0 0 0;
`;

const KnobWrapper = styled.li`
  list-style-type: none;
  
  display: flex;
  flex-direction: column;
`;

type Props = {
  name: string;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  
  onAttackChange: (a: number) => void;
  onDecayChange: (d: number) => void;
  onSustainChange: (s: number) => void;
  onReleaseChange: (r: number) => void;
}

const EnvelopeControls = ({ attack, decay, sustain, release, onAttackChange, onDecayChange, onReleaseChange, onSustainChange, name }: Props) => {
  const handleChange = (changeHandler: any) => (newValue: number) => {
    changeHandler(newValue);
  }

  return (
    <EnvelopeWrapper>
      <KnobWrapper>
        <Knob
          id={`${name}-attack`}
          min={0.01}
          max={5}
          step={0.01}
          value={attack}
          onChange={handleChange(onAttackChange)}
        />
        <KnobLabel htmlFor={`${name}-attack`}>
          Attack
        </KnobLabel>
      </KnobWrapper>
      <KnobWrapper>
        <Knob
          min={0.01}
          max={5}
          step={0.01}
          value={decay}
          onChange={handleChange(onDecayChange)}
        />
        <KnobLabel htmlFor={`${name}-attack`}>
          Decay
        </KnobLabel>
      </KnobWrapper>
      <KnobWrapper>
        <Knob
          min={0}
          max={1}
          step={0.01}
          value={sustain}
          onChange={handleChange(onSustainChange)}
        />
        <KnobLabel htmlFor={`${name}-attack`}>
          Sustain
        </KnobLabel>
      </KnobWrapper>
      <KnobWrapper>
        <Knob
          min={0.01}
          max={2}
          step={0.01}
          value={release}
          onChange={handleChange(onReleaseChange)}
        />
        <KnobLabel htmlFor={`${name}-attack`}>
          Release
        </KnobLabel>
      </KnobWrapper>
    </EnvelopeWrapper>
  )
};

export default EnvelopeControls;