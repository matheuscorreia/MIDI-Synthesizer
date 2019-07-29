import { useContext, useEffect, useState } from 'react';

import SynthEngineContext from '../../components/contexts/SynthEngineContext';

const useCurrentSong = () => {
  const synthEngine = useContext(SynthEngineContext);

  const midiReader = synthEngine.getMidiReader();

  const [ currentSong, setCurrentSong ] = useState(midiReader.getCurrentSong());

  midiReader.onTrackLoaded(() => {
    setCurrentSong(midiReader.getCurrentSong());
  });

  return currentSong;
}

export default useCurrentSong;