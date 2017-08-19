'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");


gulp.task('default', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});


/* task to minify the css files
* SCSS files are converted to CSS and than minified by the following task */
gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log('=========================================');
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
      console.log('=========================================');
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css/min'));
});

// Optimizing Images
gulp.task('images', function () {
    return gulp.src('./img/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(imagemin({
            interlaced: true,
        }))
        .pipe(gulp.dest('./img'))
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['default']);
});

gulp.task('min', ['watch', 'minify-css']);
