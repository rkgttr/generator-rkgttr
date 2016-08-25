var Tooltip = (function() {
  'use strict';

  var Tooltip = {
    init: ()=> {
      [].forEach.call(document.querySelectorAll('[data-tooltip]'), (el)=> {
        let tt = document.createElement('div');
        tt.classList.add('tooltip-text');
        tt.innerHTML = el.getAttribute('data-tooltip');
        el.removeAttribute('data-tooltip');
        el.appendChild(tt);
      })
    }
  };

  return Tooltip;
}());