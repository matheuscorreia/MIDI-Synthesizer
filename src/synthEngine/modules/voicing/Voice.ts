import Oscillator from '../oscillator/Oscillator';
import Envelope from '../envelope/Envelope';
import EnvelopeGenerator from '../envelope/EnvelopeGenerator';
import { Velocity, NoteNumber, UnitInterval } from '../../types';

const defaultPitchStd = 440;

class Voice {
  private ctx: AudioContext;

  private velocity: UnitInterval;
  private noteNumber: NoteNumber | null;
  private isActive: boolean;

  private mainSource: OscillatorNode;

  private oscillator: Oscillator;

  private volumeEnvelope: Envelope;

  private gainNode: GainNode;

  constructor(ctx: AudioContext, oscillator: Oscillator, volumeEnvelopeGenerator: EnvelopeGenerator) {
    this.ctx = ctx;

    this.noteNumber = null;
    this.velocity = 0;
    this.isActive = false;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    this.oscillator = oscillator;
    this.volumeEnvelope = new Envelope(this.ctx, this.gainNode.gain, 0, 1, volumeEnvelopeGenerator);

    this.mainSource = this.ctx.createOscillator();
    this.mainSource.type = this.oscillator.getMode();

    this.mainSource.connect(this.gainNode);
    this.mainSource.start();

    this.volumeEnvelope.finishedReleaseStage.connect(this.setFree, this);
    this.oscillator.onChange.connect(this.onOscillatorChange, this);
  }

  private noteNumberToFrequency(m: NoteNumber) {
    return Math.pow(2, (m - 69) / 12) * defaultPitchStd;
  }

  onOscillatorChange() {
    this.mainSource.disconnect();
    this.mainSource.stop();

    const f = this.noteNumber ? this.noteNumberToFrequency(this.noteNumber) : undefined;

    this.mainSource = this.ctx.createOscillator();
    this.mainSource.type = this.oscillator.getMode();
    if(f) {
      this.mainSource.frequency.setValueAtTime(f, this.ctx.currentTime);
    }

    this.mainSource.connect(this.gainNode);
    this.mainSource.start();
  }

  getOutputNode() {
    return this.gainNode;
  }

  getNoteNumber() {
    return this.noteNumber;
  }

  getIsActive() {
    return this.isActive;
  }

  getVolumeEnvelope() {
    return this.volumeEnvelope;
  }

  reset() {
    this.volumeEnvelope.reset();
    this.noteNumber = null;
    this.velocity = 0;
  }

  setFree() {
    this.isActive = false;
  }
  
  setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }

  setVelocity(velocity: Velocity) {
    this.velocity = velocity;
    this.volumeEnvelope.setMaxLevel(this.velocity);
  }

  setNoteNumber(noteNumber: NoteNumber) {
    this.noteNumber = noteNumber;

    const f = this.noteNumberToFrequency(this.noteNumber);

    this.mainSource.frequency.setValueAtTime(f, this.ctx.currentTime);
  }
}

export default Voice;