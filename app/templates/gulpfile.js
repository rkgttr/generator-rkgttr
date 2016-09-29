var gulp = require( 'gulp' ),
  plumber = require('gulp-plumber'),
  concat = require( 'gulp-concat' ),
  rename = require( 'gulp-rename' ),
  uglify = require( 'gulp-uglify' ),
  babel = require( "gulp-babel" ),
  sass = require( 'gulp-sass' ),
  prefix = require( 'gulp-autoprefixer' ),
  cmq = require( 'gulp-combine-mq' ),
  minifyCSS = require( 'gulp-csso' ),
  browserSync = require( 'browser-sync' ),
  header = require('gulp-header'),
  imagemin = require( 'gulp-imagemin' ),
  pngquant = require( 'imagemin-pngquant' ),
  mozjpeg = require( 'imagemin-mozjpeg' ),
  gulpCopy = require( 'gulp-file-copy' ),
  pug = require( 'gulp-pug' ),
  pkg = require('./package.json'),
  buildDir = require('./gulp-cfg.js')().buildDir,
  newer = require('gulp-newer'),
  addsrc = require('gulp-add-src');

var banner = [
  '/**',
  ' ** <%%= pkg.name %> - <%%= pkg.description %>',
  ' ** @author: <%%= pkg.author.name %> - <%%= pkg.author.email %>',
  ' ** @version: v<%%= pkg.version %>',
  ' **/',
  ''
].join('\n');


gulp.slurped = false;
gulp.task( 'browser-sync', function () {
  if ( !gulp.slurped ) {
    gulp.slurped = true;
    browserSync( {
      port: 8080,
      server: {
        baseDir: buildDir
      }
    } );
  }
} );

gulp.task( 'js', function () {
  gulp.src( [ './src/js/plugins.js', <% if (includeModal) { %>'./src/js/modal.js', <% } %><% if (includeTooltip) { %>'./src/js/tooltip.js', <% } %><% if (includeRouter) { %>'./src/js/router.js', <% } %>'./src/js/main.js' ] )
    .pipe(plumber())
    .pipe( concat( 'global.min.js' ) )
    .pipe( babel() )<% if (includeJquery) { %>
    .pipe(addsrc.prepend('./bower_components/jquery/dist/jquery.js'))
    .pipe( concat( 'global.min.js' ) )<%}%>
    .pipe( uglify({
      preserveComments: 'license'
    }) )
    .pipe(header(banner, {pkg: pkg}))
    .pipe( gulp.dest( buildDir + '/js/' ) )
    .pipe( browserSync.stream() );
} );

gulp.task( 'mdnz', function () {
  gulp.src( './bower_components/modernizr/modernizr.js' )
    .pipe(plumber())
    .pipe( uglify() )
    .pipe( gulp.dest( buildDir + '/js/vendor' ) );
} );

gulp.task( 'styles', function () {

  gulp.src( './src/scss/main.scss' )
    .pipe(plumber())
    .pipe( sass() )
    .pipe( cmq() )
    .pipe( prefix( 'last 2 versions', <% if (supportIE8) { %>'ie8'<% } else { %>'ie9'<% } %> ) )
    .pipe( rename( 'styles.min.css' ) )
    .pipe( minifyCSS() )
    .pipe(header(banner, {pkg: pkg}))
    .pipe( gulp.dest( buildDir + '/css' ) )
    .pipe( browserSync.stream() );
} );

gulp.task( 'pug', function () {
  gulp.src( './src/pug/*.pug' )
    .pipe(plumber())
    .pipe( pug() )
    .pipe( gulp.dest( buildDir + '/' ) )
    .pipe( browserSync.stream() );
} );

gulp.task( 'images', function () {
  gulp.src( './src/img/*' )
    .pipe(plumber())
    .pipe(newer(buildDir + '/img'))
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
    .pipe( gulp.dest( buildDir + '/img' ) )
    .pipe( browserSync.stream() );
} );

gulp.task( 'favicon', function () {
  gulp.src( './src/favicon/*' )
    .pipe(plumber())
    .pipe( gulp.dest( buildDir + '' ) )
    .pipe( browserSync.stream() );
} );

gulp.task( 'fonts', function () {
  gulp.src( './src/fonts/*' )
    .pipe(plumber())
    .pipe( gulp.dest( buildDir + '/fonts' ) )
    .pipe( browserSync.stream() );
} );

gulp.task( 'watch', function () {
  if ( !gulp.slurped ) {
    gulp.watch( './src/scss/**/*.scss', [ 'styles' ] );
    gulp.watch( './src/js/**/*.js', [ 'js' ] );
    gulp.watch( './src/pug/**/*.pug', [ 'pug' ] );
    gulp.watch( './src/img/**/*', [ 'images' ] );
    gulp.watch( './src/fonts/**/*', [ 'fonts' ] );
    gulp.watch( './src/favicon/**/*', [ 'favicon' ] );
    gulp.watch( './gulpfile.js', [ 'default' ] ).on('change', browserSync.reload);

  }
} );

gulp.task( 'default', [ 'styles', 'js', 'mdnz', 'pug', 'images', 'favicon', 'fonts', 'watch', 'browser-sync' ] );
