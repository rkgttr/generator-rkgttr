### <%= title %>
<%= description %>

#### Development Team

**Lead Developer**  
<%= author_name %> - <<%= author_email %>>

**Contributors**



#### Build Tools & Preprocessors

<% if (includeSCSS) { %>**[SASS](http://sass-lang.com/guide)**  
An extension of CSS that adds power and elegance to the basic language. It allows to use variables, nested rules, mixins, inline imports, and more.<%  } else { %>**[LESS](http://lesscss.org/)**
Less is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions and many other techniques that allow you to make CSS that is more maintainable, themable and extendable.<%  } %> 

**[Gulp](http://gulpjs.com/)**  
Automates tasks such as minification, concatenation, compression, compilation, browser refreshing etc.

**[Bower](http://bower.io/#getting-started)**  
Bower works by fetching and installing packages from all over, taking care of hunting, finding, downloading, and saving the stuff you’re looking for.

**[Jade](http://jade-lang.com/)**  
Jade is a terse language for writing HTML templates.

* Produces HTML
* Supports dynamic code
* Supports reusability (DRY)

####Folder Structure
	
	<%= name %>/  
	├── build/
	|   ├── css/
	|   ├── img/
	|   └── js/
	|       └── vendor/
	└── src/
	    ├── css/
	    ├── img/
	    ├── js/
	    ├── jade/
	    |   └── includes/<% if (includeSCSS) { %>
	    └── scss/
	       ├── base/
	       ├── layout/
	       ├── modules/
	       └── tools/<%  } else { %>
	    └── less/
	       ├── base/
	       ├── layout/
	       ├── modules/
	       └── tools/<%  } %>
	├── bower_components/
	└── node_modules/


#### Important Files
`gulpfile.js`  
Configuration of Gulp tasks.

`package.json`  
Configuration of nodejs dependencies.

`bower.json`  
Configuration of bower dependencies.

`README.md`
This file, which contains documentation related to the project.


#### JavaScript Libraries


### Get Started


### Important Notes
The content of `<%= name %>` root directory (except `bower_components`, `node_modules`, and `build`) is kept under version control.  

Run `$ gulp` to start working.

#### Changelog

