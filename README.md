# git-test

测试 git
1.创建分支dev





/**
 * gulp plugins
 */
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
var tmodjs = require('gulp-tmod');
/*处理JS时，生成SourceMap*/
var lessSourceMaps = require('gulp-sourcemaps');

/*压缩css*/
var cssMinify = require('gulp-minify-css');
/*压缩js代码*/
var uglify = require('gulp-uglify');
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


/*重命名文件*/
var rename = require('gulp-rename');
/*更改提醒*/
var notify = require("gulp-notify");