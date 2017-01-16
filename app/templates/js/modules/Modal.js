import Router from 'Router';
import * as Q from 'Q';
import { whichAnimationEvent } from 'Helpers';

export default function() {
  let router = new Router(),
    animationEvent = whichAnimationEvent(),
    focusHandler = e => {
      if (!modal.contains(e.target)) {
        e.stopPropagation();
        modal.focus();
      }
    },
    escapeHandler = e => {
      if (e.keyCode === 27) {
        closeModal();
      }
    },
    animationHandler = e => {
      modal.classList.remove('modal-closing');
      wrapper.removeEventListener(animationEvent, animationHandler);
      document.body.classList.remove('modal-opened');
      modal = null;
      wrapper = null;
      closeBtn = null;
    },
    closeModal = e => {
      if (e) {
        e.preventDefault();
      }
      if (modal) {
        history.back();
        window.removeEventListener('keyup', escapeHandler);
        document.removeEventListener('focus', focusHandler, true);
        closeBtn.removeEventListener('click', closeModal);
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-label');
        if (animationEvent) {
          modal.classList.add('modal-closing');
          wrapper.addEventListener(animationEvent, animationHandler);
        } else {
          document.body.classList.remove('modal-opened');
          modal = null;
          wrapper = null;
          closeBtn = null;
        }
      }
    },
    modal,
    wrapper,
    closeBtn;

  router.addRoutes({
    route: '#modal/:modalId',
    handler: (modalId, e) => {
      modal = Q.id('modal/' + modalId);
      wrapper = Q.one('.modal-wrapper', modal);
      closeBtn = Q.one('.modal-close', modal);
      modal.setAttribute('aria-hidden', 'false');
      modal.setAttribute('tabindex', '0');
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-label', 'Dialog window, press escape to close');
      closeBtn.setAttribute(
        'aria-label',
        'Press escape to close the dialog window'
      );
      closeBtn.setAttribute('role', 'button');
      window.addEventListener('keyup', escapeHandler);
      document.addEventListener('focus', focusHandler, true);
      document.body.classList.add('modal-opened');
      closeBtn.addEventListener('click', closeModal);
    }
  });
}
