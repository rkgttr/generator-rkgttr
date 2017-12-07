import gulp from 'gulp';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import header from 'gulp-header';
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import includePaths from 'rollup-plugin-includepaths';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'gulp-babel';
import bs from 'browser-sync';
import config from '../config';

let includePathOptions = {
  paths: [ './src/js/modules/' ],
  extensions: [ '.js', '.json' ]
},
  nodeResolveOptions = {
    jsnext: true,
    browser: true,
    extensions: [ '.js', '.json' ],
    preferBuiltins: false
  };
gulp.task('js', () => {
  return rollup({
    input: './src/js/main.js',
    format: 'iife',
    plugins: [
      includePaths(includePathOptions),
      nodeResolve(nodeResolveOptions)
    ]
  })
  .pipe(source('global.min.js'))
  .pipe(buffer())
  .pipe(plumber())
  .pipe(babel())
  .pipe(uglify({
    preserveComments: 'license'
  }))
  .pipe(header(config.banner))
  .pipe(gulp.dest(config.build + '/js'))
  .pipe(bs.stream());
});
