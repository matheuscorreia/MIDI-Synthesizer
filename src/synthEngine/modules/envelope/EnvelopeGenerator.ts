import { Duration, Level } from '../../types';

class EnvelopeGenerator {
  private attack: Duration;
  private decay: Duration;
  private sustain: Level;
  private release: Duration;

  constructor(attack: Duration, decay: Duration, sustain: Level, release: Duration) {
    this.attack = attack;
    this.decay = decay;
    this.sustain = sustain;
    this.release = release;
  }

  getAttack() {
    return this.attack;
  }

  getDecay() {
    return this.decay;
  }

  getSustain() {
    return this.sustain;
  }

  getRelease() {
    return this.release;
  }

  setAttack(attack: Duration) {
    this.attack = attack;
  }

  setDecay(decay: Duration) {
    this.decay = decay;
  }

  setSustain(sustain: Level) {
    this.sustain = sustain;
  }

  setRelease(release: Duration) {
    this.release = release;
  }
}

export default EnvelopeGenerator;