'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var mkdir = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('babel');
  }
  prompting() {
    this.log(
      yosay('Welcome to the peachy ' + chalk.red('rkgttr') + ' generator!')
    );
    let prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'title',
        message: 'Project title (useful for documentation)',
        default: 'Awesome New Project'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description (useful for documentation)',
        default: 'The best project ever.'
      },
      {
        type: 'input',
        name: 'version',
        default: '0.0.0',
        message: 'Project version'
      },
      {
        type: 'input',
        name: 'author_name',
        message: 'What is your name?',
        store: true
      },
      {
        type: 'input',
        name: 'author_email',
        message: 'What is your email address?',
        store: true
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [
          {
            name: 'Include form elements style overrides',
            value: 'overrideForm',
            checked: true
          },
          {
            name: 'Use PUG(Jade) templates engine, use Assemble templates engine if unchecked',
            value: 'usePug',
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
            name: 'Include simple modal module (no IE8 support)',
            value: 'includeModal',
            checked: false
          },
          {
            name: 'Include JavaScript router',
            value: 'includeRouter',
            checked: false
          },
          {
            name: 'Include tooltips system module (no IE8 support)',
            value: 'includeTooltip',
            checked: false
          },
          { name: 'Include jQuery', value: 'includeJquery', checked: false }
        ]
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;

      let features = props.features,
        hasFeature = feature => (features || []).indexOf(feature) !== -1;

      this.props.slugname = _.kebabCase(this.props.name);
      this.props.camelname = _.camelCase(this.props.slugname);
      this.props.includeJquery = hasFeature('includeJquery');
      this.props.includeModal = hasFeature('includeModal');
      this.props.includeTooltip = hasFeature('includeTooltip');
      this.props.includeRouter = hasFeature('includeRouter');
      this.props.usePug = hasFeature('usePug');
      this.props.overrideForm = hasFeature('overrideForm');
      this.props.overrideTable = hasFeature('overrideTable');
      this.props.overrideButton = hasFeature('overrideButton');
    });
  }

  writing() {
    let dirToCreate = [
        './build',
        './build/img',
        './build/fonts',
        './build/css',
        './build/js',
        './build/js/vendor',
        'src/img/'
      ],
      templatesFiles = {
        'scss/**/*.scss': 'src/scss',
        'js/**/*.js': 'src/js',
        'gulp/**/*.js': 'gulp',
        '_package.json': 'package.json',
        'gulpfile.babel.js': 'gulpfile.babel.js',
        '_README.md': 'README.md'
      },
      copyFiles = {
        'favicon/**/*.{png,xml,json,ico}': 'src/favicon',
        'gitignore': '.gitignore',
        'babelrc': '.babelrc'
      };

    templatesFiles[`${this.props.usePug
      ? 'pug/**/*.pug'
      : 'templates/**/*.hbs'}`] = `${this.props.usePug
      ? 'src/pug'
      : 'src/templates'}`;

    dirToCreate.forEach(dir => mkdir(dir));
    for (let tp in templatesFiles) {
      this.fs.copyTpl(
        this.templatePath(tp),
        this.destinationPath(templatesFiles[tp]),
        this.props
      );
    }
    for (let cp in copyFiles) {
      this.fs.copyTpl(
        this.templatePath(cp),
        this.destinationPath(copyFiles[cp])
      );
    }
  }
  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true,
      callback: () => {
        console.log('Everything is ready!');
      }
    });
  }
};
//   prompting: function () {
//     // Have Yeoman greet the user.
//     this.log(yosay(
//       'Welcome to the peachy ' + chalk.red('generator-rkgttr') + ' generator!'
//     ));
//
//     var prompts = [{
//       type: 'confirm',
//       name: 'someAnswer',
//       message: 'Would you like to enable this option?',
//       default: true
//     }];
//
//     return this.prompt(prompts).then(function (props) {
//       // To access props later use this.props.someAnswer;
//       this.props = props;
//     }.bind(this));
//   },
//
//   writing: function () {
//     this.fs.copy(
//       this.templatePath('dummyfile.txt'),
//       this.destinationPath('dummyfile.txt')
//     );
//   },
//
//   install: function () {
//     this.installDependencies();
//   }
// });
