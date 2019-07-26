import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import VisualizerBox from './VisualizerBox';

import { tween } from '../../../helpers/math';

const containerHeight = 80;
const envelopeSectionWidth = 150;

type Props = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

const attackTween = (a: number) => tween(0, envelopeSectionWidth, a, 0, 5);
const decayTween = (d: number) => tween(0, envelopeSectionWidth, d, 0, 5);
const sustainTween = (s: number) => tween(containerHeight, 0, s, 0, 1);
const releaseTween = (r: number) => tween(0, envelopeSectionWidth, r, 0, 2);

const EnvelopeVisualizer = ({ attack, decay, sustain, release }: Props) => {
  const theme = useContext(ThemeContext);

  const generatePathCommands = () => {
    const commands = [
      'M 0 80',
      `l ${attackTween(attack)} -80`,
      `l ${decayTween(decay)} ${sustainTween(sustain)}`,
      `l ${releaseTween(release)} ${80 - sustainTween(sustain)}`,
    ];

    return commands.join(' ');
  }

  return (
    <VisualizerBox>
      <svg width='100%' height='100%'>
        <path d={generatePathCommands()} stroke='#FFF' strokeWidth={1} fill={theme.colors.primary} fillOpacity={0.1} />
        <circle cx={attackTween(attack)} cy={0} r={2} fill={theme.colors.secondary} stroke={theme.colors.primary} />
        <circle cx={decayTween(decay) + attackTween(attack)} cy={sustainTween(sustain)} r={2} fill='#000' stroke='#FFF' />
        <circle cx={decayTween(decay) + attackTween(attack) + releaseTween(release)} cy={80} r={2} fill='#000' stroke='#FFF' />
      </svg>
    </VisualizerBox>
  )
}

export default EnvelopeVisualizer;