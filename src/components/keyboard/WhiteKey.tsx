import React from 'react';
import styled, { css } from 'styled-components';

import { BaseKeyProps } from './Key';

export const whiteKeyDimensions = {
  width: 76,
  height: 400,
  depth: 50,
}

const LeftHammerMixin = css`
  right: 26px;
`;

const RightHammerMixin = css`
  left: 26px;
  right: 0;
`;

const MiddleHammerMixin = css`
  left: 14px;
  right: 14px;
`;

const MiddleLeftHammerMixin = css`
  left: 14px;
  right: 20px;
`;

const MiddleRightHammerMixin = css`
  left: 20px;
  right: 14px;
`;

const KeyActiveMixin = css`
  outline: none;
  transform: rotateX(-5deg);
`;

export enum HammerType {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  MIDDLE = 'MIDDLE',
  MIDDLE_LEFT = 'MIDDLE_LEFT',
  MIDDLE_RIGHT = 'MIDDLE_RIGHT',
}

type StyledKeyProps = {
  hammerType: HammerType
  isPressed: boolean;
};

const Key = styled.button<StyledKeyProps>`
  position: relative;
  border: none;
  background-color: ${props => props.theme.whiteKeys};

  transition: transform 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);

  transform-style: preserve-3d;
  transform-origin: top;
  transform: rotateX(0deg);

  margin: 0 2px;
  padding: 0;

  width: ${whiteKeyDimensions.width}px;
  /*
    The height is constrained by the transparent border,
    so to make space for the key hammer.
  */
  height: ${whiteKeyDimensions.height}px;
  border-top: ${whiteKeyDimensions.height/2}px solid transparent;

  /*
    This clips the background to fit inside the boundaries of the content.
    it's important so that the color wont appear on the transparent border set above.
  */
  background-clip: content-box;

  /* ::before is the upper part of the key. The ::after is also here so we can reuse most of the styles. */
  &::before, &::after {
    position: absolute;
    content: '';
    background-color: inherit;
    height: ${whiteKeyDimensions.height/2}px;
    top: -${whiteKeyDimensions.height/2}px;
    left: 0;
    ${props => {
      switch (props.hammerType) {
        case HammerType.LEFT:
          return LeftHammerMixin;
        case HammerType.RIGHT:
          return RightHammerMixin;
        case HammerType.MIDDLE:
          return MiddleHammerMixin;
        case HammerType.MIDDLE_LEFT:
          return MiddleLeftHammerMixin;
        case HammerType.MIDDLE_RIGHT:
          return MiddleRightHammerMixin;
      }
    }}
  }

  &::after {
    left: 0;
    top: 100%;
    width: 100%;
    height: ${whiteKeyDimensions.depth}px;
    background-color: inherit;
    transform: rotateX(-90deg);
    transform-origin: top;
  }

  &:focus {
    outline: none;
  }

  ${props => props.isPressed ? KeyActiveMixin : ''}
`;

const KeyLeftFace = styled.div<Omit<StyledKeyProps, 'isPressed'>>`
  position: absolute;
  width: ${whiteKeyDimensions.depth}px;
  height: ${props => props.hammerType === HammerType.LEFT ? whiteKeyDimensions.height : whiteKeyDimensions.height/2}px;
  background-color: inherit;
  bottom: 0;
  transform: rotateY(90deg);
  transform-origin: left;
`;

export type WhiteKeyProps = {
  hammerType: HammerType;
};

type Props = BaseKeyProps & WhiteKeyProps;

const WhiteKey = ({ hammerType, isPressed, buttonRef, ...props } :Props) => {
  return (
    <Key hammerType={hammerType} isPressed={isPressed} {...props} ref={buttonRef}>
      <KeyLeftFace hammerType={hammerType} />
    </Key> 
  )
}

export default WhiteKey;