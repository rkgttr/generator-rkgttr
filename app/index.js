'use strict';
var util = require( 'util' );
var path = require( 'path' );
var yeoman = require( 'yeoman-generator' );
var yosay = require( 'yosay' );
var chalk = require( 'chalk' );
var pkgName = require( 'pkg-name' );
var multiline = require( 'multiline' );
var compareVersion = require( 'compare-version' );

var RkgttrGenerator = yeoman.generators.Base.extend( {
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
        name: 'Support Internet Explorer 8',
        value: 'supportIE8',
        checked: false
      },
      {
         name: 'Include form elements style overrides',
         value: 'overrideForm',
         checked: true
      },
      {
         name: 'Include table elements style overrides',
         value: 'overrideTable',
         checked: true
      },
      {
         name: 'Include buttons default styles',
         value: 'overrideButton',
         checked: true
      },
      {
        name: 'Include jQuery',
        value: 'includeJquery',
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
      this.supportIE8 = hasFeature( 'supportIE8' );
      this.includeJquery = hasFeature( 'includeJquery' );
      this.overrideForm = hasFeature( 'overrideForm' );
      this.overrideTable = hasFeature( 'overrideTable' );
      this.overrideButton = hasFeature( 'overrideButton' );
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
      'launch.command',
      'launch.bat',
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
    this.directory( 'scss', 'src/scss' );
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

    this.template( '_package.json', 'package.json' );
    this.template( '_bower.json', 'bower.json' );
    this.copy( 'launch.command' );
    this.copy( 'launch.bat' );
    this.copy( 'gitignore', '.gitignore' );
    this.copy( 'babelrc', '.babelrc' );
  },

  projectfiles: function () {
    this.copy( 'gulpfile.js' );
    this.copy( 'README.md', 'README.md' );

  }
} );

module.exports = RkgttrGenerator;
