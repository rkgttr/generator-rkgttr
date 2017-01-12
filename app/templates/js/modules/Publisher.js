class PublisherClass {
  constructor(scope) {
    if (scope.PublisherInstance === undefined) {
      this._events_ = {};
      scope.PublisherInstance = this;
    }
    return scope.PublisherInstance;
  }

  on(type, handler) {
    if (!handler) {
      const err = new ReferenceError('handler not defined.');
      throw (err);
    }

    if (!this._events_[type]) {
      this._events_[type] = [];
    }

    this._events_[type].push(handler);
    return this;
  }

  off(type, handler) {
    if (!this._events_[type]) {
      return this;
    }

    if (!handler) {
      var err = new ReferenceError('handler not defined. if you wish to remove all handlers from the event please pass "*" as the handler');
      throw err;
    }

    if (handler == '*') {
      delete this._events_[type];
      return this;
    }

    const handlers = this._events_[type];

    while (handlers.includes(handler)) {
      handlers.splice(
        handlers.indexOf(handler),
        1
      );
    }

    if (handlers.length < 1) {
      delete this._events_[type];
    }

    return this;
  }

  trigger(type, ...args) {
    if (!this._events_[type]) {
      return this.emit$(type, ...args);
    }

    const handlers = this._events_[type];

    for (let handler of handlers) {
      handler.apply(this, args);
    }

    return this.emit$(type, ...args);
  }

  emit$(type, ...args) {
    if (!this._events_['*']) {
      return this;
    }

    const catchAll = this._events_['*'];

    for (let handler of catchAll) {
      handler.call(this, type, ...args);
    }

    return this;
  }
}

const pub = new PublisherClass(window);
export { pub as default };
