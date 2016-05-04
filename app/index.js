'use strict';
var util = require( 'util' );
var path = require( 'path' );
var yeoman = require( 'yeoman-generator' );
var yosay = require( 'yosay' );
var chalk = require( 'chalk' );
var pkgName = require( 'pkg-name' );
var multiline = require( 'multiline' );
var compareVersion = require( 'compare-version' );

var LongtailGenerator = yeoman.generators.Base.extend( {
  init: function () {
    this.pkg = require( '../package.json' );

    this.on( 'end', function () {
      if ( !this.options[ 'skip-install' ] ) {
        this.installDependencies();
      }
    } );
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log( yosay( 'Welcome to the marvelous Longtail generator!' ) );

    var prompts = [ {
      name: 'name',
      message: 'Project name',
      default: this.appname
    }, {
      name: 'title',
      message: 'Project title (useful for documentation)',
      default: 'Awesome New Project'
    }, {
      name: 'description',
      message: 'Project description (useful for documentation)',
      default: 'The best project ever.'
    }, {
      name: 'version',
      default: '0.1.0'
    }, {
      type: 'input',
      name: 'author_name',
      message: 'What is your name?',
      store: true
    }, {
      type: 'input',
      name: 'author_email',
      message: 'What is your email address?',
      store: true
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [ {
        name: 'Use SCSS (untick for LESS)',
        value: 'includeSCSS',
        checked: true
      }, {
        name: 'ASPX form included in the markup',
        value: 'includeForm',
        checked: false
      } ]
    } ];

    var nameToMessage = function ( name ) {
      return name.split( '_' ).map(
        function ( x ) {
          return this._.capitalize( x );
        }.bind( this )
      ).join( ' ' ) + ':';
    }.bind( this );

    // Generate prompt messages if only the name is defined.
    prompts.map( function ( entry ) {
      if ( entry.message === undefined ) {
        entry.message = nameToMessage( entry.name );
      }
      return entry;
    }.bind( this ) );

    this.currentYear = ( new Date() ).getFullYear();

    this.prompt( prompts, function ( props ) {
      var features = props.features;

      function hasFeature( feat ) {
        return features.indexOf( feat ) !== -1;
      }
      this.slugname = this._.slugify( props.name );
      this.camelname = this._.camelize( this.slugname );
      this.includeSCSS = hasFeature( 'includeSCSS' );
      this.includeForm = hasFeature( 'includeForm' );
      this.name = props.name;
      this.title = props.title;
      this.description = props.description;
      this.version = props.version;
      this.author_name = props.author_name;
      this.author_email = props.author_email;

      done();
    }.bind( this ) );
  },

  app: function () {
    var ignores = [
      '.git',
      '.svn',
      '_package.json',
      '_bower.json',
      'gulpfile.js',
      'babelrc',
      'index.pug',
      'launch.command',
      'launch.bat',
      'main.js',
      'README.md'
    ];
    this.mkdir( 'src' );
    this.mkdir( 'build' );
    this.mkdir( 'build/img' );
    this.mkdir( 'build/fonts' );
    this.mkdir( 'build/css' );
    this.mkdir( 'build/js' );
    this.mkdir( 'build/js/vendor' );
    this.mkdir( 'src/img/' );
    if ( this.includeSCSS ) {
      this.directory( 'scss', 'src/scss' );
    } else {
      this.directory( 'less', 'src/less' );
    }
    this.directory( 'favicon', 'src/favicon' );
    this.directory( 'js', 'src/js' );
    this.directory( 'pug', 'src/pug' );
    this.expandFiles( '*', {
      cwd: this.sourceRoot(),
      dot: true
    } ).forEach( function ( el ) {
      if ( ignores.indexOf( el ) === -1 ) {
        this.copy( el, 'src/' + el );
      }
    }, this );

    this.copy( '_package.json', 'package.json' );
    this.copy( '_bower.json', 'bower.json' );
    this.copy( 'launch.command' );
    this.copy( 'launch.bat' );
  },

  projectfiles: function () {
    this.copy( 'gitignore', '.gitignore' );
    this.copy( 'babelrc', '.babelrc' );
    this.template( 'gulpfile.js' );
    this.template( 'index.pug', 'src/pug/index.pug' );
    this.template( 'main.js', 'src/js/main.js' );
    this.template( 'README.md', 'README.md' );
  }
} );

module.exports = LongtailGenerator;
