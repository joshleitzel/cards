var gulp =      require('gulp'),
  concat =      require('gulp-concat'),
  cssnano =     require('gulp-cssnano'),
  del =         require('del'),
  livereload =  require('gulp-livereload'),
  npmfiles =    require('gulp-npm-files'),
  sass =        require('gulp-sass'),
  sourcemaps =  require('gulp-sourcemaps'),
  ts =          require('gulp-typescript'),
  tslint =      require('gulp-tslint'),
  uglify =      require('gulp-uglify'),
  project =     ts.createProject('tsconfig.json');

gulp.task('default', ['clean'], function() {
  gulp.start(['build:app', 'build:vendor']);
});
gulp.task('watch', function() {
  livereload.listen();
  gulp.start('watch-scss');
  gulp.start('watch-scripts');
  gulp.start('watch-images');
});

gulp.task('build:app', [
  'fonts',
  'images',
  'styles',
  'scripts',
]);

gulp.task('build:vendor', ['vendor']);

gulp.task('clean', function () {
  return del('public/assets');
});

gulp.task('watch-scss', function() {
  gulp.watch('src/styles/**/*.scss', ['styles']);
});

gulp.task('watch-scripts', function() {
  gulp.watch('src/js/**/*.ts', ['scripts']);
});

gulp.task('watch-images', function() {
  gulp.watch('src/images/**/', ['images']);
});

gulp.task('images', function() {
  gulp.src(['src/images/**/*']).pipe(gulp.dest('public/assets/images'));
});

gulp.task('fonts', function() {
  gulp.src(['src/fonts/**/*']).pipe(gulp.dest('public/assets/fonts'));
});

gulp.task('styles', function() {
  gulp.src('src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ indentedSyntax: false, errLogToConsole: true }))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(livereload());
});

gulp.task('scripts', function() {
  gulp.src(npmfiles(), {base:'./'}).pipe(gulp.dest('public/assets/vendor'));

  gulp.src('src/js/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tslint())
    .pipe(tslint.report("verbose", { emitError: false }))
    .pipe(ts(project))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(livereload());
});

gulp.task('vendor', function() {
  gulp.src([
    'node_modules/systemjs/dist/system.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/angular2/bundles/angular2.js',
    'node_modules/angular2/bundles/http.js',
    'node_modules/angular2/bundles/router.js',
    'node_modules/rxjs/bundles/Rx.js',
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/js'));
});
