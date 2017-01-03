import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import bs from 'browser-sync';
import config from '../config';


gulp.task( 'pug', ()=> {
  return gulp.src( './src/pug/*.pug' )
    .pipe(plumber())
    .pipe( pug() )
    .pipe( gulp.dest( `${config.build}` ) )
    .pipe( bs.stream() );
} );