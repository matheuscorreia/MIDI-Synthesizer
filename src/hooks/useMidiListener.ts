import { useContext } from 'react';
import SynthEngineContext from '../components/contexts/SynthEngineContext';

const useMidiListener = (noteNumber: number, setIsPressed: (b: boolean) => void) => {
  const synthEngine = useContext(SynthEngineContext);

  synthEngine.getMidiReceiver().noteOn.connect((data: any) => {
    if(noteNumber === data.noteNumber) {
      setIsPressed(true);
    }
  }, null);

  synthEngine.getMidiReceiver().noteOff.connect((data: any) => {
    if(noteNumber === data.noteNumber) {
      setIsPressed(false);
    }
  }, null);
}

export default useMidiListener;