<% if (usePug) { %>
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import bs from 'browser-sync';
import config from '../config';


gulp.task( 'pug', ()=> {
  return gulp.src( './src/pug/pages/*.pug' )
    .pipe(plumber())
    .pipe( pug() )
    .pipe( gulp.dest( config.build ) )
    .pipe( bs.stream() );
} );

<% } else { %>

import assemble from 'assemble';
import gulp from 'gulp';
import get from 'get-value';
import _ from 'lodash';
import extname from 'gulp-extname';
import plumber from 'gulp-plumber';
import helpers from 'handlebars-helpers';
import bs from 'browser-sync';
import config from '../config';


//Initialize assemble
const app = assemble();

//Initialize hbs helpers
helpers();


gulp.task('load', (cb) => {

  //Set main assemble options
  app.layouts('./src/templates/layouts/*.hbs');
  app.pages('./src/templates/pages/**/*.hbs');
  app.partials('./src/templates/includes/*.hbs');
  app.engine('hbs', require('engine-handlebars'));

  //Custom helpers
  app.helper('get', function(prop) {
    return get(this.context, prop);
  });

  app.helper('pagename', function() {
    let url = get(this.context, 'view.path');;
    let pagenameArr = url.split('/');
    let pagename = _.last(pagenameArr);
    pagename = pagename.split('.')[0];
    return pagename;
  });

  cb();
});


gulp.task('assemble', ['load'], () => {

  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(extname())
    .pipe(plumber())
    .pipe(app.dest(config.build))
    .pipe( bs.stream() );
});<% } %>