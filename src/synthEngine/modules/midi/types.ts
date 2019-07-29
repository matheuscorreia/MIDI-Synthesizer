import { Event as MIDIPlayerEvent, Track as MIDIPlayerTrack } from 'midi-player-js';

export type TrackMidiNote = {
  noteName: string;
  noteNumber: number;
  velocity: number;
  duration: number;
  startDelta: number;
}

export type MidiFileFormat = 0 | 1 | 2 | number;

export enum MIDIEventName {
  Sequence_Number = "Sequence Number",
  Text_Event = "Text Event",
  Copyright_Notice = "Copyright Notice",
  Sequence_Track_Name = "Sequence/Track Name",
  Instrument_Name = "Instrument Name",
  Lyric = "Lyric",
  Marker = "Marker",
  Cue_Point = "Cue Point",
  Device_Name = "Device Name",
  MIDI_Channel_Prefix = "MIDI Channel Prefix",
  MIDI_Port = "MIDI Port",
  End_of_Track = "End of Track",
  Set_Tempo = "Set Tempo",
  SMTPE_Offset = "SMTPE Offset",
  Time_Signature = "Time Signature",
  Key_Signature = "Key Signature",
  Sequencer_Specific_Meta_event = "Sequencer-Specific Meta-event",
  Sysex = "Sysex",
  Note_off = "Note off",
  Note_on = "Note on",
  Polyphonic_Key_Pressure = "Polyphonic Key Pressure",
  Controller_Change = "Controller Change",
  Program_Change = "Program Change",
  Channel_Key_Pressure = "Channel Key Pressure",
  Pitch_Bend = "Pitch Bend",
}

export interface MIDITrack extends MIDIPlayerTrack {}

export interface MIDIEvent extends MIDIPlayerEvent {
  name: MIDIEventName;

  timeSignature?: string;
  keySignature?: string;
}