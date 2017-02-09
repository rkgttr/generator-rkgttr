import gulp from 'gulp';
import plumber from 'gulp-plumber';
import header from 'gulp-header';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import cmq from 'gulp-combine-mq';
import bs from 'browser-sync';
import config from '../config';


gulp.task( 'styles', ()=> {
  return gulp.src( './src/scss/main.scss' )
    .pipe(plumber())
    .pipe( sass.sync() )
    .pipe( cmq() )
    .pipe( autoprefixer( 'last 2 versions', 'ie9' ) )
    .pipe( rename( 'styles.min.css' ) )
    .pipe( csso() )
    .pipe(header(config.banner))
    .pipe( gulp.dest( `${config.build}/css` ) )
    .pipe( bs.stream() );
} );
