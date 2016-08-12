/**
 * fudapeng 2015.12.3
 */
//webpackage 配置文件
var getWebpackConfig = require('./webpack-config');
// webpack 插件
var webpack = require('webpack-stream');

var gulp = require('gulp');
// 防止pipe出错,报错
var plumber = require('gulp-plumber');
// 监听文件变化
var gulpWatcher = require('gulp-watch');
// 转换 less 代码
var less = require('gulp-less');
// 转换 sass 代码
// var sass = require('gulp-sass');
// 转换es6 代码
// var babel = require('gulp-babel');
// 转换react 代码
// var react = require('gulp-react');
// 文件块命名
var named = require('vinyl-named');
// 编译tmod模板
// var tmodjs = require('gulp-tmod');
/*生成SourceMap*/
var lessSourceMaps = require('gulp-sourcemaps');

/*压缩css*/
// var cssMinify = require('gulp-minify-css');
/*压缩js代码*/
// var uglify = require('gulp-uglify');
/*压缩图片*/
// var imagemin = require('gulp-imagemin');
//MD5版本生成工具
var rev = require('gulp-rev');
//MD5版本生成工具 HTML资源路径修改
var revCollector = require('gulp-rev-collector');

//删除文件
var del = require('del');
//删除文件
var vinylPaths = require('vinyl-paths');

var path = require('path');

var tmpPath = path.join(__dirname,'dist','tmp');

var distPath = path.join(__dirname,'dist');



gulp.task('watch:less-dev', ['less-to-css'], function  () {
	gulp.watch(path.join(__dirname,'less/**/*.less'),['less-to-css'])

})

gulp.task('less-to-css',function () {
	return 	gulp.src(path.join(__dirname , "/less/*.less"))
			.pipe(plumber())
			.pipe(lessSourceMaps.init())
			.pipe(less({
	            path:[path.join(__dirname , '/less/common')]
	        }))
			.pipe(lessSourceMaps.write('./maps'))
			.pipe(plumber.stop())
			.pipe(gulp.dest(path.join(__dirname + '/bundle/css/')));
})
gulp.task('watch:js-dev',function () {
	return gulp.src(path.join(__dirname + '/js/main/*.js'))
		.pipe(plumber())
		.pipe(named())
		.pipe(webpack(getWebpackConfig(true,true,false)))
		.pipe(plumber.stop())
        .pipe(gulp.dest(path.join(__dirname + '/bundle/js/')));
})
//静态文件for dev
gulp.task('publish-static-js',function(){
    return gulp.src([path.join(__dirname , '/dep/jquery-1.9.1.min.js'),path.join(__dirname,'/dep/util/mock.js')])
        .pipe(gulp.dest(path.join(__dirname , '/bundle/js/')));
});
gulp.task('publish-img',function(){
    return gulp.src(path.join(__dirname , '/img/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname , '/bundle/img/')));
});

gulp.task("dev",[
	'watch:js-dev',
	'watch:less-dev',
	'publish-static-js',
	'publish-img'

	]);
/*正式包*/

gulp.task('fdp',function(){
	console.log(11);
})