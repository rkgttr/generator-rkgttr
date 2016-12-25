# RKGTTR Frontend Setup

This Yeoman generator will help you through the process of setting up static frontend projects. It scaffolds a simple framework using [NodeJS](http://nodejs.org/), [Yeoman](http://yeoman.io/), [Bower](http://bower.io/), [Yarn](https://yarnpkg.com) and [Gulp](http://gulpjs.com/), that automates a lot of tasks such as preprocessing your files and minify them. The framework includes:

* A convenient folder structure.
* An optional set of [pug](http://pug-lang.com/) templates based on HTML5 Boilerplate to generate your pages.
* Several [SCSS](http://sass-lang.com/) files that compile in a single autoprefixed minified CSS files.
* [jQuery](https://jquery.org/)(optional) and a few JavaScript helpers that compile in a single minified JavaScript file.
* An image minifier.
* A simple webserver that reloads automatically when you make changes.
* A [Gulp](http://gulpjs.com/) observer that automatically compile your changes on SCSS/Pug/JavaScript files.

For editing code, I suggest that you use [Sublime Text](http://www.sublimetext.com/) with [Package Control](https://sublime.wbond.net/) to extends its functionalies. This is the best and most extensible editor at the moment, simple as that.

## Global Configuration

**The following needs to be done once.**

[Install NodeJs](http://nodejs.org/)

Open a console (Windows: `Win+R` then type `cmd` then press Enter, Mac: `Command+Space` then type `terminal` then press Enter)

Install Gulp by entering the following command:

    npm install -g gulp

 And press Enter

Install Bower by entering the following command:

    npm install -g bower

 And press Enter

Install Yarn by entering the following command:

    npm install -g yarn

 And press Enter

Install Yeoman by entering the following command:

    npm install -g yo

 And press Enter

Install the project generator by entering the following command:

    npm install -g generator-rkgttr

And press Enter

## Project Configuration

**The following needs to be done per project.**

Create a new folder. 

Move into this folder then `shift + right click` and select "Open command window here", on Mac open a Terminal and move to this folder (`cd \[your-path\]`) or go to `System Preferences \> Keyboard \> Keyboard Shortcuts \> Services` and enable `New Terminal at Folder` and the service will appear by `right click` or `Control + click` on the folder.

In the console that opens, type:

	yo rkgttr

Press Enter and answer the few questions about the project name, description and version.

When all this is done, all your templates files will be under your project folder, here you will find one .bat file (or .command file on Mac): `launch`

`launch` first compiles all your files (js + scss, etc.), launches a web server, watches any changes you make to re-compile on the fly, and finally refreshes the server.

Alternatively, type `gulp` in your console.

Open [http://localhost:8080/](http://localhost:8080/) to see this in action.

## Start Working

**Following are a few things to keep in mind when you work on your project:**

Don't forget to launch `launch` (or to manually launch the `gulp` command into your console/terminal) before working on your project.

There are two main folders in your folder: `build/` and `src/`. `build/` contains the compiled, concatenated and minified files you will deploy. You should never work into the `build` folder, if you do, you'll suffer immeasurable pain and die miserably. `src/` contains your working files, work here, and only here. 
Save your pug templates into the `src/pug folder`, and all your included Pug templates into the `src/pug/includes` folder. All generated HTML files will end up in the `build/` folder.

Always write your JavaScript into `src/js/main.js`. You can use [ECMAScript 6](https://babeljs.io/) or standard ECMAScript 5. However, don't use any ES6 functionalities that depend on the Babel Polyfill. Your code will be minifed as ES5.

If you use jQuery, add any jQuery plugins or JavaScript helpers into `src/js/plugins.js`.

Don't forget to change your favicon and the IOS and Windows special icons/tiles on the `src/favicon/` folder.

Always put your images into `src/img/`. If you delete an image, it will not be deleted on the `build/img/` folder, do it manually.


### Using SCSS

The SASS folders are broken up based loosely on the principles outlines in [SMACSS - Scalable and Modular Architecture for CSS](https://smacss.com/) and is intended to be used with a MOBILE FIRST approach.

Base: 
base.scss - Headings, typography, resets etc.
fonts.scss - Font Face, Icon Fonts.
normalize.scss - CSS reset for SCSS

Layout:
Create individual SCSS files here for different sections of the website e.g header, footer, front-page etc.

Modules:
Create SCSS files for reusable modules or elements in the website e.g buttons, slideshows, galleries, forms etc.

Tools:
mixins.scss - Add your mixins here.
variables.scss - Set your variables here, font colours, media queries etc.

You can write all your mediaqueries as you go by nesting them directly in your code. For example:

    .selector{
        color: blue;
        @media screen and (min-width: 768px) {
            color: white;
        }
        @media @my-mediaquery-variable {
            color: red;
        }
    }

For more convenience, a few common breakpoint variables have been added to `src/scss/_variables.scss`. You can add more breakpoints here if you want, or edit/delete the ones that already exist. Don't forget that IE8 doesn't support mediaqueries so you will need to have a desktop first approach if you need to support IE8.

#### The grid system

The grid system is based on [PureCSS](http://purecss.io/) in term of philosophy: meaning it uses `display:flex` and fallbacks to `display:inline-block` for older browsers. No `float` here. There are no grid unit classes in the framework, just a placeholder and a mixin to build your grids.

##### The grid units container

First one is the `%grid-row` placeholder that you should extend to create the container for your grid units, and works like this:

    .your-section {
        @extend %grid-row;
    }


##### The grid unit

Second mixin is the grid unit mixin, simply called `unit`, and it works like this:

    .your-selector {
        @include unit(1/2);
    }
    /* or */
    .your-selector {
        @include unit(1, 1/2, $medium, 1/3, $large);
    }
    /* or */
    .your-selector {
        @include unit(1, 1/2, 'only screen and (min-width:48em)', 1/3, 'only screen and (min-width:64em)') ;
    }

So in short, the first arguments is the base width of you grid unit, which will render as a percentage. e.g. `1` will be `100%`, `1/3` will be `33.3334%`, `0.5` will be `50%`. If you're on a mobile first approach, this will be the mobile width of your unit. If you're on a desktop first approach, this will be the desktop width of your unit. The other arguments are optional, they are mediaqueries and they define how your unit will react depending on several breakpoints. All the other arguments go by pair: the width of the unit, and the corresponding mediaquery. i.e.: width, mediaquery, width, mediaquery, ... You can have as many breakpoints as you want, and you can use SCSS variables that contain mediaqueries strings for more convenience.

Remember when adding a file, you must also add it to `main.scss`.

### Using JavaScript

If you choose to not use jQuery, there are several helpers and polyfills that will be included in the project (in `src/js/plugins.js`). The polyfills are for [`matches`](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches), [`mutationobserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), and [`weakmap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

#### Helper modules

##### Q

Q is a module that consists of shortcuts to select DOM elements. For example instead of typing `document.querySelectorAll('selector')` you just have to type `Q.all('selector')`. Following is the list of Q methods:

 * `one`: shortcut for `document.querySelector`
 * `all`: shortcut for `document.querySelectorAll`
 * `id`: shortcut for `document.getElementById`
 * `class`: shortcut for `document.getElementsByClassName`
 * `tag`: shortcut for `document.getElementsByTagName`

 ##### Helpers

Helpers is a module that consists of useless methods:

* `typeOf`: takes one arguments that can be a JavaScript primitive or a JavaScript object and return its type. For example `Helpers.typeOf('hello')` returns `String`.
* `delegate`: allows for event delegation. Useful to add event listeners on DOM elements that might not exist yet at the time of the event registration. Example: `document.addEventListener('click', delegate('.selector', e => console.log(e.delegateTarget))`.

#### Modal module

If you choose to include the modal module, then you'll get some JavaScript and SCSS to create simple accessible modals.
Create a modal this way:

    let modal = new Modal();
    modal.open('Hello world');



##### Modal methods

* Constructor: `new Modal([DOM element on which the modal is created, default to document.body], [options, Object])`
    * Options:
        * `overlayClassName`: Default to `modal-overlay`
        * `modalClassName`: Default to `modal`
        * `wrapperClassName`: Default to `modal-wrapper`
        * `contentClassName`: Default to `modal-content`
        * `closeButtonClassName`: Default to `modal-close`
* `open`: open the modal, takes 2 parameters:
    * `content`: a string representing the content you want to inject in your modal. It can be a simple string or complex HTML markup. You can pick the inner HTML of existing DOM elements to populate the content of your modal. To keep these DOM elements hidden while the modal is closed, apply the `.modal-content-src` CSS class to them.
    * `callback` (optional): a method you want to invoke when opening a modal.
* `update`: update the content of the modal, takes one parameter, a string.
* `close`: close the modal, take one optional parameter, a callback invoked on the modal closing.
* `teardown`: garbage collection of the modal.

#### Tooltip module

If you choose to include the tooltip system module, then you'll get some JavaScript and SCSS to create tooltips. In HTML, a text that has a tooltip on rollover will be written this way:

    Text that contain a <span class="tooltip tooltip-top" data-tooltip="Tooltip content">tooltip</span>.

You can align your tooltip differently by replacing the `tooltip-top` class by `tooltip-bottom`, `tooltip-left`, or `tooltip-right`.

##### Dynamic content

Be aware that is you load content with Ajax that contains tooltips, you will need to initialise these new tooltips in your Ajax success handler like this:

    Tooltip.init();

You can skip the initialisation step by having your tooltips markup like this:

    <span class="tooltip tooltip-top">tooltip
        <div class="tooltip-text">Tooltip content</div>
    </span>

#### Router module

If you choose to include the router module, then you'll get a JavaScript module to handle routes in your application. Routes lets you easily dispatch based on url-style strings. It's particularly useful for one page website applications, to switch from one state to another based on the URL hash changes, which allows you to store your application state into the browser history, and to use deep linking functionalities:

    let router = new Router(()=> defaultBehaviour());
    router.addRoute('/route/:dynamic-prop/path/:other-prop', (dynProp, otherProp) => doSomething(dynProp, otherProp));

For example, imagine you have a link in your page:

    <a href="#/product/23">My awesome product</a>

And in your JavaScript:

    let router = new Router(()=> showHomePage());
    router.addRoute('/product/:product-id', (pid) => showProductById(pid));

Then on click on the link, the `showProductById` method will be called, with the product id as argument.
You also can invoke a navigation event straight from JavaScript like this:

    history.pushState(null, null, '#/product/1523');


##### Router methods

* Constructor: `new Router([function to handle the case when no route is provided or a route that is not registered is provided])`
* `addRoute`: add a route, takes 2 parameters:
    * `route`: a string representing the URL hash of the route.
    * `callback`: a method you want to invoke when the URL hash changes to this route.
* `addRoutes`: takes an undefinite quantities of route objects that contains two properties `{route:'', handler:()=>}`:
    * `route`: a string representing the URL hash of the route.
    * `handler`: a method you want to invoke when the URL hash changes to this route.