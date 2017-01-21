import gulp from 'gulp';
import plumber from 'gulp-plumber';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';
import bs from 'browser-sync';
import config from '../config';



gulp.task( 'images', ()=> {
  return gulp.src( './src/img/*' )
    .pipe(plumber())
    .pipe(newer(`${config.build}/img`))
    .pipe( imagemin( {
      svgoPlugins: [ {
        removeUselessStrokeAndFill: true
      }, {
        removeDoctype: true
      }, {
        removeComments: true
      }, {
        removeEditorsNSData: true
      }, {
        convertColors: true
      }, {
        convertStyleToAttrs: false
      }, {
        convertShapeToPath: true
      }, {
        cleanupEnableBackground: true
      }, {
        cleanupNumericValues: true
      }, {
        collapseGroups: true
      }, {
        convertPathData: true
      }, {
        removeUselessStrokeAndFill: true
      } ],
      use: [ pngquant({speed:1, quality:'20-80'}), mozjpeg() ]
    } ) )
    .pipe( gulp.dest( `${config.build}/img` ) )
    .pipe( bs.stream() );
} );