/**
 * fudapeng
 */

 	var pageV3Tpl = require('common/page-v3');
	/*
	Page 构造函数
	*/
   function Page(callback,id){
       this.callback=callback;//callback属性
       this.$el=$("#"+id);
       this.isBindEvent=false;//全局的变量 解决重复绑定事件问题
   }
	/*
	pageCount 参数是当前接口返回的全部的页数
	setCurrentPageNum(num) num 由外部调用方法传递 当前的页码
	*/
Page.prototype = {
    init:function (pageCount) {
      this.currentPageNum=this.currentPageNum||1;
      this.totalPageNum=pageCount;//分的页数
      this.initPageData();
      if(!this.isBindEvent){
          this.initEvent();//外部调用的时候 多次绑定的问题 也用个全部变量判断
      }
    },
    //初始化数据
    initPageData: function (){
        var data = {
        currentPageNum:this.currentPageNum,
        totalPageNum:this.totalPageNum
	    };
	    this.renderPage(data);
	    this.validatePage();
	},
    //数据交互操作
   	initEvent:function(){
       this.isBindEvent=true;//绑定一次 isBindEvent 是page对象的属性
       var self=this;
	    //前一页
	    this.$el.delegate('.jump-page .jump-page-li-box-left', 'click', function () {
	         var num=null;
	        if (self.currentPageNum != 1){
	            num=--self.currentPageNum;
	            self.callback(num);//执行ajax
	        }
	    });
	    //后一页
	    this.$el.delegate('.jump-page .jump-page-li-box-right', 'click', function () {
	        var num=null;
	        if (self.currentPageNum != self.totalPageNum) {
	           num=++self.currentPageNum;
	           self.callback(num);//回调函数 执行完自己调用之后调用 callback 函数

	        }
	    });
	    //跳转
	    this.$el.delegate('.jump-page .jumplink', 'click', function () {
	        console.log("我执行了跳转操作");
	        $(this).parent().next().removeClass("none");
	        //p标签隐藏
	        $(this).parent().next('.jump-page-popbox').find('p').hide();
	    });
	    //GO输入框判断
	    this.$el.delegate('.jump-page .jump-page-popbox .jump-page-go', 'click keydown', function (e){
	        if(e.keyCode==13){//回车键
	            validateInput($(this).prev('input').val());
	        }
	        validateInput($(this).prev('input').val());//输入参数为前面input框里面的value
	    });
	    function validateInput(val) {
	        //对于前面输入框的校验
	        val=val-0;
	        if (/^[1-9]\d*$/.test(val) && val<= self.totalPageNum) {
	            //值符合要求则 隐藏p标签  清空input框里的内容 隐藏弹出框 调用callback函数
	           self.$el.find('.jump-page-popbox p').hide();
	           self.$el.find('.jump-page-popbox input').val("");
	           self.$el.find('.jump-page-popbox').hide();
	           //调用callback函数 调用ajax
	           self.callback(val);

	        } else {
	            //值不符合要求 显示p标签的内容 清空input框里面的内容
	           self.$el.find('.jump-page-popbox p').show();
	           self.$el.find('.jump-page-popbox input').val("");
	        }
	    }
	},
	//渲染分页页面 data自己拼装 currentPageNum pageCount
	renderPage:function (data){
	    //接口的时候传入el,以及data
	    this.$el.html(pageV3Tpl(data));
	},
	setCurrentPageNum: function (num) {
	    this.currentPageNum = num;
	},
	//每次初始化的时候 都要进行页数判断
	validatePage:function(){
	    if (this.currentPageNum != this.totalPageNum) {
	        if (this.currentPageNum == 1) {//将前一页置为灰色 解除click的绑定
	            $('.jump-page-li-box-left').css("background-color", "#efefef").unbind('click');
	        }
	    } else {
	        if (this.currentPageNum == 1) {//前一页置为灰色 后一页置为灰色
	            $('.jump-page-li-box-left').css("background-color", "#efefef").unbind('click');
	            $('.jump-page-li-box-right').css("background-color", "#efefef").unbind('click');
	        } else {
	            $('.jump-page-li-box-right').css("background-color", "#efefef").unbind('click');
	        }
	    }
    }
};
module.exports = function(callback,id){
      return new Page(callback,id);
  	}
