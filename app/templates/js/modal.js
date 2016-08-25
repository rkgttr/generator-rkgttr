class Modal {
  constructor(element = document.body, { overlayClassName = 'modal-overlay', modalClassName = 'modal', wrapperClassName = 'modal-wrapper', contentClassName = 'modal-content', closeButtonClassName = 'modal-close' } = {}) {
    this.target = element;
    if (!this.isOpened) {
      this._init(overlayClassName, modalClassName, wrapperClassName, contentClassName, closeButtonClassName);
    }
  }
  _init(...options) {
    this.overlay = document.createElement('div');
    this.overlay.className = options[0];
    this.overlay.setAttribute('tabindex', -1);

    this.modalWindow = document.createElement('div');
    this.modalWindow.className = options[1];
    this.modalWindow.setAttribute('role', 'dialog');
    this.modalWindow.setAttribute('tabindex', 0);

    this.modalWrapper = document.createElement('div');
    this.modalWrapper.className = options[2];

    this.modalContent = document.createElement('div');
    this.modalContent.className = options[3];

    this.closeButton = document.createElement('button');
    this.closeButton.className = options[4];
    this.closeButton.innerHTML = 'Close';
    this.closeButton.setAttribute('type', 'button');

    this.closeButton.addEventListener('click', e => this.close());


    this.modalWindow.appendChild(this.modalWrapper);
    this.modalWrapper.appendChild(this.modalContent);
    this.modalWindow.appendChild(this.closeButton);
  }

  _focusHandler(e) {
    try {
      if (!this.modalWrapper.contains(e.target)) {
        e.stopPropagation();
        this.modalContent.focus();
      }
    } catch(e){ }
  }

  _escapeHandler(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }

  _whichAnimationEvent() {
    let t,
      el = document.createElement('div'),
      animations = {
      'animation': 'animationend',
      'OAnimation': 'oAnimationEnd',
      'MozAnimation': 'Animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    };

    for (t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  }

  _close(callback){

    
    for (var i = 0, len = this.target.children.length; i < len; i++) {
      this.target.children[i].removeAttribute('aria-hidden');
    }

    if (this.trigger) {
      this.trigger.focus();
      this.trigger = null;
    }
    this.target.removeChild(this.modalWindow);
    this.target.removeChild(this.overlay);

    this.isOpen = false;

    if (callback) {
      callback.call(this);
    }
  }



  open(content, callback) {
    if (this.isOpen) {
      return;
    }

    if (content) {
      this.update(content);
    }

    for (let i = 0, len = this.target.children.length; i < len; i++) {
      this.target.children[i].setAttribute('aria-hidden', true);
    }
    document.body.classList.add('modal-open');
    this.target.appendChild(this.overlay);
    this.target.appendChild(this.modalWindow);

    window.addEventListener('focus', e => this._focusHandler(e), false);
    window.addEventListener('keyup', e => this._escapeHandler(e), false);

    this.trigger = document.activeElement;
    this.modalWindow.focus();

    this.isOpen = true;

    if (callback) {
      callback.call(this);
    }
  }

  update(content) {
    this.modalContent.innerHTML = content;
  }

  close(callback) {
    window.removeEventListener('focus', this._focusHandler, false);
    window.removeEventListener('keyup', this._escapeHandler, false);
    document.body.classList.remove('modal-open');
    let animationEvent = this._whichAnimationEvent();
    if(animationEvent) {
      this.overlay.classList.add('modal-overlay-fade-out');
      this.modalWindow.classList.add('modal-fade-out');
      this.overlay.addEventListener(animationEvent, e => this._close());
    } else {
      this._close();
    }
  }

  teardown() {
    if (this.isOpen) {
      this.close();
    }

    delete this.escapeHandler;
    delete this.focusHandler;

    delete this.closeButton;
    delete this.modalContent;
    delete this.modalWrapper;
    delete this.modalWindow;
    delete this.overlay;

    delete this.trigger;
    delete this.isOpen;
  }
}
