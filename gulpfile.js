/*jslint node:true */
"use strict";

/* Configuration */

var path = {
    css: "css",
    scss: "scss",
    img: "img"
};

/* Support Navigateur */

var browser_support = ["Explorer >= 8", "ExplorerMobile >= 11", "Firefox >= 31", "Chrome >= 31", "Safari >= 7", "Opera >= 23", "iOS >= 7.1", "Android 4.1", "BlackBerry >= 10"];

/* Require */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


/* Task */

gulp.task('sass', function () {

    gulp.src(path.scss + '/**/*.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: browser_support,
            cascade: false
        }))
        .pipe(gulp.dest(path.css))
        .pipe($.size());

});

gulp.task('default', function () {
    gulp.watch(path.img + '/icons/@2x/*.png', ['sprite']);
    gulp.watch(path.scss + '/**/*.scss', ['sass']);
    gulp.watch(path.img + '/icons/**/*.scss', ['sass']);

});

gulp.task('copyNonRetina', function () {
    var destination = path.img + "/icons/icones/";
    gulp.src(path.img + "/icons/@2x/*.png")
        .pipe($.imageResize({
            width: "50%",
            height: "50%",
            imageMagik: true
        }))
        .pipe(gulp.dest(destination));

});

gulp.task('sprite', ['copyNonRetina'], function () {
    var spriteData = gulp.src(path.img + '/icons/icones/*.png')
        .pipe($.spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));

    spriteData.img.pipe(gulp.dest(path.img));
    spriteData.css.pipe($.minifyCss()).pipe(gulp.dest(path.img));
});
