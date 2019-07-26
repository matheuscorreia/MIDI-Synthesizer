import React, { HTMLAttributes, MutableRefObject, SFC } from 'react';

import BlackKey, { BlackKeyProps } from './BlackKey';
import WhiteKey, { WhiteKeyProps } from './WhiteKey';

import useKeyManager from '../../hooks/useKeyManager';
import useMidiListener from '../../hooks/useMidiListener';

export enum KeyType {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
}

export type BaseKeyProps = {
  isPressed: boolean;
  buttonRef: MutableRefObject<HTMLButtonElement>;
} & HTMLAttributes<HTMLButtonElement>;

type KeyProps = {
  type: KeyType;
  noteNumber: number;
  keyCode?: number;
}

type WhiteProps = {
  type: KeyType.WHITE;
} & KeyProps & WhiteKeyProps;

type BlackProps = {
  type: KeyType.BLACK;
} & KeyProps & BlackKeyProps;

type Props = WhiteProps | BlackProps;

const Key: SFC<Props> = ({
  type,
  //@ts-ignore
  alignment,
  //@ts-ignore
  hammerType,
  keyCode,
  noteNumber,
}) => {
  const [ setIsPressed, isPressed, buttonRef ] = useKeyManager(noteNumber, keyCode);
  useMidiListener(noteNumber, setIsPressed);

  if(type === KeyType.BLACK) {
    return <BlackKey alignment={alignment} isPressed={isPressed} buttonRef={buttonRef} />
  }

  if(type === KeyType.WHITE) {
    return <WhiteKey hammerType={hammerType} isPressed={isPressed} buttonRef={buttonRef} />
  }
};

export default Key;