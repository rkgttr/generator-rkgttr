import gulp from 'gulp';
import plumber from 'gulp-plumber';
import bs from 'browser-sync';
import config from '../config';


gulp.task( 'fonts', ()=> {
  return gulp.src( './src/fonts/*' )
    .pipe(plumber())
    .pipe( gulp.dest( `${config.build}/fonts` ) )
    .pipe( bs.stream() );
} );
