### <%= title %>
<%= description %>

#### Development Team

**Lead Developer**  
<%= author_name %> - <<%= author_email %>>

**Contributors**



#### Build Tools & Preprocessors

**[SASS](http://sass-lang.com/guide)**  
An extension of CSS that adds power and elegance to the basic language. It allows to use variables, nested rules, mixins, inline imports, and more.

**[Gulp](http://gulpjs.com/)**  
Automates tasks such as minification, concatenation, compression, compilation, browser refreshing etc.

**[Bower](http://bower.io/#getting-started)**  
Bower works by fetching and installing packages from all over, taking care of hunting, finding, downloading, and saving the stuff you’re looking for.

**[Pug](http://pug-lang.com/)**  
Pug is a terse language for writing HTML templates.

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
	    ├── img/
	    ├── js/
	    ├── pug/
	    |   └── includes/
	    └── scss/
	       ├── base/
	       ├── layout/
	       ├── modules/
	       └── tools/
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

