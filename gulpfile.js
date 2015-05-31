/*jslint node:true */
"use strict";

/* Configuration */

var path = {
    css : "css",
    scss: "scss"
};

/* Support Navigateur */

var browser_support = [
    "ie >= 9",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    "bb >= 10"
];

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

    gulp.watch(path.scss + '/**/*.scss', ['sass']);

});
