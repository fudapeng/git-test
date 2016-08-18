/**
 * fudapeng
 */
var RecogIndexName = require('util/recognize-index-name');
	function getRecognizeByIndex(index, isReturnTotalObj){
		for(var e in RecogIndexName){
		   	if(RecogIndexName.hasOwnProperty(e)){
			      if(RecogIndexName[e].id == index){
			        if(isReturnTotalObj){
			          return RecogIndexName[e];
			        }else{
			          return RecogIndexName[e].name;
			        }
			      }
		   	}
		}
	}
  /*
   * @param index  认知类型id        必填
   * @param isReturnTotalObj 是否是返回recognizeType的所有属性      可选
  */
module.exports = function(index, isReturnTotalObj){
   return getRecognizeByIndex(index, isReturnTotalObj);
  };