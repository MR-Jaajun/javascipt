//该文件的作用：写任务，在命令行执行任务就可以进行自动化的构建了
var gulp = require("gulp");

//复制图片
gulp.task("copyimg",function(){
    return gulp.src("src/img/*").pipe(gulp.dest("dist/img"));
})

gulp.task("copyimg2",["copyimg"],function(){
    return gulp.src("src/img/**").pipe(gulp.dest("dist/img"));
})

//复制api文件
gulp.task("copyapi",function(){
    return gulp.src("src/api/*").pipe(gulp.dest("dist/api"));
})

//复制lib里面的所有文件
gulp.task("copylib",function(){
    return gulp.src("src/lib/*").pipe(gulp.dest("dist/lib"));
})

gulp.task("copylib2",["copylib"],function(){
    return gulp.src("src/lib/**").pipe(gulp.dest("dist/lib"));
})

//1.压缩主html

var yasuohtml = require("gulp-htmlmin");

gulp.task("htmlmin", function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src("src/index.html").pipe(yasuohtml(options)).pipe(gulp.dest("dist"));

})

//2.压缩css

var yasuocss = require("gulp-cssmin");

gulp.task("cssmin",function(){
    return gulp.src("src/css/*").pipe(yasuocss()).pipe(gulp.dest("dist/css"));
})

//3.压缩小html
gulp.task('xiaohtml',function(){
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };

    return gulp.src("src/html/*").pipe(yasuohtml(options)).pipe(gulp.dest("dist/html"));
})

//4.压缩js
var yasuojs = require("gulp-uglify");
var babel = require("gulp-babel");

gulp.task("jsmin",function(){
    return gulp.src("src/js/*").pipe(babel({
        "presets" : ["es2015"]
    })).pipe(yasuojs()).pipe(gulp.dest("dist/js"));
})