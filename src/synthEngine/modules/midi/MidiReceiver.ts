import Signal from '../../../helpers/Signal';

class MidiReceiver {
  noteOn: Signal;
  noteOff: Signal;

  releaseAllNotes: Signal;

  constructor() {
    this.noteOn = new Signal();
    this.noteOff = new Signal();

    this.releaseAllNotes = new Signal();
  }

  pressVirtualKey(noteNumber: number) {
    this.pressMidiKey(noteNumber, 1);
  }

  releaseVirtualKey(noteNumber: number) {
    this.releaseMidiKey(noteNumber);
  }

  pressMidiKey(noteNumber: number, velocity: number) {
    this.noteOn.emit({ noteNumber, velocity, });
  }

  releaseMidiKey(noteNumber: number) {
    this.noteOff.emit({ noteNumber });
  }

  releaseAll() {
    this.releaseAllNotes.emit();
  }
}

export default MidiReceiver;