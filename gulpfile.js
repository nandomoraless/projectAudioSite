 const gulp = require('gulp');
 const sass = require('gulp-sass');
 const browserSync = require('browser-sync').create();
 const cssnano = require('gulp-cssnano');
 const sourcemaps = require('gulp-sourcemaps');
 const autoprefixer = require('gulp-autoprefixer');
 const concat = require('gulp-concat');

 //  Sass Compiler
 function style() {
     return gulp.src('./src/scss/**/*.scss')
         .pipe(sourcemaps.init())
         .pipe(sass().on('error', sass.logError))
         .pipe(autoprefixer())
         .pipe(cssnano())
         .pipe(concat('main.css'))
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest('dist/css'))
         .pipe(browserSync.stream());
 }

 // JS compiler
 function jsconcat() {
     return gulp.src('./src/**/*.js')
         .pipe(concat('all.js'))
         .pipe(gulp.dest('dist/js'));
 }

 //  Compilers/Preview 
 function watch() {
     browserSync.init({
         server: {
             baseDir: 'dist'
         }
     });
     gulp.watch('./src/scss/**/*.scss', style);
     gulp.watch('./js/**/*.js', jsconcat).on('change', browserSync.reload);
     gulp.watch('./dist/*.html').on('change', browserSync.reload);

 }



 exports.style = style;
 exports.watch = watch;
 exports.jsconcat = concat;