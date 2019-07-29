import MidiPlayer from 'midi-player-js';

import Signal from '../../../helpers/Signal';

import MidiReceiver from './MidiReceiver';
import Song from './Song';

import MidiFilePaths from './tracks';

class MidiReader {
  private player: MidiPlayer.Player;
  private receiver: MidiReceiver;

  private currentSongId?: string;
  private currentSong?: Song;

  private trackLoaded: Signal;

  constructor(receiver: MidiReceiver) {
    this.receiver = receiver;

    this.player = new MidiPlayer.Player(this.onMidiEvent.bind(this));

    this.trackLoaded = new Signal();
  }

  private onMidiEvent(e: MidiPlayer.Event) {
    if (e.name == 'Note off') {
      this.receiver.releaseMidiKey(e.noteNumber);
    }

    if (e.name == 'Note on' && e.velocity > 0) {
      this.receiver.pressMidiKey(e.noteNumber, e.velocity/100);
    }
  }

  onTrackLoaded(handler: (trackId: string) => void) {
    this.trackLoaded.connect(handler, this);
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  loadTrack(songId: any) {
    if(songId === this.currentSongId) return;

    if(this.player.isPlaying()) this.player.stop();

    fetch(MidiFilePaths[songId])
      .then(a => a.blob())
      .then(b => {
        const r = new FileReader();
        r.onloadend = () => {
          this.player.loadDataUri(r.result as string);
          this.player.fileLoaded();

          const songEvents = this.player.getEvents() as any;

          this.currentSong = new Song(songEvents, this.player.format, this.player.division);

          this.currentSongId = songId;

          console .log(this.currentSong);

          setTimeout(() => this.trackLoaded.emit(this.currentSongId), 1000)
        };
        r.readAsDataURL(b);
      });
  }
  
  getCurrentSong() {
    return this.currentSong;
  }
}

export default MidiReader;