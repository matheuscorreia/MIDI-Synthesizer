import React from 'react';
import styled from 'styled-components';

import { TrackMidiNote } from '../../synthEngine/modules/midi/types';

const QuarterNoteWidth = 80;



const MidiNote = styled.div`
  position: absolute;

  height: 15px;
  background-color: #FFF;

  color: black;
  font-size: 7px;
`;

type Props = {
  tickDivision: number;
  color: string;
  notes: TrackMidiNote[];
}

const Track = ({ notes, tickDivision }: Props) => {

  return (
    <React.Fragment>
      {notes.map(note => {
        const { noteNumber, startDelta, duration } = note;

        const offsetBottom = noteNumber * 15;
        const width = (duration / tickDivision) * QuarterNoteWidth;
        const offsetLeft = (startDelta / tickDivision) * QuarterNoteWidth;

        return (
          <MidiNote
            key={`${note.noteName}-${note.startDelta}`}
            style={{
              bottom: offsetBottom,
              left: offsetLeft,
              width: width,
            }}
          >{note.noteName}</MidiNote>
        )
      })}
    </React.Fragment>
  )
  
};

export default Track;