var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var spritesmith = require('gulp.spritesmith');  
var gulp_sass = require('gulp-sass');
var connect = require('gulp-connect');

//// Gulp要做的事情：
// 1.	配置gulp环境
// 2.	拷贝index
// 3.	拷贝html下的所有*.html
// 4. 	拷贝css
// 5.	连接、压缩、生成output.js
// 6.     拷贝imgs下的所有图片
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
function html(){
     return gulp.src('./src/html/**/*.html')
               .pipe(gulp.dest('./dist/html'))
}
gulp.task('html',html)

//拷贝css
function css(){
     return gulp.src('./src/css/**/*.css')
               .pipe(gulp.dest('./dist/css'))
}
gulp.task('css',css)

//连接、压缩、生成output.js
function js(){
     return gulp.src('./src/js/*.js')
               .pipe(concat('output.js'))
               .pipe(uglify())
               .pipe(gulp.dest('./dist/js'))
}
gulp.task('js',js)
//拷贝其他js文件 jq、layer弹层等插件
function other_js(){
     return gulp.src('./src/js/{JQuery,layer}/**/*.*')
               .pipe(gulp.dest('./dist/js'))
}
gulp.task('other_js',other_js)

//拷贝imgs下的所有图片
function img(){
     return gulp.src('./src/resource/img/**/*.{jpg,png,ico}')
               .pipe(gulp.dest('./dist/resource/img'))
}
gulp.task('img',img)
//拷贝font样式
function font(){
     return gulp.src('./src/resource/font/**.*')
               .pipe(gulp.dest('./dist/resource/font'))
}
gulp.task('font',font)

//拷贝任务通道
var copy = gulp.parallel(index,html,css,js,other_js,img,font)
gulp.task('copy',copy)

//生成精灵图
function sprite(){
     return gulp.src('./src/resource/icon/**/*.png')
               .pipe(spritesmith({
                    imgName: 'sprite.png',
                    cssName: 'sprite.css'
               }))
               .pipe(gulp.dest('./dist/resource/icon'))
}
gulp.task('sprite',sprite)

//配置sass
function sass(){
     return gulp.src('./src/style/**/*.scss')
               .pipe(gulp_sass({
                    //outputStyle: 'nested'       //嵌套的 目前看来最后一个大括号不独占一行 默认
                    outputStyle: 'compact'      //压紧 横着紧跟着写法
                    //outputStyle:'expanded'      //扩展的 相当于正常模式下
                    // outputStyle: 'compressed'  //精简 相当于2行压缩代码
               }))
               .pipe(gulp.dest('./dist/css'))
}
gulp.task('sass',sass)

//拷贝库文件
var all = gulp.parallel(sprite,copy,sass);
gulp.task('all',all)

function reload(){
     gulp.src('./dist/**/*.html')
          .pipe(connect.reload())
}

//监听src下文件的改变，自动进行构建
function watch(){
     gulp.watch('./src/**/*.*',all)
     gulp.watch('./dist/**/*.*',reload)
}
gulp.task('watch',watch)

//自动刷新页面 通过执行这个函数去监听dist文件下的所有
function server(){
     return connect.server({
          root: './dist',
          livereload: true
      })
}
gulp.task('server',server)

//最终
var final = gulp.parallel(server,watch)
gulp.task('default',final)