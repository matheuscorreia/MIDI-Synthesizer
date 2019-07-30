import React from 'react';
import styled from 'styled-components';

import { PianoRollHeight } from './PianoRoll'

const Collapse = styled.div<{ isCollapsed: boolean }>`
  transition: transform .3s ease;
  transform: translateY(${props => props.isCollapsed ? PianoRollHeight : 0}px);
  position: absolute;
  width: 100%;
  bottom: 0;
`;

type Props = {
  children: React.ReactNode;
  isCollapsed: boolean;
}

const PianoRollCollapse = ({ children, isCollapsed }: Props) => {
  return (
    <Collapse isCollapsed={isCollapsed}>
      {children}
    </Collapse>
  );
}

export default PianoRollCollapse;