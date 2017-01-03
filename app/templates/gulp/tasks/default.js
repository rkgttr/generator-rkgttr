import gulp from 'gulp';
import bs from 'browser-sync';
import config from '../config';




gulp.task('default', ['styles', 'js', 'mdnz', 'pug', 'images', 'favicon', 'fonts'], ()=> {
   bs( {
      port: 8080,
      server: {
        baseDir: config.build
      }
    } );
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/pug/**/*.pug', ['pug']);
    gulp.watch('src/img/**/*.{png,jpg,gif,svg}', ['images']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('src/favicon/**/*', ['favicon']);
});
