import gulp from 'gulp';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import header from 'gulp-header';
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import includePaths from 'rollup-plugin-includepaths';
import babel from 'gulp-babel';
import bs from 'browser-sync';
import config from '../config';

let includePathOptions = {
    include: {
      'babel-polyfill': './node_modules/babel-polyfill/dist/polyfill.js'<% if (includeJquery){ %>,
      'jquery': './node_modules/jquery/dist/jquery.js'<% } %>
    },
    paths: ['./src/js/modules/', './node_modules/'],
    extensions: ['.js', '.json']
};

gulp.task('js', () => {
  return rollup({
      entry: './src/js/main.js',
      format: 'iife',
      plugins: [ includePaths(includePathOptions) ]
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
