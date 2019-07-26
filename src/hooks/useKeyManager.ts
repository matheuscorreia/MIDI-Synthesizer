import { useRef, useEffect, useState, useContext } from 'react';

import SynthEngineContext from '../components/contexts/SynthEngineContext';

const simulateMouseEvent = (elem: HTMLButtonElement, event: string) => {
  const e = new MouseEvent(event, {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });

  elem.dispatchEvent(e)
}

function attachButtonToKeyPress(targetKeyCode: number, elem: HTMLButtonElement) {
  function downHandler({ which: keyCode }: KeyboardEvent) {
    if (keyCode === targetKeyCode) {
      simulateMouseEvent(elem, 'mousedown');
    }
  }

  const upHandler = ({ which: keyCode }: KeyboardEvent) => {
    if (keyCode === targetKeyCode) {
      simulateMouseEvent(elem, 'mouseup');
    }
  };

  window.addEventListener('keydown', downHandler);
  window.addEventListener('keyup', upHandler);

  const cleanup = () => {
    window.removeEventListener('keydown', downHandler);
    window.removeEventListener('keyup', upHandler);
  };

  return cleanup;
};

type ButtonRef = React.MutableRefObject<HTMLButtonElement | null>;
type IsPressedSetter = (s: boolean) => void;

const useKeyManager = (noteNumber: number, targetKeyCode?: number): [IsPressedSetter, boolean, ButtonRef] => {
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const [ isPressed, setIsPressed ] = useState(false);

  const synthEngine = useContext(SynthEngineContext);

  useEffect(() => {
    const keyElem = buttonRef.current!;

    const downHandler = () => {
      setIsPressed(true);
      synthEngine.getMidiReceiver().pressVirtualKey(noteNumber);
    };
    const upHandler = () => {
      setIsPressed(false);
      synthEngine.getMidiReceiver().releaseVirtualKey(noteNumber);
    };
    const leaveWhileDownHandler = upHandler;

    // this is used to replicate an `active` state when the button is clicked
    // either with the mouse or keyboard. All of this because dispatched events
    // are not trusted, so javascript calls `preventDefault()` on those events.
    keyElem.addEventListener('mousedown', downHandler);
    keyElem.addEventListener('mouseup', upHandler);
    keyElem.addEventListener('mouseout', leaveWhileDownHandler);

    const cleanupAdditionalMouseListeners = () => {
      keyElem.removeEventListener('mousedown', downHandler);
      keyElem.removeEventListener('mouseup', upHandler);
      keyElem.removeEventListener('mouseout', leaveWhileDownHandler);
    }

    // `attachButtonToKeyPress` will listen for the pressing of a particular keycode
    // and then will dispatch a click event to element passed as second argument.
    // We need this to allow click and keyboard input to have the same effect.
    const cleanupKeyboardListeners = targetKeyCode ? attachButtonToKeyPress(targetKeyCode, keyElem) : undefined;
    
    return () => {
      if(cleanupKeyboardListeners) {
        cleanupKeyboardListeners();
      }

      cleanupAdditionalMouseListeners();
    };
  }, [buttonRef, targetKeyCode, synthEngine]);

  return [setIsPressed, isPressed, buttonRef];
};

export default useKeyManager;