var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    bourbon = require('node-bourbon').includePaths,
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

gulp.task('sass', function() {
    return gulp.src(['src/sass/pluma-select2.sass',
                     'src/sass/pluma-select2-blue.sass',
                     'src/sass/pluma-select2-teal.sass',
                     'src/sass/pluma-select2-dorange.sass'])
        .pipe(sass({
            includePaths: bourbon,
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('minify-css', function() {
    return gulp.src(['dist/css/pluma-select2.css',
                     'dist/css/pluma-select2-blue.css',
                     'dist/css/pluma-select2-teal.css',
                     'dist/css/pluma-select2-dorange.css'])
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('watch', ['sass', 'minify-css', 'browserSync'], function() {
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
