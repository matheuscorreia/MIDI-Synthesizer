import React from 'react';
import styled from 'styled-components';

import { hex2rgba } from '../../helpers/ui';

import { Button as ReakitButton} from 'reakit/Button';

type ButtonWrapper = {
  fullWidth?: boolean;
  centerContent?: boolean;
}

const ButtonWrapper = styled(({ fullWidth, centerContent, ...props }) => <ReakitButton {...props} />)<ButtonWrapper>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.centerContent ? 'center' : 'initial'};

  ${props => props.fullWidth ? 'width: 100%;' : ''}

  border: none;
  border-radius: 2px;

  box-shadow: 0px 0px 0px 0px ${props => props.theme.colors.primary};

  background: none;
  color: ${props => props.theme.colors.primary};

  padding: 5px 10px;

  transition: all .1s ease;

  cursor: pointer;
  outline: none;

  &:hover, &:focus {
    background-color: ${props => hex2rgba(props.theme.colors.primary, 0.07)};
    box-shadow: 0px 0px 0px 1px ${props => props.theme.colors.primary};
  }

  &:active {
    background-color: ${props => hex2rgba(props.theme.colors.primary, 0.2)};
    box-shadow: 0px 0px 0px 3px ${props => props.theme.colors.primary};
  }
`;

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  centerContent?: boolean;
}

const Button = ({ children, onClick, fullWidth, centerContent }: Props) => {
  return (
    <ButtonWrapper onClick={onClick} fullWidth={fullWidth} centerContent={centerContent}>
      {children}
    </ButtonWrapper>
  );
}

export default Button;