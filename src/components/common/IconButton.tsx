import React from 'react';
import styled from 'styled-components';
import { Button as ReakitButton } from "reakit/Button";

import { hex2rgba } from '../../helpers/ui';

type ButtonProps = {
  backgroundColor?: string;
}

const Button = styled(({ backgroundColor, ...props }) => <ReakitButton {...props} />)<ButtonProps>`
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
    background-color: ${props => hex2rgba(props.backgroundColor ? props.backgroundColor : props.theme.colors.primary, 0.1)};
  }

  &:active {
    background-color: ${props => hex2rgba(props.backgroundColor ? props.backgroundColor : props.theme.colors.primary, 0.2)};
  }
`;

type Props = {
  backgroundColor?: string;
  onClick: () => void;
  children: React.ReactNode; 
}

const IconButton = ({ onClick, children, backgroundColor, ...props }: Props) => {
  return (
    <Button onClick={onClick} backgroundColor={backgroundColor} {...props}>
      {children}
    </Button>
  )
};

export default IconButton;