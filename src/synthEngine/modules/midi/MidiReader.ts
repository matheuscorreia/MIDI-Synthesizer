import MidiPlayer, { Player } from 'midi-player-js';

import Signal from '../../../helpers/Signal';

import MidiReceiver from './MidiReceiver';

import MidiFilePaths from './tracks';

class MidiReader {
  player: MidiPlayer.Player;
  private receiver: MidiReceiver;
  trackPlaying?: keyof MidiFilePaths;
  currentTime?: number;

  trackChange: Signal;
  playPauseStatusChange: Signal;
  playbackSecond: Signal;

  constructor(receiver: MidiReceiver) {
    this.receiver = receiver;

    this.player = new MidiPlayer.Player(this.onMidiEvent.bind(this));

    this.player.on('playing', ({ tick }: { tick: Player['tick'] }) => {
      const bpm = this.player.tempo;
      const ppq = this.player.division;

      const msPerTick = 60000/(bpm * ppq);
      const s = Math.floor((tick * msPerTick)/1000);

      if(this.currentTime !== s) {
        this.playbackSecond.emit(s);
      }
    });

    this.trackChange = new Signal();
    this.playPauseStatusChange = new Signal();
    this.playbackSecond = new Signal();
  }

  private onMidiEvent(e: MidiPlayer.Event) {
    if (e.name == 'Note off') {
      this.receiver.releaseMidiKey(e.noteNumber);
    }

    if (e.name == 'Note on' && e.velocity > 0) {
      this.receiver.pressMidiKey(e.noteNumber, e.velocity/100);
    }
  }

  play() {
    this.player.play();
    this.playPauseStatusChange.emit(true);
  }

  pause() {
    this.player.pause();
    this.receiver.releaseAllNotes.emit();
    this.playPauseStatusChange.emit(false);
  }

  loadTrack(trackId: any) {
    if(trackId === this.trackPlaying) return;

    if(this.player.isPlaying()) this.player.stop();

    fetch(MidiFilePaths[trackId])
      .then(a => a.blob())
      .then(b => {
        const r = new FileReader();
        r.onloadend = () => {
          this.player.loadDataUri(r.result as string);
          this.player.fileLoaded();
          this.trackPlaying = trackId;
          this.trackChange.emit(this.trackPlaying);
        };
        r.readAsDataURL(b);
      });
  } 
}

export default MidiReader;