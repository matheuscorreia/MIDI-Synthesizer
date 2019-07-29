import React from 'react';
import styled from 'styled-components';

import { hex2rgba } from '../../helpers/ui';

import { TrackMidiNote } from '../../synthEngine/modules/midi/types';

const QuarterNoteWidth = 80;



const MidiNote = styled.div`
  position: absolute;

  height: 15px;
  background-color: #FFF;
  border-radius: 2px;
  box-shadow: 0px 0px 2px 0px ${props => hex2rgba(props.theme.colors.secondary, 0.12)} inset;
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
          />
        )
      })}
    </React.Fragment>
  )
  
};

export default Track;