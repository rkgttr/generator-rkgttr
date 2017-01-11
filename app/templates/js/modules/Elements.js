/*! @source https://github.com/davidgilbertson/know-it-all */
/**
 * Build components easily
 * Example:
 *
import {div, img, h2, p, a} from 'Elements';
const MediaObject = ()=> {
  return div({className: 'media'},
    a({className: 'img', href:'http://www.google.com'},
      img({src:'http://placehold.it/350x150', alt:'Alt text'})
    ),
    div({className: 'bd'},
      h2('Hello'),
      p('I am some stuff')
    )
  );
};
document.body.appendChild(MediaObject());


 */

const attributeExceptions = [
  `role`,
  `dataset`,
  `d`,
  `width`,
  `height`,
  `viewBox`,
];

const SVG_NAMESPACE = `http://www.w3.org/2000/svg`;

function appendText(el, text) {
  const textNode = document.createTextNode(text);
  el.appendChild(textNode);
}

function appendArray(el, children) {
  children.forEach((child) => {
    if (Array.isArray(child)) {
      appendArray(el, child);
    } else if (child instanceof window.Element) {
      el.appendChild(child);
    } else if (typeof child === `string` || typeof child === `number`) {
      appendText(el, child);
    }
  });
}

function setStyles(el, styles) {
  if (!styles) {
    el.removeAttribute(`styles`);
    return;
  }

  Object.keys(styles).forEach((styleName) => {
    if (styleName in el.style) {
      el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
    } else {
      console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
    }
  });
}

function setDataAttributes(el, dataAttributes) {
  Object.keys(dataAttributes).forEach((dataAttribute) => {
    // jsdom doesn't support element.dataset, so set them as named attributes
    el.setAttribute(`data-${dataAttribute}`, dataAttributes[dataAttribute]);
  });
}

function isSvg(type) {
  return [`path`, `svg`].includes(type);
}

function makeElement(type, textOrPropsOrChild, ...otherChildren) {
  const el = isSvg(type)
    ? document.createElementNS(SVG_NAMESPACE, type)
    : document.createElement(type);

  if (Array.isArray(textOrPropsOrChild)) {
    appendArray(el, textOrPropsOrChild);
  } else if (textOrPropsOrChild instanceof window.Element) {
    el.appendChild(textOrPropsOrChild);
  } else if (typeof textOrPropsOrChild === `string` || typeof textOrPropsOrChild === `number`) {
    appendText(el, textOrPropsOrChild);
  } else if (typeof textOrPropsOrChild === `object`) {
    Object.keys(textOrPropsOrChild).forEach((propName) => {
      if (propName in el || attributeExceptions.includes(propName)) {
        const value = textOrPropsOrChild[propName];

        if (propName === `style`) {
          setStyles(el, value);
        } else if (propName === `dataset`) {
          setDataAttributes(el, value);
        } else if (typeof value === `function` || propName === `className`) {
          el[propName] = value; // e.g. onclick
        } else if (value) {
          el.setAttribute(propName, value); // need this for SVG elements
        }
      } else {
        console.warn(`${propName} is not a valid property of a <${type}>`);
      }
    });
  }

  if (otherChildren) appendArray(el, otherChildren);

  return el;
}



