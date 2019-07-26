declare global {
  interface Window {
    AudioContext?: AudioContext;
    webkitAudioContext?: AudioContext;
  }
}

const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;

export default AudioContext as AudioContext | undefined;