import Signal from '../../../helpers/Signal';

import EnvelopeGenerator from './EnvelopeGenerator';

import { Level } from '../../types';

export enum EnvelopeStage {
  OFF = 'OFF',
  ATTACK = 'ATTACK',
  DECAY = 'DECAY',
  SUSTAIN = 'SUSTAIN',
  RELEASE = 'RELEASE',
}

const toFloat32 = (a: number[]) => {
  return new Float32Array(a);
}

class Envelope {
  private ctx: AudioContext;

  private currentStage: EnvelopeStage;
  private target: AudioParam;

  private minLevel: Level;
  private maxLevel: Level;

  private generator: EnvelopeGenerator
  
  finishedAttackStage: Signal;
  finishedDecayStage: Signal;
  finishedReleaseStage: Signal;

  private attackTimeoutId?: number;
  private decayTimeoutId?: number;
  private releaseTimeoutId?: number;

  constructor(ctx: AudioContext, target: AudioParam, minLevel: Level, maxLevel: Level, generator: EnvelopeGenerator) {
    this.ctx = ctx;

    this.minLevel = minLevel;
    this.maxLevel = maxLevel;

    this.target = target;  
    this.currentStage = EnvelopeStage.OFF;

    this.generator = generator;
        
    this.finishedAttackStage = new Signal();
    this.finishedDecayStage = new Signal();
    this.finishedReleaseStage = new Signal();

    this.attackTimeoutId = undefined;
    this.decayTimeoutId = undefined;
    this.releaseTimeoutId = undefined;
  }

  setMaxLevel(l: Level) {
    this.maxLevel = l;
  }

  resetTimers() {
    clearTimeout(this.attackTimeoutId);
    clearTimeout(this.decayTimeoutId);
    clearTimeout(this.releaseTimeoutId);

    this.attackTimeoutId = undefined;
    this.decayTimeoutId = undefined;
    this.releaseTimeoutId = undefined;
  }

  onEndAttack() {
    this.finishedAttackStage.emit();
    this.enterStage(EnvelopeStage.DECAY);
  }

  onEndDecay() {
    this.finishedDecayStage.emit();
    this.enterStage(EnvelopeStage.SUSTAIN);
  }

  onEndRelease() {
    this.finishedReleaseStage.emit();
    this.enterStage(EnvelopeStage.OFF);
  }

  enterStage(stage: EnvelopeStage) {
    if(this.currentStage === stage) return;

    this.resetTimers();

    this.target.cancelScheduledValues(0);

    this.currentStage = stage;

    switch (stage) {
      case EnvelopeStage.OFF:
        this.target.setValueAtTime(this.minLevel, this.ctx.currentTime);
        break;
      case EnvelopeStage.ATTACK:
        const attackDuration = this.generator.getAttack();

        this.target.setValueCurveAtTime(toFloat32([this.minLevel, this.maxLevel]), this.ctx.currentTime, attackDuration);
        this.attackTimeoutId = setTimeout(this.onEndAttack.bind(this), attackDuration * 1000);
        break;
      case EnvelopeStage.DECAY:
        const decayDuration = this.generator.getDecay();
        const sustainLevel = this.generator.getSustain();

        this.target.setValueCurveAtTime(toFloat32([this.target.value, sustainLevel]), this.ctx.currentTime, decayDuration);
        this.decayTimeoutId = setTimeout(this.onEndDecay.bind(this), decayDuration * 1000);
        break;
      case EnvelopeStage.SUSTAIN:
        // do nothing
        break;
      case EnvelopeStage.RELEASE:
        const releaseDuration = this.generator.getRelease();

        this.target.setValueCurveAtTime(toFloat32([this.target.value, this.minLevel]), this.ctx.currentTime, releaseDuration);
        this.releaseTimeoutId = setTimeout(this.onEndRelease.bind(this), releaseDuration * 1000);
        break;
    }
  }

  reset() {
    this.currentStage = EnvelopeStage.OFF;
  }
}

export default Envelope;