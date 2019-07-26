/** Represents a time duration in milliseconds. Used to define Envelope params. Goes from 0.0 to 32000.0 */
export type Duration = number;
/** Represents a valid double value between 0 and 1. */
export type UnitInterval = number;
/** Represents a certain frequency in Hz. Eg.: 440.0, 261.63 */
export type Frequency = number;
/** Represents a key on the keyboard. Goes from 0 to 11, following the chromatic scale. */
export type KeyID = number;
/** Represents a musical octave used to calculate note frequency. Goes from 0 to 9. */
export type MidiOctave = number;
/** Represents a MIDI note number identifier. Goes from 0 to 127. */
export type NoteNumber = number;
/** Represents the octave parameter on the oscilator, which starts at 0 and can go 4 octaves up or down. These are not musical octaves. Just a visual representation of them */
export type OctaveParam = number;
/** Represents the unison parameter on the oscillator, which start at 0 and can go all the way to 16. */
export type UnisonParam = number;
/** Types of waves that the Oscillator can produce. */
export enum OscillatorMode {
  Sine = 'sine',
  Square = 'square',
  Sawtooth = 'sawtooth',
  Triangle = 'triangle',
}

export type Velocity = UnitInterval;
export type Level = UnitInterval;