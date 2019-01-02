var fs = require('fs');
var url = require('url');
var path = require('path');

var gulp = require('gulp');
var babel = require('gulp-babel');
var devSass = require('gulp-sass');
var devConcat = require('gulp-concat');
var server = require('gulp-webserver');
var devUglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');


// 2.以自己的名字作为本地的开发分支，在开发分支进行开发，开发完成后合并到master分支提交到远程的master分支（10分）；
// 3.使用gulp搭建前端自动化开发环境（10分）；
// 4.在gulp中使用webserver启动web服务，并且提供自动刷新功能（10分）；
// 5.在gulp中创建scss任务，进行scss文件编译，并且压缩css（10分）；
// 6.在gulp中创建js任务编译js文件，合并js，并且压缩（10分）；
// 7.在gulp中创建watch任务，进行js，css文件监听，自动执行对应的任务（10分）；
// 8.在gulp中创建default任务，默认执行browserSync服务，js，css，watch任务（10分）；
// 9.在gulp中创建build任务，指向js,css任务，并把文件生成到dist文件夹（10分）；
// 10.创建每一个任务在录屏中都需要有演示，演示成功后进行git版本提交，最后展示git版本提交记录（10分）；

// 编译sass  -- 到src下css
gulp.task('devSass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(devSass()) //编译
        .pipe(cleanCss()) //压缩
        .pipe(gulp.dest('./src/css/'))
})

// 启动服务
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

// 压缩js
// gulp.task('default', () =>
// 	gulp.src('src/app.js')
// 		.pipe(babel({
// 			presets: ['@babel/env']
// 		}))
// 		.pipe(gulp.dest('dist'))
// );