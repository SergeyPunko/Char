export class Socket {
  _messageHandler = null;
  _type = '';

  _messageEventListener() {
    const message = localStorage.getItem(this._type);

    if (this._messageHandler && message) {
      this._messageHandler(JSON.parse(message));
    }
  }

  constructor(type = '') {
    this._type = type;
    window.addEventListener('storage', this._messageEventListener.bind(this));
  }

  send(entity) {
    localStorage.setItem(this._type, JSON.stringify(entity));

    setTimeout(() => window.dispatchEvent(new Event('storage')));
  }

  onMessage(handler) {
    this._messageHandler = handler;
  }

  close() {
    window.removeEventListener('storage', this._messageEventListener.bind(this));
  }
}
