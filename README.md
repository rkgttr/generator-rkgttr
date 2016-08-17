# RKGTTR Frontend Setup

This guide will help you through the process of setting up static frontend projects. This is a simple framework based on [NodeJS](http://nodejs.org/), [Yeoman](http://yeoman.io/), [Bower](http://bower.io/) and [Gulp](http://gulpjs.com/) that automate a lot of tasks such as preprocessing your files and minify them. The framework includes:

* A convenient folder structure.
* An optional set of [pug](http://pug-lang.com/) templates based on HTML5 Boilerplate to generate your pages.
* Several [SCSS](http://sass-lang.com/) files that compile in a single autoprefixed minified CSS files.
* [jQuery](https://jquery.org/) and a few JavaScript helpers that compile in a single minified JavaScript file (optional).
* An image minifier.
* A simple webserver that reloads automatically when you make changes.
* A [Gulp](http://gulpjs.com/) observer that automatically compile your changes on SCSS/Pug/JavaScript files.

For editing code, I suggest that you use [Sublime Text](http://www.sublimetext.com/) with [Package Control](https://sublime.wbond.net/) to extends its functionalies. This is the best and most extensible editor at the moment, simple as that.

## Global Configuration

**The following needs to be done once.**

[Install GIT](http://git-scm.com/downloads)  

Important for Windows users, you must install msysgit correctly. Be sure to check the option shown below:  
![](http://demo.longtail.com.au/frontend/img/build/mysgit.png)

[Install NodeJs](http://nodejs.org/)

Open a console (Windows: `Win+R` then type `cmd` then press Enter, Mac: `Command+Space` then type `terminal` then press Enter)

Install Gulp by entering the following command:

    npm install -g gulp

 And press Enter

Install Bower by entering the following command:

    npm install -g bower

 And press Enter

Install Yeoman by entering the following command:

    npm install -g yo

 And press Enter

Install the project generator by entering the following command:

    npm install -g generator-rkgttr

And press Enter

## Project Configuration

**The following needs to be done per project.**

Create a new repository on your Git service that has the name of your project, or if it has already been created by the backend team, clone it on your hard drive. 

Move into this folder then `shift + right click` and select "Open command window here", on Mac open a Terminal and move to this folder (`cd \[your-path\]`) or go to `System Preferences \> Keyboard \> Keyboard Shortcuts \> Services` and enable `New Terminal at Folder` and the service will appear by `right click` or `Control + click` on the folder.

In the console that opens, type:

	yo rkgttr

Press Enter and answer the few questions about the project name, description and version.

When all this is done, all your templates files will be under your project folder, here you will find one .bat file (or .command file on Mac): `launch`

`launch` first compiles all your files (js + scss, etc.), launches a web server, watches any changes you make to re-compile on the fly, and finally refreshes the server.

Open [http://localhost:8080/](http://localhost:8080/) to see this in action.

## Versioning on GIT

Only the source files will be committed on GIT. This includes your `src/` folder, and all files that are needed to compile the source files such as the `gulpfile`, … A `.gitignore` file is included in the project that does all the good things for you.

To commit your frontend resources, into the console/terminal move to your project folder then you first need to add your new files:

    git add *

Then you need to commit your job:

    git commit --all

Adding a commit message at this stage is mandatory.
When you’re happy with your commit, and when you’re done working, you need to push your commit(s) on GIT:

    git push origin master

Please note that the `master` in the above command refers to the branch on which you push your commit(s). Depending on the [GIT workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/) you’re using, you may want to push your commit(s) on another branch.

To learn more about GIT, [here there are nice tutorials for your to read](https://www.atlassian.com/git/tutorials).

## Start Working

**Following are a few things to keep in mind when you work on your project:**

Don't forget to launch `launch` (or to manually launch the `gulp` command into your console/terminal) before working on your project.

Open [http://localhost:3000/](http://localhost:3000/).

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



