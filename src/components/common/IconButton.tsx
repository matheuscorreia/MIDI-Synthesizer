import React from 'react';
import styled from 'styled-components';
import { Button as ReakitButton } from "reakit/Button";

import { hex2rgba } from '../../helpers/ui';

const Button = styled(ReakitButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 2px;

  background: none;

  padding: 4px;

  cursor: pointer;
  outline: none;

  &:hover, &:focus {
    background-color: ${props => hex2rgba(props.theme.colors.primary, 0.1)};
  }

  &:active {
    background-color: ${props => hex2rgba(props.theme.colors.primary, 0.2)};
  }
`;

type Props = {
  onClick: () => void;
  children: React.ReactNode; 
}

const IconButton = ({ onClick, children }: Props) => {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  )
};

export default IconButton;