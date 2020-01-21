import { OctaveParam, UnisonParam, OscillatorMode, MidiOctave } from '../../types';

import Signal from '../../../helpers/Signal';

const centerOctave: MidiOctave = 4;

class Oscillator {
  private mode: OscillatorMode;
  private octave: OctaveParam;
  private unison: UnisonParam;

  onChange: Signal;

  constructor() {
    this.mode = OscillatorMode.Sawtooth;
    this.unison = 1;
    this.octave = 0;

    this.onChange = new Signal();
  }

  getMode() {
    return this.mode;
  }

  setMode(mode: OscillatorMode) {
    this.mode = mode;

    this.onChange.emit();
  }

  getUnison() {
    return this.unison;
  }

  getMidiOctave(): MidiOctave {
    return centerOctave + this.octave;
  }
}

export default Oscillator;