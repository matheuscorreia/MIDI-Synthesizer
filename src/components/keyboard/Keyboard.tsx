import React from 'react';
import styled from 'styled-components';

import Key, { KeyType } from './Key';
import { BlackKeyAlignment } from './BlackKey';
import { HammerType } from './WhiteKey';

const OctaveKeys = styled.main`
  display: flex;
  flex-direction: row;

  transform-origin: bottom;
  transform-style: preserve-3d;
  transform: rotateX(75deg) rotateZ(-15deg);
  margin: -200px auto 100px;
`;

const keycodes: number[] = [90,83,88,68,67,86,71,66,72,78,74,77];
const noteIDs: number[] = Array.from({ length: 12 }, (_, i) => i); // [0,1,2,3,...]

type Props = {
  /** array of octave numbers, being any consecutive section of the set [-1, 9] */
  octaves: number[];
  inputOctave: number;
}

const Keyboard = ({ octaves, inputOctave }: Props) => {
  const getNoteNumber = (octaveNumber: number, noteID: number) => {
    return ((octaveNumber + 1)*12) + noteID;
  }

  const renderOctave = (octave: number, isInputOctave: boolean) => {
    const noteNumbers = noteIDs.map(id => getNoteNumber(octave, id));
    const keyCodes: (number|undefined)[] = noteIDs.map(id => isInputOctave ? keycodes[id] : undefined);

    return [
      <Key
        type={KeyType.WHITE}
        hammerType={HammerType.LEFT}
        key={noteNumbers[0]}
        noteNumber={noteNumbers[0]}
        keyCode={keyCodes[0]}
      />,
      <Key
        type={KeyType.BLACK}
        alignment={BlackKeyAlignment.LEFT}
        key={noteNumbers[1]}
        noteNumber={noteNumbers[1]}
        keyCode={keyCodes[1]}
      />,
      <Key
        type={KeyType.WHITE}
        hammerType={HammerType.MIDDLE}
        key={noteNumbers[2]}
        noteNumber={noteNumbers[2]}
        keyCode={keyCodes[2]}
      />,
      <Key
        type={KeyType.BLACK}
        alignment={BlackKeyAlignment.RIGHT}
        key={noteNumbers[3]}
        noteNumber={noteNumbers[3]}
        keyCode={keyCodes[3]}
      />,
      <Key
        type={KeyType.WHITE}
        hammerType={HammerType.RIGHT}
        key={noteNumbers[4]}
        noteNumber={noteNumbers[4]}
        keyCode={keyCodes[4]}
      />,
      <Key
        type={KeyType.WHITE}
        hammerType={HammerType.LEFT}
        key={noteNumbers[5]}
        noteNumber={noteNumbers[5]}
        keyCode={keyCodes[5]}
      />,
      <Key
        type={KeyType.BLACK}
        alignment={BlackKeyAlignment.LEFT}
        key={noteNumbers[6]}
        noteNumber={noteNumbers[6]}
        keyCode={keyCodes[6]}
      />,
      <Key
        type={KeyType.WHITE}
        hammerType={HammerType.MIDDLE_LEFT}
        key={noteNumbers[7]}
        noteNumber={noteNumbers[7]}
        keyCode={keyCodes[7]}
      />,
      <Key
        type={KeyType.BLACK}
        alignment={BlackKeyAlignment.MIDDLE}
        key={noteNumbers[8]}
        noteNumber={noteNumbers[8]}
        keyCode={keyCodes[8]}
      />,
      <Key
        type={KeyType.WHITE}
        hammerType={HammerType.MIDDLE_RIGHT}
        key={noteNumbers[9]}
        noteNumber={noteNumbers[9]}
        keyCode={keyCodes[9]}
      />,
      <Key
        type={KeyType.BLACK}
        alignment={BlackKeyAlignment.RIGHT}
        key={noteNumbers[10]}
        noteNumber={noteNumbers[10]}
        keyCode={keyCodes[10]}
      />,
      <Key
        type={KeyType.WHITE}
        hammerType={HammerType.RIGHT}
        key={noteNumbers[11]}
        noteNumber={noteNumbers[11]}
        keyCode={keyCodes[11]}
      />
    ]
  }

  return (
    <OctaveKeys>
      {octaves.map(octave => {
        return renderOctave(octave, octave === inputOctave);
      })}
    </OctaveKeys>
  )
}

export default Keyboard;