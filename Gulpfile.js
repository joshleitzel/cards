var gulp =      require('gulp'),
  coffee =      require('gulp-coffee'),
  concat =      require('gulp-concat'),
  del =         require('del'),
  livereload =  require('gulp-livereload'),
  npmfiles =    require('gulp-npm-files'),
  sass =        require('gulp-sass'),
  sourcemaps =  require('gulp-sourcemaps'),
  uglify =      require('gulp-uglify');

gulp.task('default', ['clean'], function() {
  gulp.start('build:all');
});
gulp.task('build:all', ['build:app', 'build:vendor']);
gulp.task('watch', function() {
  livereload.listen();
  gulp.start('watch-scss');
  gulp.start('watch-scripts');
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
  gulp.watch('src/js/**/*.coffee', ['scripts']);
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
    .pipe(gulp.dest('public/assets/styles'))
    .pipe(livereload());
});

gulp.task('scripts', function() {
  //gulp.src(npmfiles(), {base:'./'}).pipe(gulp.dest('public/assets/vendor'));

  gulp.src('src/js/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(livereload());
});

gulp.task('vendor', function() {
  gulp.src([
    'src/vendor/underscore.js',
    'src/vendor/zepto.js',
    'src/vendor/backbone.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/js'));
});
