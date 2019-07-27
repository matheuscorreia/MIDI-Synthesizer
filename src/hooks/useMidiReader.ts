import { useContext, useState, useEffect } from 'react';

import SynthEngineContext from '../components/contexts/SynthEngineContext';

export const useIsPlaying = () => {
  const synthEngine = useContext(SynthEngineContext);

  const midiReader = synthEngine.getMidiReader();

  const [ isPlaying, setIsPlaying ] = useState<boolean>();

  midiReader.playPauseStatusChange.connect((isPlaying: boolean) => {
    setIsPlaying(isPlaying);
  }, null);

  return isPlaying;
}

export const useCurrentTime = () => {
  const synthEngine = useContext(SynthEngineContext);

  const midiReader = synthEngine.getMidiReader();

  const [ currentTrackDuration, setCurrentTrackDuration ] = useState<number | undefined>();
  const [ remainingPercentage, setRemainingPercentage] = useState<number | undefined>();

  midiReader.playbackSecond.connect((seconds: number) => {
    setCurrentTrackDuration(seconds);
    setRemainingPercentage(midiReader.player.getSongPercentRemaining());
  }, null);

  return {
    currentTime: currentTrackDuration,
    remainingPercentage,
  };
}

export const useTrackInfo = () => {
  const synthEngine = useContext(SynthEngineContext);
  const midiReader = synthEngine.getMidiReader();

  const [ currentTrackId, setCurrentTrackId ] = useState<string | undefined>();
  const [ totalTrackDuration, setTotalTrackDuration ] = useState<number | undefined>();

  midiReader.trackChange.connect((trackId?: string) => {
    setTotalTrackDuration(midiReader.player.getSongTime());
    setCurrentTrackId(trackId);
  }, null);

  return {
    currentTrackId,
    totalTrackDuration,
  };
}

export const useMidiControls = () => {
  const synthEngine = useContext(SynthEngineContext);
  const midiReader = synthEngine.getMidiReader();

  return {
    play: midiReader.play.bind(midiReader),
    pause: midiReader.pause.bind(midiReader),
    loadTrack: midiReader.loadTrack.bind(midiReader),
  };
}