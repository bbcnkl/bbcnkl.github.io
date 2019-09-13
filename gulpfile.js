var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var gutil = require('gulp-util');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  //  https: true
  })
})

gulp.task('watch', ['browserSync', 'fileinclude'], function (){
      gulp.watch('app/**/*.html', function() {
        gulp.src(['app/index-work.html'])
         .pipe(fileinclude({
           prefix: '@@',
           basepath: 'app/'
         }))
         .pipe(rename('index.html'))
         .pipe(gulp.dest('app'))
      })

      gulp.watch('app/**', browserSync.reload);
})

gulp.task('fileinclude', function() {
   gulp.src(['app/index-work.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: 'app/'
      }))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('app'));
});


gulp.task('useref', function(){
    return gulp.src('app/index.html')
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulpIf('*.css', cssnano()))
      .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
      .pipe(gulp.dest(''));
});
