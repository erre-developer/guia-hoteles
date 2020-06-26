'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin'),
    src = require('gulp'),
    dest = require('gulp');
    

gulp.task('sass', function () {
    return gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
    });

gulp.task('sass:watch', function () {
        gulp.watch('./css/*.scss', gulp.series('sass'));
    });


gulp.task('browser-sync', function () {
    var files = ['./*.html','./css/*.css','./images/*.{png,jpg,gif}','./js/*.js'];
        
    browserSync.init(files, {
            server: {
                baseDir: "./"
            }
        });
});

gulp.task('clean', function (){
    return del(['dist']);
});

gulp.task('imagemin', function (){
    return gulp.src('./images/*.{png,jpg,jpeg,gif}')
    .pipe(imagemin({optimizationLevel:3 , progressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/images'));
});


gulp.task('usemin', function () {
    return gulp.src('./*.html')
    .pipe(flatmap( function (stream) {
        return stream
            .pipe(usemin({
                css: [rev()],
                html: [function() { return htmlmin({collapseWhitespace: true })}],
                js: [uglify(), rev()],
                inlinesjs: [uglify()],
                inlinescss: [cleanCss(), 'concat']
            }));
    }))
    .pipe(gulp.dest('dist/'));
})

gulp.task('copyfonts', function (){
    return gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
    .pipe(gulp.dest('./dist/fonts'));
});

//Task Build
gulp.task('build', gulp.series('clean','sass','imagemin','usemin','copyfonts'));

//Task default
gulp.task('default', gulp.parallel('browser-sync','sass:watch'));
