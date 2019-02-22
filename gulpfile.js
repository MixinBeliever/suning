var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var spritesmith = require('gulp.spritesmith');  
var gulp_sass = require('gulp-sass');

//// Gulp要做的事情：
// 1.	配置gulp环境
// 2.	拷贝index
// 3.	拷贝html下的所有*.html
// 4. 	拷贝css
// 5.	连接、压缩、生成output.js
// 6.   拷贝imgs下的所有图片
// 7.	生成精灵图
// 8.	拷贝库文件
// 9.	监听src下文件的改变，自动进行构建
// 10.	自动刷新页面

//拷贝index
function index(){
    return gulp.src('./src/index.html')
                .pipe(gulp.dest('./dist'))
}
gulp.task('index',index)
//拷贝html下的所有*.html






function watch(){
     gulp.watch('./src/index.html',index)
}
gulp.task('watch',watch)