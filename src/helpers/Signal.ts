type SignalData = any;

type HandlerFunction = (d?: SignalData) => void;

class Signal {
  private handlers: HandlerFunction[];

  constructor() {
    this.handlers = [];
  }

  connect(handler: HandlerFunction, instance: any) {
    this.handlers.push(handler.bind(instance));
  }

  emit(d?: SignalData) {
    this.handlers.forEach(handler => handler(d));
  }
}

export default Signal;