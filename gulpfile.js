const
  gulp  = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  syncOpts = {
    proxy       : 'localhost/frameworkCSS',
    files       : [
      'build/*',
      'index.html'
    ],
    watchEvents : ['add', 'change', 'unlink', 'addDir', 'unlinkDir'],
    open        : false,
    notify      : false,
    ghostMode   : false,
    ui: {
      port: 8001
    }
  }
;
console.log(plugins);
var browsersync = false;


gulp.task('css-prod', () => {
  return gulp.src('./src/*.scss')
  .pipe(plugins.sass({outputStyle: 'compressed'}))
  .pipe(plugins.groupCssMediaQueries())
  .pipe(plugins.autoprefixer({
    browsers: ['last 2 versions', '> 2%']
  }))
  .pipe(gulp.dest('./build/'))
});

gulp.task('css-dev', () => {
  return gulp.src('./src/*.scss')
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sass())
  .pipe(plugins.sourcemaps.write('.'))
  .pipe(gulp.dest('./build/'))
});

gulp.task('browsersync', () => {
  if (browsersync === false) {
    browsersync = require('browser-sync').create();
    browsersync.init(syncOpts);
  }
});

gulp.task('watch:css', () => {
  gulp.watch('./src/*.scss', gulp.series('css-dev'));
});


gulp.task('watch', gulp.parallel('watch:css'));
gulp.task('build', gulp.parallel('css-prod'));
gulp.task('default', gulp.parallel('browsersync','watch'));
