/**
 * fudapeng
 * 2016-3-7
 */

module.exports = {
	//计算echart title 高度
    eHeight: function (array){
        //有些是没有图例的
        if (!array) {
            return 60;
        }
        array = [].slice.call(array);//将array对象转化为数组,array不一定是个数组
        if (!(array instanceof Array)) {
            return;
        }
        var StringPx = array.join('').length*14;
        var elsePL = array.length*(20+10);
        var YHeight = Math.ceil((StringPx+elsePL)/850)*24+10;//向上修正10像素
        return YHeight < 60 ? 60 : YHeight;
    },
    /**
     * 数据缩放
     * @param legendLength      图例长度
     * @param categoryLength    类目轴长度
     */
	dataZoom:function (legendLength, categoryLength) {
  		var length = legendLength * categoryLength;
		if (length < 10) {
            return null;
        } else if (length >= 10 && length < 20) {
            return {
                show: true,
                end: 50
            };
        } else if (length >= 20 && length < 40) {
            return {
                show: true,
                end: 40
            };
        } else if (length >= 40 && length < 60) {
            return {
                show: true,
                end: 20
            };
        } else if (length >= 60) {
            return {
                show: true,
                end: 10
            };
        }
	},
    /*
    返回的两个值，一个是x轴的类名数组，一个是距离底部的距离，需要写在grid里的y2的值
     */
    xAxisNames:function(names){
        var i,categoryNames=[],bottomDistance,returnData={};
        var rex=/^\w+$/;
        var nameRow=1;
        for(i=0;i<names.length;i++){
            if(rex.test(names[i])||names[i]<=9){
                categoryNames.push(names[i]);
            }
            else{
                categoryNames.push(names[i].replace(/(.{9})/g,"$1\n"));
                if(Math.ceil(names[i].length/9)>nameRow){
                    nameRow=Math.ceil(names[i].length/9);
                }
            }
        }
       bottomDistance=nameRow*15+45;
        returnData.xAxisData=categoryNames;
        returnData.gridBottom=bottomDistance;
        return returnData;
    },
    //使用时加上这个
//    grid:{
//        x: 105,//据左侧的距离
//    },
//    yAxis: [
//        {
//            name:"考试",
//            type: 'category',
//            axisLabel: {
//                margin: returnData.yMargin,
//                textStyle: {
//                    align: 'left'
//                }
//            },
//            data:returnData.categoryName
//        }
//    ],
    yAxisNames:function(names){
        var dataName=[],len= 0,margin=100, dataHeight,chartHeight,returnData={};
        var nameLen=names.length;
        for(var i=0;i<names.length;i++){
            dataName.push(names[i].replace(/(.{7})/g, "$1\n"));
            if (names[i].length > len) {
                len = names[i].length;
            }
        }
        if (len < 7) {
            margin = 100 - (7 - len) * 13;
        }
        dataHeight = Math.ceil(len / 7) * 20 + 60;
        chartHeight=dataHeight*nameLen+100+"px";
        returnData.chartHeight=chartHeight;  //图形的高度
        returnData.yMargin=margin; //y轴的编剧
        returnData.categoryName=dataName;  //y轴的名称
        return  returnData;
    }

};