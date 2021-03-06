// Modules
import Voicing from './modules/voicing/Voicing';
import Oscillator from './modules/oscillator/Oscillator';
import MidiReceiver from './modules/midi/MidiReceiver';
import MidiReader from './modules/midi/MidiReader';
import EnvelopeGenerator from './modules/envelope/EnvelopeGenerator';

import MidiFilePaths from './modules/midi/tracks';

class SynthEngine {
  private ctx: AudioContext;

  private gainNode: GainNode;

  // Modules
  private oscillator: Oscillator;
  private midiReceiver: MidiReceiver;
  private midiReader: MidiReader;
  private volumeEnvelope: EnvelopeGenerator;
  private voicing: Voicing;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(1, this.ctx.currentTime);

    this.oscillator = new Oscillator();

    this.midiReceiver = new MidiReceiver();
    this.midiReader = new MidiReader(this.midiReceiver);
    setTimeout(() => {
      this.midiReader.loadTrack('BLOODY_TEARS');
    }, 2000);

    this.midiReader.onTrackLoaded(() => this.midiReader.play())
    this.volumeEnvelope = new EnvelopeGenerator(0.01, 0.5 , 0.1, 0.2);
    this.voicing = new Voicing(
      this.ctx,
      this.oscillator,
      this.midiReceiver,
      this.volumeEnvelope,
    );

    this.voicing.getOutputNode().connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);
  }

  getMidiReceiver() {
    return this.midiReceiver;
  }

  getMidiReader() {
    return this.midiReader;
  }

  getVolumeEnvelope() {
    return this.volumeEnvelope;
  }

  getOscillator() {
    return this.oscillator;
  }
}

export default SynthEngine;