import gulp from 'gulp';
import plumber from 'gulp-plumber';
import bs from 'browser-sync';
import config from '../config';


gulp.task( 'favicon', ()=> {
  return gulp.src( './src/favicon/*' )
    .pipe(plumber())
    .pipe( gulp.dest( `${config.build}` ) )
    .pipe( bs.stream() );
} );
