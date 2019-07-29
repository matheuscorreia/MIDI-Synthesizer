import { MIDIEventName, MIDIEvent } from './types';

export const findEventsInTrack = (trackEvents: MIDIEvent[], eventNames: MIDIEventName | MIDIEventName[]) => {
  return trackEvents.filter(event => {
    if(Array.isArray(eventNames)) {
      return eventNames.includes(event.name);
    } else {
      return event.name === eventNames;
    }
  });
}