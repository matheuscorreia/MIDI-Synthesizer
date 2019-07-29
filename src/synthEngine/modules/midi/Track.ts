import { MIDIEvent, MIDIEventName, TrackMidiNote } from './types';
import { findEventsInTrack } from './helpers';

interface ITrack {
  events: MIDIEvent[];
  trackName?: string;
  deviceName?: string;
}

class Track implements ITrack {
  events: MIDIEvent[];
  notes: TrackMidiNote[];
  trackName: string;
  deviceName?: string;
  
  constructor(events: MIDIEvent[]) {
    this.events = events;

    this.initMeta();
    this.initNotesInfo();
  }

  private initMeta() {
    const [ deviceNameEvent ] = findEventsInTrack(this.events, MIDIEventName.Device_Name);
    if(deviceNameEvent) {
      this.deviceName = deviceNameEvent.string;
    }

    const [ trackNameEvent ] = findEventsInTrack(this.events, MIDIEventName.Sequence_Track_Name);
    if(trackNameEvent) {
      this.trackName = trackNameEvent.string;
    }
  }

  private initNotesInfo() {
    const noteEvents = findEventsInTrack(this.events, [MIDIEventName.Note_on, MIDIEventName.Note_off]);

    this.notes = noteEvents.map((noteEvent, index, array) => {
      if(noteEvent.name === MIDIEventName.Note_off) {
        return undefined;
      }

      const { noteNumber, noteName, velocity, tick } = noteEvent;

      const correspondentNoteOffEvent = array.slice(index + 1).find(postEvent => {
        return postEvent.name === MIDIEventName.Note_off && postEvent.noteNumber === noteNumber;
      });

      const { tick: endTick } = correspondentNoteOffEvent;

      return {
        noteName,
        noteNumber,
        velocity,
        duration: endTick - tick,
        startDelta: tick,
      }
    }).filter(Boolean);
  }
}

export default Track;