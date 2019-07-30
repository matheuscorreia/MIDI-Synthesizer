import React from 'react';
import styled from 'styled-components';

import Button from '../common/Button';
import Icon from '../icons/Icon';

const StyledButton = styled(Button)`
  position: absolute;
  right: 0;
  transition: none;
  border: none;
  border-radius: 0;

  &:active, &:focus, &:hover {
    box-shadow: none;
  }
`;

const StyledArrow = styled(Icon)`
  transform: rotate(${props => props.isCollapsed ? 180 : 0}deg);

  transition: transform .5s ease;
`;

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: (b: boolean) => void;
}

const PianoRollCollapseSwitch = ({ isCollapsed, setIsCollapsed }: Props) => {
  return (
    <StyledButton onClick={() => setIsCollapsed(!isCollapsed)}>
      <StyledArrow isCollapsed={isCollapsed}>
        expand_more
      </StyledArrow>
    </StyledButton>
  )
}

export default PianoRollCollapseSwitch;