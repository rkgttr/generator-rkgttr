import gulp from 'gulp';
import bs from 'browser-sync';
import config from '../config';




gulp.task('default', ['styles', 'js', 'mdnz', <% if (usePug) { %>'pug'<% } else { %>'assemble'<% } %>, 'images', 'favicon', 'fonts'], ()=> {
   bs( {
      port: 8080,
      server: {
        baseDir: config.build
      }
    } );
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    <% if (usePug) { %>gulp.watch('src/pug/**/*.pug', ['pug']);<% } else { %>gulp.watch( 'src/templates/**/*.hbs', [ 'assemble' ] );<% } %>
    gulp.watch('src/img/**/*.{png,jpg,gif,svg}', ['images']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('src/favicon/**/*', ['favicon']);
});
