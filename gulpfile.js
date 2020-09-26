  'use strict';

  var gulp = require('gulp'),
    minifyHtml = require("gulp-minify-html"),
    minifyCss = require("gulp-minify-css"),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename'),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss')

  var js_files = ['src/assets/js/main.js', 'src/assets/js/home.js'];

  var bs = require('browser-sync').create(); // create a browser sync instance.

  // HTML related

  gulp.task('html', async function () {
  gulp.src('src/*.html')
  .pipe(minifyHtml())
  .pipe(gulp.dest('dist/'))
  .pipe(bs.reload({stream: true}));
  });

  // Styling related

  gulp.task('scss', async function () {
  return gulp.src('src/assets/scss/styles/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(postcss([ autoprefixer() ]))
  .pipe(concat('custom.css'))
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/assets/css/'))
  .pipe(bs.reload({stream: true}));
  });

  gulp.task('css', function () {
  gulp.src('src/assets/scss/compiled/**/*.css')
  .pipe(minifyCss())
  .pipe(concat('custom.css'))
  .pipe(sourcemaps.init())
  .pipe(postcss([ autoprefixer() ]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/assets/css/'))
  .pipe(bs.reload({stream: true}));
  });

  // Javascript related

  gulp.task('js', async function() {
  gulp.src(js_files)
  .pipe(concat('concat.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/assets/js/'));
  });

  // Image related

  gulp.task('image', async function () {
  gulp.src('src/assets/media/images/**/*')
  .pipe(imagemin([
  imagemin.gifsicle({interlaced: true}),
  imagemin.mozjpeg({quality: 75, progressive: true}),
  imagemin.optipng({optimizationLevel: 5}),
  imagemin.svgo({
    plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
    ]
  })
  ])).pipe(gulp.dest('dist/assets/media/images/'))
  .pipe(bs.reload({stream: true}));
  });

  // Watching tasks

  gulp.task('sass:watch', async function () {
  gulp.watch('src/assets/scss/styles/**/*.scss', gulp.series('scss'));
  });

  gulp.task('image:watch', async function () {
  gulp.watch('src/assets/media/images/**/*', gulp.series('image'));
  });

  gulp.task('html:watch', async function () {
  gulp.watch('src/*.html', gulp.series('html'));
  });

  gulp.task('browser-sync', function() {
      bs.init({
          server: {
              baseDir: "dist/"
          }
      });
  });

  // Default task

  gulp.task('default', gulp.series('sass:watch', 'image:watch', 'html:watch', 'browser-sync'));
