var fs = require('fs');
var url = require('url');
var path = require('path');

var gulp = require('gulp');
var babel = require('gulp-babel');  //es6->es5
var devSass = require('gulp-sass'); //编译css
var devConcat = require('gulp-concat'); //合并
var server = require('gulp-webserver'); //起服务
var devUglify = require('gulp-uglify'); //压缩js
var cleanCss = require('gulp-clean-css'); //压缩css

// 任务列表

// 1 编译sass  -- 到src下css
gulp.task('devSass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(devSass()) //编译
        .pipe(gulp.dest('./src/css/'))
        .pipe(cleanCss()) //压缩
        .pipe(gulp.dest('./dist/css/'))
})

// 2 启动服务
gulp.task('server', function () {
    return gulp.src('./src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            // middleware: {

            // }
        }))
})

// 3 合并js
gulp.task('devConcat', function () {
    return gulp.src('./src/js/*.js')
        .pipe(devConcat('build.js')) //合并js
        .pipe(gulp.dest('./src/js/'))
})

// 4 压缩js
gulp.task('devUglify', function () {
    return gulp.src('./src/js/build.js')
        .pipe(babel({
            presets: ['@babel/env']
        })) //->es5
        .pipe(devUglify())  //压缩js
        .pipe(gulp.dest('./dist/js/'))
})

// 5 watch 监听js压缩 css编译
gulp.task('watch', function () {
    return gulp.watch(['./src/scss/*.scss', './src/js/build.js'], gulp.parallel('devUglify', 'devSass'))
})

// 默认执行任务
gulp.task('default', gulp.parallel('devSass', 'devConcat', 'devUglify', 'server', 'watch'))

// build 任务 js css生成到dist文件夹
gulp.task('build', gulp.parallel('devSass', 'devConcat', 'devUglify'))

// devSass 编译sass
// devConcat 合并js
// devUglify 压缩js