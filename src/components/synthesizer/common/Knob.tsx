import React, { useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { tween } from '../../../helpers/math';

import useKnob from '../../../hooks/useKnob';

const Wrapper = styled.div<{size: number}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;

  border-radius: 50%;

  &:focus-within {
    box-shadow: ${props => props.theme.colors.primary} 0px 0px 0px 1px;
  }
`;

const Range = styled.input.attrs(() => ({
  type: 'range'
}))`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  cursor: grab;
  opacity: 0;

  &:active {
    cursor: grabbing;
  }
`;

type Props = {
  id?: string;
  size?: number;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (newVal: number) => void;
};

const padding = 10;

const Knob = ({ size = 25, value, min, max, step, onChange, ...props }: Props) => {
  const rangeRef = useRef<HTMLInputElement | null>(null);

  const theme = useContext(ThemeContext);

  useKnob(rangeRef, {
    handleChange: onChange,
  });

  const knobRotation = tween(-150, 150, value, min, max);

  return (
    // <Tooltip title='teste'>
      <Wrapper size={size}>
        <svg width={25} height={25} viewBox={`0 0 ${size + padding} ${size}`} style={{ transform: `rotate(${knobRotation}deg)` }}>
          <circle cx='50%' cy='50%' r='50%' fill={theme.colors.secondary} stroke={theme.colors.primary} />
          <line x1='50%' y1='0' x2='50%' y2='25%' stroke={theme.colors.primary} />
        </svg>
        <Range

          ref={rangeRef}
          min={min}
          max={max}
          step={step}
          defaultValue={String(value)}
          {...props}
        />
      </Wrapper>
    // </Tooltip>
  )

};

export default Knob;