export const a = (...args) => makeElement(`a`, ...args);
export const abbr = (...args) => makeElement(`abbr`, ...args);
export const address = (...args) => makeElement(`address`, ...args);
export const area = (...args) => makeElement(`area`, ...args);
export const article = (...args) => makeElement(`article`, ...args);
export const aside = (...args) => makeElement(`aside`, ...args);
export const audio = (...args) => makeElement(`audio`, ...args);
export const b = (...args) => makeElement(`b`, ...args);
export const base = (...args) => makeElement(`base`, ...args);
export const bdi = (...args) => makeElement(`bdi`, ...args);
export const bdo = (...args) => makeElement(`bdo`, ...args);
export const blockquote = (...args) => makeElement(`blockquote`, ...args);
export const body = (...args) => makeElement(`body`, ...args);
export const br = (...args) => makeElement(`br`, ...args);
export const button = (...args) => makeElement(`button`, ...args);
export const canvas = (...args) => makeElement(`canvas`, ...args);
export const caption = (...args) => makeElement(`caption`, ...args);
export const cite = (...args) => makeElement(`cite`, ...args);
export const code = (...args) => makeElement(`code`, ...args);
export const col = (...args) => makeElement(`col`, ...args);
export const colgroup = (...args) => makeElement(`colgroup`, ...args);
export const data = (...args) => makeElement(`data`, ...args);
export const datalist = (...args) => makeElement(`datalist`, ...args);
export const dd = (...args) => makeElement(`dd`, ...args);
export const del = (...args) => makeElement(`del`, ...args);
export const details = (...args) => makeElement(`details`, ...args);
export const dfn = (...args) => makeElement(`dfn`, ...args);
export const div = (...args) => makeElement(`div`, ...args);
export const dl = (...args) => makeElement(`dl`, ...args);
export const dt = (...args) => makeElement(`dt`, ...args);
export const em = (...args) => makeElement(`em`, ...args);
export const embed = (...args) => makeElement(`embed`, ...args);
export const fieldset = (...args) => makeElement(`fieldset`, ...args);
export const figcaption = (...args) => makeElement(`figcaption`, ...args);
export const figure = (...args) => makeElement(`figure`, ...args);
export const footer = (...args) => makeElement(`footer`, ...args);
export const form = (...args) => makeElement(`form`, ...args);
export const h1 = (...args) => makeElement(`h1`, ...args);
export const h2 = (...args) => makeElement(`h2`, ...args);
export const h3 = (...args) => makeElement(`h3`, ...args);
export const h4 = (...args) => makeElement(`h4`, ...args);
export const h5 = (...args) => makeElement(`h5`, ...args);
export const h6 = (...args) => makeElement(`h6`, ...args);
export const head = (...args) => makeElement(`head`, ...args);
export const header = (...args) => makeElement(`header`, ...args);
export const hr = (...args) => makeElement(`hr`, ...args);
export const html = (...args) => makeElement(`html`, ...args);
export const i = (...args) => makeElement(`i`, ...args);
export const iframe = (...args) => makeElement(`iframe`, ...args);
export const img = (...args) => makeElement(`img`, ...args);
export const input = (...args) => makeElement(`input`, ...args);
export const ins = (...args) => makeElement(`ins`, ...args);
export const kbd = (...args) => makeElement(`kbd`, ...args);
export const label = (...args) => makeElement(`label`, ...args);
export const legend = (...args) => makeElement(`legend`, ...args);
export const li = (...args) => makeElement(`li`, ...args);
export const link = (...args) => makeElement(`link`, ...args);
export const main = (...args) => makeElement(`main`, ...args);
export const map = (...args) => makeElement(`map`, ...args);
export const mark = (...args) => makeElement(`mark`, ...args);
export const meta = (...args) => makeElement(`meta`, ...args);
export const meter = (...args) => makeElement(`meter`, ...args);
export const nav = (...args) => makeElement(`nav`, ...args);
export const noframes = (...args) => makeElement(`noframes`, ...args);
export const noscript = (...args) => makeElement(`noscript`, ...args);
export const object = (...args) => makeElement(`object`, ...args);
export const ol = (...args) => makeElement(`ol`, ...args);
export const optgroup = (...args) => makeElement(`optgroup`, ...args);
export const option = (...args) => makeElement(`option`, ...args);
export const output = (...args) => makeElement(`output`, ...args);
export const p = (...args) => makeElement(`p`, ...args);
export const param = (...args) => makeElement(`param`, ...args);
export const pre = (...args) => makeElement(`pre`, ...args);
export const progress = (...args) => makeElement(`progress`, ...args);
export const q = (...args) => makeElement(`q`, ...args);
export const rp = (...args) => makeElement(`rp`, ...args);
export const rt = (...args) => makeElement(`rt`, ...args);
export const rtc = (...args) => makeElement(`rtc`, ...args);
export const ruby = (...args) => makeElement(`ruby`, ...args);
export const s = (...args) => makeElement(`s`, ...args);
export const samp = (...args) => makeElement(`samp`, ...args);
export const script = (...args) => makeElement(`script`, ...args);
export const section = (...args) => makeElement(`section`, ...args);
export const select = (...args) => makeElement(`select`, ...args);
export const small = (...args) => makeElement(`small`, ...args);
export const source = (...args) => makeElement(`source`, ...args);
export const span = (...args) => makeElement(`span`, ...args);
export const strong = (...args) => makeElement(`strong`, ...args);
export const style = (...args) => makeElement(`style`, ...args);
export const sub = (...args) => makeElement(`sub`, ...args);
export const summary = (...args) => makeElement(`summary`, ...args);
export const sup = (...args) => makeElement(`sup`, ...args);
export const table = (...args) => makeElement(`table`, ...args);
export const tbody = (...args) => makeElement(`tbody`, ...args);
export const td = (...args) => makeElement(`td`, ...args);
export const template = (...args) => makeElement(`template`, ...args);
export const textarea = (...args) => makeElement(`textarea`, ...args);
export const tfoot = (...args) => makeElement(`tfoot`, ...args);
export const th = (...args) => makeElement(`th`, ...args);
export const thead = (...args) => makeElement(`thead`, ...args);
export const time = (...args) => makeElement(`time`, ...args);
export const title = (...args) => makeElement(`title`, ...args);
export const tr = (...args) => makeElement(`tr`, ...args);
export const track = (...args) => makeElement(`track`, ...args);
export const u = (...args) => makeElement(`u`, ...args);
export const ul = (...args) => makeElement(`ul`, ...args);
export const video = (...args) => makeElement(`video`, ...args);
export const wbr = (...args) => makeElement(`wbr`, ...args);
