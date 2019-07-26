import { MutableRefObject, useEffect, useRef } from "react";

type HandlersMap = {
  mousedown: (e: MouseEvent) => void;
  mouseup: (e: MouseEvent) => void;
  mousemove: (e: MouseEvent) => void;
}

// @TODO: make accessible
class Knob {
  private input: HTMLInputElement;

  private handleChange: (newValue: number) => void;

  // drag
  isDragActive: boolean;
  private dragResistance: number;
  private dragStartPosition?: number;
  private prevValue?: number;

  private handlers: HandlersMap;

  constructor(ref: HTMLInputElement, opts: Options) {
    this.input = ref;

    this.handleChange = opts.handleChange;

    this.isDragActive = false;
    this.dragResistance = opts.dragResistance ? opts.dragResistance : 50;

    this.handlers = {
      mousedown: this.handleMouseDown.bind(this),
      mouseup: this.handleMouseUp.bind(this),
      mousemove: this.handleMouseMove.bind(this),
    }

    // add initial listeners
    this.input.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  clampValue(value: number) {
    const min = Number(this.input.min);
    const max = Number(this.input.max);

    return Math.min(Math.max(value, min), max)
  }

  updateDrag(yPosition: number) {
    const dragAmount = yPosition - this.dragStartPosition!;

    const boundlessNewValue = this.prevValue! - (this.dragResistance > 0 ? dragAmount / this.dragResistance : dragAmount);

    var newValue = this.clampValue(boundlessNewValue);

    this.input.value = String(newValue);

    this.handleChange(newValue);
  }

  startDrag(yPosition: number) {
    this.dragStartPosition = yPosition;
    this.prevValue = Number(this.input.value);

    this.input.focus();
  }

  finishDrag() {
    this.isDragActive = false;
    this.dragStartPosition = undefined;
    this.prevValue = undefined;

    document.body.removeEventListener('mousemove', this.handlers.mousemove);
    document.body.removeEventListener('mouseup', this.handlers.mouseup);
  }

  handleMouseDown(e: MouseEvent) {
    e.preventDefault();

    this.isDragActive = true;

    this.startDrag(e.clientY);

    // add drag event listeners
    document.body.addEventListener('mousemove', this.handlers.mousemove);
    document.body.addEventListener('mouseup', this.handlers.mouseup);
  }

  handleMouseUp(e: MouseEvent) {
    e.preventDefault();

    this.isDragActive = true;

    this.startDrag(e.clientY);

    // remove listeners
    document.body.removeEventListener('mousemove', this.handlers.mousemove);
    document.body.removeEventListener('mouseup', this.handlers.mouseup);
  }

  handleMouseMove(e: MouseEvent) {
    if(e.button === 0) {
      this.updateDrag(e.clientY);
    } else {
      this.finishDrag();
    };
  }
};

type Options = {
  handleChange: (newValue: number) => void;
  dragResistance?: number;
}

const useKnob = (ref: MutableRefObject<HTMLInputElement | null>, opts: Options) => {
  const knobController = useRef<Knob | null>(null);
  // const [ dragging, setDragging ] = useState(false);

  useEffect(() => {
    if(!ref || !ref.current) return;

    knobController.current = new Knob(ref.current, opts);
  }, [ref, opts]);

  // useEffect(() => {
  //   setDragging(knobController.current!.isDragActive);

  // }, [knobController.current.isDragActive])
}

export default useKnob;