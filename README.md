# [generator-rkgttr](https://github.com/rkgttr/generator-rkgttr)

[![NPM version](http://img.shields.io/npm/v/generator-rkgttr.svg?style=flat-square)](https://www.npmjs.com/package/generator-rkgttr)
[![NPM downloads](http://img.shields.io/npm/dm/generator-rkgttr.svg?style=flat-square)](https://www.npmjs.com/package/generator-rkgttr)
[![Build Status](http://img.shields.io/travis/rkgttr/generator-rkgttr/master.svg?style=flat-square)](https://travis-ci.org/rkgttr/generator-rkgttr)
[![Dependency Status](http://img.shields.io/david/rkgttr/generator-rkgttr.svg?style=flat-square)](https://david-dm.org/rkgttr/generator-rkgttr)
> Static website generator using gulp, rollup, es6, scss, pug or assemble

# RKGTTR Frontend Setup

This Yeoman generator will help you through the process of setting up static frontend projects. It includes:

* A convenient folder structure.
* A set of [pug](http://pug-lang.com/) or [Assemble](http://assemble.io/) templates to generate your pages.
* Several [SCSS](http://sass-lang.com/) files that compile in a single autoprefixed minified CSS files.
* [jQuery](https://jquery.org/)(optional) and a few JavaScript helpers/modules that are bundled in a single minified JavaScript file.
* An image minifier.
* A simple webserver that reloads automatically when you make changes.


## Global Configuration

**The following needs to be done once.**

[Install NodeJs](http://nodejs.org/)

Open a console (Windows: `Win+R` then type `cmd` then press Enter, Mac: `Command+Space` then type `terminal` then press Enter)

Install Gulp by entering the following command:

```sh
npm i -g gulp
```

 And press Enter

Install Bower by entering the following command:

```sh
npm i -g bower
```

 And press Enter

Install Yarn by entering the following command:

```sh
npm i -g yarn
```

 And press Enter

Install Yeoman by entering the following command:

```sh
npm i -g yo
```

 And press Enter

Install the project generator by entering the following command:

```sh
npm i -g generator-rkgttr
```

If other things fails when installing, or when running the project, look at the log, you might want to install other frameworks and tools such as Python and GIT.

When all done, press Enter

## Project Configuration

**The following needs to be done per project.**

Create a new folder.

Move into this folder then `shift + right click` and select "Open command window here", on Mac open a Terminal and move to this folder (`cd \[your-path\]`) or go to `System Preferences \> Keyboard \> Keyboard Shortcuts \> Services` and enable `New Terminal at Folder` and the service will appear by `right click` or `Control + click` on the folder.

In the console that opens, type:

```sh
yo rkgttr
```

Press Enter and answer the few questions about the project name, description, version, and optional features.

When all this is done, all your templates files will be under your project folder.

Type `gulp` in your console to start working.

Open [http://localhost:8080/](http://localhost:8080/) to see this in action.

## Start Working

**Following are a few things to keep in mind when you work on your project:**

Don't forget to launch the `gulp` command before working on your project.

There are two main folders in your folder: `build/` and `src/`. `build/` contains the compiled, concatenated and minified files you will deploy. You should never work into the `build` folder, if you do, you'll suffer immeasurable pain and die miserably. `src/` contains your working files, work here, and only here.

If you choose to use Pug, save your Pug pages contents into the `src/pug/pages` folder, and all your included Pug partials into the `src/pug/includes` folder. All pages will use the `src/pug/layouts/default.pug` layout, if you wish to use additional layouts, create them into `src/pug/layouts/`, and extend these new layouts in your new pages.

If you prefer a more traditional approach to HTML markup, while keeping the benefits of a templating language, you can choose to use Assemble instead of Pug when you run `yo rkgttr`. Assemble templates files use the same folder structure as Pug's ones, except they will be located under the `src/templates` folder. Assemble uses [Handlebars](http://handlebarsjs.com/) to create dynamic content based on JSON or YAML data. You can use custom Handlebars helpers to do advanced data handling, and for this, please refer to the Assemble documentation, the Handlebars documentation, and Google.

All generated HTML files will end up in the `build/` folder.

Always write your JavaScript into `src/js/main.js`, or create additional modules. You can use [ECMAScript 6](https://babeljs.io/) or standard ECMAScript 5. However, avoid using any ES6 functionalities that depend on the Babel Polyfill, or you'll have to include it by uncommenting the corresponding line in `src/js/main.js`. Your code and modules will be bundled and minifed as ES5.

Don't forget to change your favicon and the IOS and Windows special icons/tiles on the `src/favicon/` folder.

Always put your images into `src/img/`. If you delete an image, it will not be deleted on the `build/img/` folder, do it manually.


### Using SCSS

The SASS folders are broken up based loosely on the principles outlined in [SMACSS - Scalable and Modular Architecture for CSS](https://smacss.com/) and is intended to be used with a MOBILE FIRST approach.

Base:
`_base.scss` - Base style, etc.
`_typography.scss` - Headings, typography, etc.
`_fonts.scss` - Font Face, Icon Fonts.
`_normalize.scss` - CSS reset for SCSS

Layout:
Create individual SCSS files here for different sections of the website e.g header, footer, front-page etc.

Modules:
Create SCSS files for reusable modules or elements in the website e.g buttons, slideshows, galleries, forms etc.

Tools:
`_mixins.scss` - Add your mixins here.
`_variables.scss` - Set your variables here, font colours, media queries etc.

All the typographic styles are using [Plumber](https://jamonserrano.github.io/plumber-sass/) which is useful to deal with the vertical rythm of your page. if you wish to use it too, you might need to adjust your custom fonts baselines values into `_variables.scss` using this [tool](https://jamonserrano.github.io/plumber-sass/measure/).

You can write all your mediaqueries as you go by nesting them directly in your code. For example:

```css
.selector{
    color: blue;
    @media screen and (min-width: 768px) {
        color: white;
    }
    @media #{$my-mediaquery-variable} {
        color: red;
    }
}
```

For more convenience, a few common breakpoint variables have been added to `src/scss/_variables.scss`. You can add more breakpoints here if you want, or edit/delete the ones that already exist. Don't forget that IE8 doesn't support mediaqueries so you will need to have a desktop first approach if you need to support IE8.

#### The grid system

The grid system is based on [PureCSS](http://purecss.io/) in term of philosophy: meaning it uses `display:flex` and fallbacks to `display:inline-block` for older browsers. No `float` here. There are no grid unit classes in the framework, just a placeholder and a mixin to build your grids.

##### The grid units container

First one is the `%grid-row` placeholder that you should extend to create the container for your grid units, and works like this:

```css
.your-section {
    @extend %grid-row;
}
```


##### The grid unit

Second mixin is the grid unit mixin, simply called `unit`, and it works like this:

```css
.your-selector {
    @include unit(1/2);
}
```

or

```css
.your-selector {
    @include unit(1, 1/2, $medium, 1/3, $large);
}
```

or

```css
.your-selector {
    @include unit(1, 1/2, 'only screen and (min-width:48em)', 1/3, 'only screen and (min-width:64em)') ;
}
```
So in short, the first arguments is the base width of you grid unit, which will render as a percentage. e.g. `1` will be `100%`, `1/3` will be `33.3334%`, `0.5` will be `50%`. If you're on a mobile first approach, this will be the mobile width of your unit. If you're on a desktop first approach, this will be the desktop width of your unit. The other arguments are optional, they are mediaqueries and they define how your unit will react depending on several breakpoints. All the other arguments go by pair: the width of the unit, and the corresponding mediaquery. i.e.: width, mediaquery, width, mediaquery, ... You can have as many breakpoints as you want, and you can use SCSS variables that contain mediaqueries strings for more convenience.

#### Tooltip module

If you choose to include the tooltip system module, then you'll get some SCSS to create tooltips. In HTML, a text that has a tooltip on rollover will be written this way:

```html
<p>Text that contain a <span class="tooltip tooltip-top">tooltip<div class="tooltip-text">tooltip text</div></span></p>.
```

You can align your tooltip differently by replacing the `tooltip-top` class by `tooltip-bottom`, `tooltip-left`, or `tooltip-right`.



Remember when adding a file, you must also add it to `main.scss`.

### Using JavaScript

The JavaScript use the ES6 module syntax. If you want to create additional modules, create them into `src/js/modules` then import them into `src/js/main.js`. You can install traditional NPM modules and import them the same way. But you might want to create some shortcuts to the modules main js file into `gulp/tasks/javascript.js` into the `includePathOptions` object. Look at how `babel-polyfill` is linked to see how it works. Please note that any change into the gulp tasks require that you restart gulp to make them work.

All the ES6 files that you'll use will get bundled and minified into a single JS file under `./build/js/global.min.js`.

Several optional polyfills are included in the project. The polyfills are for [`matches`](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches), [`mutationobserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), [`classList`](https://developer.mozilla.org/fr/docs/Web/API/Element/classList), and [`weakmap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap). Uncomment the related modules in `src/js/main.js`.

Other optional modules are included in the project, you can import them if you need. `Q`, `Helpers`, and `Publisher` are imported by default, but if you don't use them, there are chances that they won't even appear into the bundled JavaScript thanks to the tree-shaking compression.

#### JS Modules

##### Q Module

Q is a module that consists of shortcuts to select DOM elements. For example instead of typing `document.querySelectorAll('selector')` you just have to type `Q.all('selector')`. Following is the list of Q methods:

 * `one`: shortcut for `document.querySelector`
 * `all`: shortcut for `document.querySelectorAll`
 * `id`: shortcut for `document.getElementById`
 * `classname`: shortcut for `document.getElementsByClassName`
 * `tag`: shortcut for `document.getElementsByTagName`

 All methods, except `Q.id` can have a second optional parameters, which should be a `Node` object, that is the context from where you want to perform the query. For example:

```js    
Q.all('li'); // return all list elements in the document
Q.all('li', Q.one('ul.todo')); // return all list elements into the .todo list
```

##### Helpers Module

Helpers is a module that consists of useless methods:

* `getType`: takes one arguments that can be a JavaScript primitive or a JavaScript object and return its type. For example `Helpers.getType('hello')` returns `String`.
* `delegate`: allows for event delegation. Useful to add event listeners on DOM elements that might not exist yet at the time of the event registration. Example: `document.addEventListener('click', delegate('.selector', e => console.log(e.delegateTarget))`.
* `whichAnimationEvent`: return the browser prefixed animation event, or `undefined` if not supported.

##### Modal module

If you choose to include the modal module, then you'll get some JavaScript and SCSS to create simple accessible, progressively enhanced modals.
Create a modal this way:

```html
<a href="#modal/test">open modal</a>
<div class="modal" id="modal/test">
  <div class="modal-wrapper">
    <div class="modal-content">
      Modal content
    </div>
    <a class="modal-close" href="#">Close</a></div>
</div>
```

Modals id attributes should start with `modal/` otherwise it wont't work.


##### Router module

If you choose to include the router module, then you'll get a JavaScript module to handle routes in your application. Routes lets you easily dispatch based on url-style strings. It's particularly useful for one page website applications, to switch from one state to another based on the URL hash changes, which allows you to store your application state into the browser history, and to use deep linking functionalities:

```js
import Router from 'Router';
let router = new Router(()=> defaultBehaviour());
router.addRoute('/route/:dynamic-prop/path/:other-prop', (dynProp, otherProp, fullHash) => doSomething(dynProp, otherProp, fullHash));
```  

For example, imagine you have a link in your page:

```html
<a href="#/product/23">My awesome product</a>
```

And in your JavaScript:

```js
let router = new Router(()=> showHomePage());
router.addRoute('/product/:product-id', (pid) => showProductById(pid));
```

Then on click on the link, the `showProductById` method will be called, with the product id as argument.
You also can invoke a navigation event straight from JavaScript like this:

```js
router.callRoute('#/product/1523');
```

###### Router methods

* Constructor: `new Router([function to handle the case when no route is provided or a route that is not registered is provided])`
* `addRoute`: add a route, takes 2 parameters:
    * `route`: a string representing the URL hash of the route.
    * `callback`: a method you want to invoke when the URL hash changes to this route.
* `addRoutes`: takes an undefinite quantities of route objects that contains two properties `{route:'', handler:()=>}`:
    * `route`: a string representing the URL hash of the route.
    * `handler`: a method you want to invoke when the URL hash changes to this route.
* `callRoute`: invoke a route programmatically:
    * `route`: a string representing the URL hash of the route.


##### Publisher module

Based on [event-pubsub](https://www.npmjs.com/package/event-pubsub), a custom events publisher.

###### Publisher static methods

* `on`: will bind the handler function to the the type event. Just like addEventListener in the browser, takes 2 parameters:
    * `type`: a string representing the event.
    * `callback`: a method you want to invoke when this type of event is triggered.
* `off`: will unbind the handler function from the the type event. If the handler is "*", all handlers for the event type will be removed, takes 2 parameters:
    * `type`: a string representing the event.
    * `callback`: a method you want to remove when this type of event is triggered, or `*` if you want to remove all event handlers for this event.
* `trigger`: will call all handler functions bound to the event type and pass all `...data` arguments to those handlers:
    * `type`: a string representing the event.
    * `...data`: Arguments to send when triggering the event.

##### UUID module

Just generate unique IDs:

```js
import uuid from 'rkgttr-uuid';
console.log(uuid());
```

##### PRNG module

Just a small and fast pseudo random number generator:

```js
import Prng from 'rkgttr-prng';
console.log(new Prng(), new Prng(12));
```

##### Elements module

A module to build DOM components, inspired from [David Gilbertson](https://github.com/davidgilbertson/know-it-all/). Example:

```js
import Publisher from 'rkgttr-publisher';
import uuid from 'rkgttr-uuid';
import { div, img, h2, p, a } from 'rkgttr-elements';
const MediaObject = (initialData) => {
  let el = null,
    uid = uuid();

  const render = data => (
    div({
        className: 'media',
        dataset: {uid: uid}
      },
      a({
          className: 'img',
          href: '#',
          onclick: (e) => {
            e.preventDefault();
            Publisher.trigger(`data:change`, {uid:uid, title: 'Hello', name: 'Mars' });
          }
        },
        img({ src: 'http://placehold.it/350x150', alt: 'Alt text' })
      ),
      div({ className: 'bd' },
        h2(data.title),
        p(data.name)
      )
    )
  );

  const update = (prevEl, newData) => {
    if(newData.uid !== uid) {
      return prevEl;
    }
    const nextEl = render(newData);

    if (nextEl.isEqualNode(prevEl)) {
      console.warn(`render() was called but there was no change in the rendered output`, el);
    } else {
      prevEl.parentElement.replaceChild(nextEl, prevEl);
    }

    return nextEl;
  };

  Publisher.on(`data:change`, (newData) => el = update(el, newData));

  el = render(initialData);

  return el;

};
document.body.appendChild(MediaObject({ title: 'Hello', name: 'World' }));
```

## License

MIT © [Eric Guittiere](http://www.rkgttr.com)
