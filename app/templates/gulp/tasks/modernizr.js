import gulp from 'gulp';
import plumber from 'gulp-plumber';
import modernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';
import config from '../config';

gulp.task('mdnz', () => {
  return gulp.src('.src/js/*.js')
    .pipe(modernizr('modernizr.js', {
      // if you want to exclude some test, add them here, see https://github.com/Modernizr/customizr
      excludeTests: []
    }))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(`${config.build}/js/vendor`))
});
