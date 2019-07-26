import MidiPlayer from 'midi-player-js';

import MidiReceiver from './MidiReceiver';

class MidiReader {
  player: MidiPlayer.Player;
  receiver: MidiReceiver;

  constructor(receiver: MidiReceiver) {
    this.receiver = receiver;

    this.player = new MidiPlayer.Player((e: MidiPlayer.Event) => {
      if (e.name == 'Note off') {
        this.receiver.releaseMidiKey(e.noteNumber);
      }

      if (e.name == 'Note on' && e.velocity > 0) {
        this.receiver.pressMidiKey(e.noteNumber, e.velocity/100);
			}
    });
  }

  loadFile(path: string) {
    fetch(path)
      .then(a => a.blob())
      .then(b => {
        const r = new FileReader();

        r.onloadend = () => {
          this.player.loadDataUri(r.result as string);

          this.player.play();
        };

        r.readAsDataURL(b);

      });
    console.log(typeof path);
    // this.player.loadFile(path);
  } 
}

export default MidiReader;