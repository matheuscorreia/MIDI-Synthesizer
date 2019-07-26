import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import SynthEngineContext from '../../contexts/SynthEngineContext';

import IconButton from '../../common/IconButton';
import Section from '../../common/Section';
import SectionHeader from '../../common/SectionHeader';

import SawtoothWave from '../../icons/custom/SawtoothWave';
import SineWave from '../../icons/custom/SineWave';
import SquareWave from '../../icons/custom/SquareWave';
import TriangleWave from '../../icons/custom/TriangleWave';

import { OscillatorMode } from '../../../synthEngine/types';

import VisualizerBox from '../common/VisualizerBox';

const SelectedMode = styled(VisualizerBox)`
  justify-content: center;
  align-items: center;
`;

const Modes = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: row;

  justify-content: space-between;

  padding: 0;
  margin: 10px 0 0 0;
`;

const Mode = styled.li`
  display: flex;
  flex-direction: row;

  list-style-type: none;
`;

type ModeIconProps = {
  mode: OscillatorMode;
  strokeWidth: number;
  color: string;
  size: number;
}

const ModeIcon = ({ mode, ...props }: ModeIconProps) => {
  switch(mode) {
    case OscillatorMode.Sawtooth:
      return <SawtoothWave {...props} />;
    case OscillatorMode.Sine:
      return <SineWave {...props} />;
    case OscillatorMode.Square:
      return <SquareWave {...props} />;
    case OscillatorMode.Triangle:
      return <TriangleWave {...props} />;
  }
}

const ModeSelection = () => {
  const synthEngine = useContext(SynthEngineContext)!;
  const theme = useContext(ThemeContext);

  const [ mode, setMode ] = useState(synthEngine.getOscillator().getMode());

  const onChangeMode = (newMode: OscillatorMode) => () => {
    if(mode === newMode) return;

    setMode(newMode);
    synthEngine.getOscillator().setMode(newMode);
  };

  return (
    <Section>
      <SectionHeader fullWidth>Oscillator</SectionHeader>
      <SelectedMode>
        <ModeIcon color={theme.colors.primary} mode={mode} size={79} strokeWidth={0.5} />
      </SelectedMode>
      <Modes>
        <Mode>
          <IconButton onClick={onChangeMode(OscillatorMode.Sawtooth)}>
            <SawtoothWave color={theme.colors.primary} />
          </IconButton>
        </Mode>
        <Mode>
          <IconButton onClick={onChangeMode(OscillatorMode.Sine)}>
            <SineWave color={theme.colors.primary} />
          </IconButton>
        </Mode>
        <Mode>
          <IconButton onClick={onChangeMode(OscillatorMode.Square)}>
            <SquareWave color={theme.colors.primary} />
          </IconButton>
        </Mode>
        <Mode>
          <IconButton onClick={onChangeMode(OscillatorMode.Triangle)}>
            <TriangleWave color={theme.colors.primary} />
          </IconButton>
        </Mode>
      </Modes>
    </Section>
  )
};

export default ModeSelection;