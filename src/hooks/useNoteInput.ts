import { useEffect, useContext } from 'react';

import SynthEngineContext from '../components/contexts/SynthEngineContext';

const useNoteInput = (isPressed: boolean, keyID: number) => {
  const synthEngine = useContext(SynthEngineContext)!;

  useEffect(() => {
    if(isPressed) {
      synthEngine.getMidiReceiver().pressVirtualKey(keyID);
    } else {
      synthEngine.getMidiReceiver().releaseVirtualKey(keyID);
    }
  }, [isPressed, keyID, synthEngine]);
};

export default useNoteInput;