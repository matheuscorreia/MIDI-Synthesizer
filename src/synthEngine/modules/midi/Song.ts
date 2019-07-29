import { MIDIEventName, MIDIEvent, MidiFileFormat } from './types';
import { findEventsInTrack } from './helpers';

import Track from './Track';

/** Different Midi formats have different track structures, and should be inspected differently.
 *  There exists only 3 formats, caracterized by the integers 0, 1 and 2;
 *  For more information: http://www.music.mcgill.ca/~ich/classes/mumt306/StandardMIDIfileformat.html#BM2_2
 */
type Tempo = number;
type TimeSignature = string;
type KeySignature = string;
type TickDivision = number;

/** All the MIDI Events of this song grouped by tracks */
type InitEvents = MIDIEvent[][];

interface ISong {
  format: MidiFileFormat;
  tempo: Tempo;
  timeSignature: TimeSignature;
  keySignature?: KeySignature;
  tracks: Track[];
  division: TickDivision;
}

class Song implements ISong {
  format: MidiFileFormat;
  tempo: Tempo;
  timeSignature: TimeSignature;
  keySignature?: KeySignature;
  tracks: Track[];
  division: TickDivision;

  constructor(events: InitEvents, format: MidiFileFormat, division: TickDivision) {
    this.format = format;
    this.division = division;

    if(this.format === 1) {
      const [ metaTrack, ...restTracks ] = events;

      this.initMeta(metaTrack);

      this.tracks = restTracks.map(trackEvents => new Track(trackEvents));

    } else {
      console.log('Unsupported Format')
    }
  }

  private initMeta(metaTrack: MIDIEvent[]) {
    const setTempoEvents = findEventsInTrack(metaTrack, MIDIEventName.Set_Tempo);
    const [ initTempoEvent ] = setTempoEvents;
      
    if(initTempoEvent) {
      this.tempo = initTempoEvent.data;
    } else {
      this.tempo = 120;
    }

    const timeSignatureEvents = findEventsInTrack(metaTrack, MIDIEventName.Time_Signature);
    const [ initTimeSignatureEvent ] = timeSignatureEvents;

    if(initTimeSignatureEvent) {
      this.timeSignature = initTimeSignatureEvent.timeSignature;
    } else {
      this.timeSignature = '4/4';
    }

    const keySignatureEvents = findEventsInTrack(metaTrack, MIDIEventName.Key_Signature);
    const [ initKeySignatureEvent ] = keySignatureEvents;

    if(initKeySignatureEvent) {
      this.keySignature = initKeySignatureEvent.keySignature;
    }
  }
  


}

export default Song; 