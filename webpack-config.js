/**
 * create by fudapeng 2015-12-10
 */

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
/**
 *
 * @param  {Boolean} isDev [是否开启开发者模式]
 * @param 	isOpenDevTool 是否开启调试工具 true 开启
 * @param  {Boolean} isRev [是否开启版本化控制]
 */
module.exports = function (isDev,isOpenDevTool, isRev ) {
	return {
		watch: isDev,//是否开启监听
		cache: true,
		devtool:isDev ? "#inline-source-map" : null,//调试，错误定位
        output: (function () {
            if(!isRev){
                return {
                    path:path.join(__dirname ,'bundle','js'),
                    publicPath:'/bundle/js/',//配置chunkFile加载地址的,这里要写服务器路径,可以写cdn的地址
                    filename:'[name].js',
                    chunkFilename:'[name].chunk.js'//给require.ensure用
                };
            }else{
                return {
                    path:path.join(__dirname ,'bundle','js'),
                    publicPath:'/bundle/js/',//配置chunkFile加载地址的,这里要写服务器路径,可以写cdn的地址
                    filename:'[name]-[chunkhash].min.js',
                    chunkFilename:'[name]-[chunkhash].chunk.min.js'
                };
            }
        }()),
		module: {
			loaders: [
				{test:/\.less$/,loader:"style!css!less"},//less加载
				{test:/\.json$/,loader:'hson'},//加载json对象
				{test:/\.tpl$/,loader:'tmodjs'},//tpl加载对象
				{test:/\.(png|jpeg|jpg|gif)$/,loader:'url?limit?=8192'},//图片加载
                {test:/^es5-sham\.min\.js|es5-shim\.min\.js$/,loader:'script'}
			]
		},
		resolve: {
			extensions: ['','.js','.less','.tpl','.json'],
			root:[path.join(__dirname,'js')],
            modulesDirectories:['node_modules','dep','tpl','config'],
            alias:{
                'echarts$':'echarts/echarts.js',
                'echarts':'echarts/src',
                'zrender$':'zrender/src/zrender.js',
                'zrender':'zrender/src',
                // 'mock':'mock.js',
                'store':'store.min.js',
                'es5-sham':'es5-sham.min.js',
                'es5-shim':'es5-shim.min.js',
                'pinyin':'pinyin/pinyin.js',
                'web-uploader':'web-uploader/webuploader.min.js',
                'um':'umeditor122/umeditor.js',
                'um-config':'umeditor122/umeditor.config.js',
                'um-img':'umeditor122/dialogs/image/image.js'
            }
		},

	    plugins: (function () {
	    	var plugins;
            if(!isRev){
                plugins = [
                    new webpack.optimize.CommonsChunkPlugin({
                        name:['vendor'],
                        filename:'vendor.js',
                        minChunks:Infinity//Infinity 代表不进行合并，主要是开发的时候能用上，线上版本的时候 最好写成一个数字比如3，当出现3次的时候将打包进入vendor中
                    })
                    //自动加载jquery
                    /*new webpack.ProvidePlugin({
                        $: "jquery"
                    })*/

                ];
            }else{
                plugins = [
                    new webpack.optimize.CommonsChunkPlugin({
                        name:'vendor',
                        filename:isRev ? '[name]-[chunkhash].min.js' : '[name].js',
                        minChunks:10//Infinity 代表不进行合并，主要是开发的时候能用上，线上版本的时候 最好写成一个数字比如3，当出现3次的时候将打包进入vendor中
                    }),
                    //代码压缩
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                    function() {
                        this.plugin("done", function(stats) {
                            var chunkNameInfo = stats.toJson().assetsByChunkName;
                            var results = {};
                            //KEY值加上.js
                            for(var key in chunkNameInfo){
                                results[key + '.js'] = chunkNameInfo[key];
                            }
                            fs.writeFileSync(path.join(__dirname, "bundle", "stats.json"),JSON.stringify(results));
                        });
                    }
                ];
            }
            return plugins;
        })(),
	    externals:{
	    	'jquery':'$',
            'Mock': true
	    }

	}
}