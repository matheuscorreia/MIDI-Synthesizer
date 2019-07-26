import React from 'react';
import styled, { css } from 'styled-components';

import { BaseKeyProps } from './Key';

import { whiteKeyDimensions } from './WhiteKey';

const blackKeyDimensions = {
  width: 32,
  height: whiteKeyDimensions.height/2,
  depth: 42,
}

const AlignLeftMixin = css`
  margin: 0 -10px 0 -22px;
`;

const AlignRightMixin = css`
  margin: 0 -22px 0 -10px;
`;

const AlignMiddleMixin = css`
  margin: 0 -16px 0 -16px;
`;

const ZAxisTranslation = `translateZ(18px)`;

const KeyActiveMixin = css`
  outline: none;
  transform: ${ZAxisTranslation} rotateX(-5deg);
`;

export enum BlackKeyAlignment {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  MIDDLE = 'MIDDLE',
}

type KeyWrapperProps = {
  alignment: BlackKeyAlignment;
  isPressed: boolean;
}

const Key = styled.button<KeyWrapperProps>`
  position: relative;
  padding: 0;
  border: none;
  background-color: ${props => props.theme.blackKeys};
  ${props => {
    switch (props.alignment) {
      case BlackKeyAlignment.LEFT:
        return AlignLeftMixin;
      case BlackKeyAlignment.MIDDLE:
        return AlignMiddleMixin;
      case BlackKeyAlignment.RIGHT:
        return AlignRightMixin;
    }
  }}

  width: ${blackKeyDimensions.width}px;
  height: ${blackKeyDimensions.height}px;

  transition: transform 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);

  transform-style: preserve-3d;
  transform: ${ZAxisTranslation} rotateX(0deg);
  transform-origin: top;

  &:focus {
    outline: none;
  }

  ${props => props.isPressed ? KeyActiveMixin : ''}

  &::before, &::after {
    content: '';

    width: ${blackKeyDimensions.depth}px;
    height: 100%;

    position: absolute;
    left: 0;
    top: 0;

    transform: rotateY(90deg);
    transform-origin: left;

    background-color: inherit;
  }

  &::after {
    content: '';
    top: 100%;

    width: 100%;
    height: ${blackKeyDimensions.depth}px;

    transform: rotateX(-90deg);
    transform-origin: top;

    background-color: inherit;
  }
`;

export type BlackKeyProps = {
  alignment: BlackKeyAlignment;
}

type Props = BaseKeyProps & BlackKeyProps;

const BlackKey = ({ alignment, isPressed, buttonRef, ...props }: Props) => {
  return (
    <Key alignment={alignment} isPressed={isPressed} {...props} ref={buttonRef}  />
  )
}

export default BlackKey;