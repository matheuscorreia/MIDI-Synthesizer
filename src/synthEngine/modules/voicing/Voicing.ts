import Oscilator from '../oscillator/Oscillator';
import MidiReceiver from '../midi/MidiReceiver';
import { EnvelopeStage } from '../envelope/Envelope';
import EnvelopeGenerator from '../envelope/EnvelopeGenerator';

import Voice from './Voice';

/** Maps a keyID to a voice array index */
type KeyVoiceMap = {
  [keyId: number]: number;
}

class Voicing {
  /** How many notes the synth is able to play. This setting can be adjusted by the user. */
  private polyphony: number;

  /** Total of voices the synth has available. In default, this will be the same as `polyphony`, but will change if the oscillator is in unison mode. */
  private voicesTotal: number;

  private voices: Voice[];

  private gainNode: GainNode;

  constructor(
    ctx: AudioContext,
    oscillator: Oscilator,
    midiReceiver: MidiReceiver,
    volumeEnvelope: EnvelopeGenerator,
  ) {
    this.polyphony = 32;
    this.voicesTotal = this.polyphony;

    this.voices = Array.from({ length: this.voicesTotal }, () => {
      return new Voice(ctx, oscillator, volumeEnvelope);
    });

    this.gainNode = ctx.createGain();
    this.voices.forEach(voice => voice.getOutputNode().connect(this.gainNode));
    this.gainNode.gain.setValueAtTime(1, ctx.currentTime);

    midiReceiver.noteOn.connect(this.onNoteOn, this);
    midiReceiver.noteOff.connect(this.onNoteOff, this);

    midiReceiver.releaseAllNotes.connect(this.onReleaseAllNotes, this);
  }

  getOutputNode() {
    return this.gainNode;
  }

  findFreeVoice() {
    return this.voices.find(voice => !voice.getIsActive());
  }

  onNoteOn({ noteNumber, velocity }: any) {
    const freeVoice = this.findFreeVoice();
    if(!freeVoice) return;

    freeVoice.reset();
    freeVoice.setNoteNumber(noteNumber);
    freeVoice.setVelocity(velocity / 5);
    freeVoice.setIsActive(true);
    freeVoice.getVolumeEnvelope().enterStage(EnvelopeStage.ATTACK);
  }

  onNoteOff({ noteNumber }: any) {
    this.voices.forEach(voice => {
      if(voice.getNoteNumber() === noteNumber && voice.getIsActive()) {
        voice.getVolumeEnvelope().enterStage(EnvelopeStage.RELEASE);
      }
    });
  }

  onReleaseAllNotes() {
    this.voices.forEach(voice => {
      voice.getVolumeEnvelope().enterStage(EnvelopeStage.RELEASE)
    });
  }

}

export default Voicing;