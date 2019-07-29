import React from 'react';
import styled from 'styled-components';

import { hex2rgba } from '../../helpers/ui';

import useCurrentSong from '../../hooks/synthEngineHooks/useCurrentSong';
import Track from './Track';

const PianoRollWindowWrapper = styled.div`
  display: flex;
  height: 50%;
  overflow-y: scroll;
  overflow-x: hidden;

  border-top: 1px solid ${props => props.theme.colors.primary};
  border-bottom: 1px solid ${props => props.theme.colors.primary};
`;

const noteHeight = 15;

const PianoRollWrapper = styled.div`
  display: flex;
  flex: 1;
  height: ${127 * noteHeight}px;
`;

const PianoNotesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 60px;
  height: 100%;
`;

const PianoNotesWrapperGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background: linear-gradient(90deg, transparent 0%, ${props => hex2rgba(props.theme.colors.secondary, 1)} 100%);
`;

const PianoNote = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: ${noteHeight}px;
  font-size: 10px;
  display: flex;
  align-items: center;

  border-bottom: 1px solid ${props => props.theme.colors.primary};
`;

const timeSignature = '4/4'; 

const division = 8;
const divisionLength = 10;

const gridLineWidth = 0.5;

const getBarLength = (timeSignature: string) => {
  const [ beat, measure ] = timeSignature.split('/').map(Number);

  const sixteenthNotesPerBeat = division/measure;

  return sixteenthNotesPerBeat * beat * divisionLength;
}

const getHorizontalGradientGrid = (timeSignature: string, markerColorHex: string) => {
  const [ beat, measure ] = timeSignature.split('/').map(Number);

  const sixteenthNotesPerBeat = division/measure;

  console.log(sixteenthNotesPerBeat);

  const sixteenthNotesPerBar = Array.from({ length: beat * sixteenthNotesPerBeat }, (_, i) => i);

  const barGradients = sixteenthNotesPerBar.map(index => {
    const pos = index + 1;

    const isBarMarker = index === sixteenthNotesPerBar.length - 1;
    const isBeatMarker = pos % measure === 0;

    const markerTransparency = isBarMarker ? 1 : (isBeatMarker ? 0.5 : 0.1);

    const markerColor = hex2rgba(markerColorHex, markerTransparency);

    return `
      transparent ${(divisionLength * index)}px,
      transparent ${(divisionLength * pos) - gridLineWidth}px,
      ${markerColor} ${(divisionLength * pos)}px
      `;
  });

  return barGradients.join(',');
}

const getVerticalGradientGrid = (markerColorHex: string) => {
  const noteGridGradients = noteNumbers.map((nn) => {
    const pos = nn + 1;

    const isOctaveMarker = pos % 12 === 0;

    const markerTransparency = isOctaveMarker ? 1 : 0.5;

    const markerColor = hex2rgba(markerColorHex, markerTransparency);

    return `
      transparent ${(noteHeight * nn)}px,
      transparent ${(noteHeight * pos) - gridLineWidth}px,
      ${markerColor} ${(noteHeight * pos)}px
    `;
  }) 

  return noteGridGradients.join(',');
}



const TrackContainer = styled.div`
  overflow-x: scroll;
  position: relative;
  width: 100%;
  height: 100%;
  
  box-sizing: content-box;

  background:
    repeating-linear-gradient(90deg, ${props => getHorizontalGradientGrid(timeSignature, props.theme.colors.primary)});
  background-attachment: local;
`

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const octaveSection = Array.from({ length: 11 }, (_, i) => i - 2); // [-2, -1, ..., 7, 8];

const noteNumberToNoteName = (nn: number) => {
  const noteIndex = nn % 12;
  const octaveIndex = Math.floor(nn/12);

  const octaveNumber = octaveSection[octaveIndex];
  const noteName = noteNames[noteIndex];

  return `${noteName}${octaveNumber}`;
}

const noteNumbers = Array.from({ length: 127 }, (_, i) => i).reverse();

const PianoRoll = () => {
  const currentSong = useCurrentSong();

  console .log(currentSong);

  return (
    <PianoRollWindowWrapper>
      <PianoRollWrapper>
        <PianoNotesWrapper>
          <PianoNotesWrapperGradient />
          {noteNumbers.map(noteNumber => {
            return (
              <PianoNote key={`NoteNumber-${noteNumber}`}>
                {noteNumberToNoteName(noteNumber)}
              </PianoNote>
            )
          })}
        </PianoNotesWrapper>
        <TrackContainer>
          {currentSong && currentSong.tracks.map(track => {
            return (
              <Track
                key={track.trackName}
                tickDivision={currentSong.division}
                color='#FFFFFF'
                notes={track.notes}
              />
            )
          })}
        </TrackContainer>
      </PianoRollWrapper>
    </PianoRollWindowWrapper>
  );
};

export default PianoRoll;