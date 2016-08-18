/**
 * fudaepng
 */
var Constant = require('config');

var pageV2Tpl = require('common/page-v2');
    //初始化默认页码
    var DEFAULT_NUM = 1,POINT = '-',tplName='common/page',
    //PREV 前一页标示， NEXT 下一页的标示， UNDO 不做操作的标示
        PREV='-',NEXT='+',UNDO='x';

    /**
     * 分页对象
     * @param callback 回调函数，返回当前点击的页码
     * @param elId 在那个div下面初始化
     * @param pageTheme 主题
     * @constructor
     */
    function Page(callback,elId,pageTheme){
        this.callback = callback;//构造函数的属性
        this.$el = $("#"+elId);
        if(!this.$el[0]){
            throw new Error('没有找到ID为:'+elId+'的DIV!');
        }
        this.pageTheme = pageTheme || Constant.PAGE_THEME.A;
        this.isBindEvent = false;
    }

    Page.prototype = {
        /**
         * 初始化操作
         * @param pageCount 显示的总页数
         */
        init:function(pageCount){
            this.currentPageNum = this.currentPageNum || DEFAULT_NUM;
            this.pageCount = pageCount;
            this.initRenderData();
            if(!this.isBindEvent){
                this.initEvent();
            }
        },
        initRenderData:function(){
            var renderData = {
                list:[],
                current:this.currentPageNum,
                theme:this.pageTheme,
                total:this.pageCount
            };
            if(this.pageCount > 5){
                if(this.currentPageNum == 1){
                    renderData.list.push(1,2,3,POINT,this.pageCount);
                }else if(this.currentPageNum == 2){
                    renderData.list.push(1,2,3,4,POINT,this.pageCount);
                }else if(this.currentPageNum == 3 && this.pageCount - this.currentPageNum != 3){
                    renderData.list.push(1,2,3,4,5,POINT,this.pageCount);
                }else if(this.currentPageNum == 3 && this.pageCount - this.currentPageNum == 3){
                    renderData.list.push(1,2,3,4,5,this.pageCount);
                }else if(this.currentPageNum == 4 && this.currentPageNum + 3 < this.pageCount){
                    renderData.list.push(1,2,3,4,5,6,POINT,this.pageCount);
                }else if(this.currentPageNum == 4 && this.currentPageNum + 3 == this.pageCount){
                    renderData.list.push(1,2,3,4,5,6,this.pageCount);
                }else if(this.currentPageNum == 4 && this.currentPageNum + 3 > this.pageCount){
                    for(var i = 0; i< this.pageCount; i ++ ){
                        renderData.list.push(i + 1);
                    }
                }else if(this.currentPageNum > 3 && this.currentPageNum + 3 < this.pageCount){
                    renderData.list.push(1,POINT,this.currentPageNum - 2, this.currentPageNum -1 , this.currentPageNum, this.currentPageNum + 1, this.currentPageNum + 2, POINT , this.pageCount);
                }else if(this.currentPageNum > 3 && this.currentPageNum + 3 == this.pageCount){
                    renderData.list.push(1,POINT,this.currentPageNum - 2, this.currentPageNum -1 , this.currentPageNum, this.currentPageNum + 1, this.currentPageNum + 2, this.pageCount);
                }else if(this.currentPageNum > 3 && this.currentPageNum + 2 == this.pageCount){
                    renderData.list.push(1,POINT,this.currentPageNum - 2, this.currentPageNum -1 , this.currentPageNum, this.currentPageNum + 1, this.pageCount);
                }else if(this.currentPageNum > 3 && this.currentPageNum + 1 == this.pageCount){
                    renderData.list.push(1,POINT,this.currentPageNum - 2, this.currentPageNum -1 , this.currentPageNum, this.pageCount);
                }else if(this.currentPageNum > 3 && this.currentPageNum == this.pageCount){
                    renderData.list.push(1,POINT,this.currentPageNum - 2, this.currentPageNum -1 , this.currentPageNum);
                }
            }else{
                for(var i = 0; i<this.pageCount; i++){
                    renderData.list.push(i+1);
                }
            }
            this.render(renderData);
        },
        render:function(data){
            this.$el.html(pageV2Tpl(data));
        },
        setCurrentPageNum: function(num){
            this.currentPageNum = num;
        },
        initEvent:function(){
            this.isBindEvent = true;
            var self = this;
            //所有的li绑定click事件
            this.$el.delegate('li','click',function(){
                var num = this.getAttribute('data-num');
                if(/^\d+$/.test(num)){
                    num = num - 0;
                }else if(num == PREV){
                    num = self.currentPageNum - 1;
                    num = num === 0 ? self.currentPageNum : num;
                }else if(num == NEXT){
                    num = self.currentPageNum + 1;
                    num = num > self.pageCount ? self.currentPageNum : num;
                }else if(num == UNDO){
                    return;
                }
                self.setCurrentPageNum(num);
                self.callback(num);
                self.initRenderData();
            });
            //右侧去第几页
            if(this.$el.find('input[name="page-num"]')[0]){
                this.$el.delegate('input[name="page-num"]','keydown',function(e){
                    //回车按下
                    if(e.keyCode == 13){
                        go(this.value);
                    }
                });

                this.$el.delegate('.page-go','click',function(){
                    go(self.$el.find('input[name="page-num"]').val());
                });

            }

            function go(num){
                num = num - 0;
                if(/^[1-9]\d*$/.test(num) && num <= self.pageCount){
                    self.setCurrentPageNum(num);
                    self.callback(num);
                    self.initRenderData();
                }else{
                    //TODO 完善错误提示,根据不同theme给出不同的弹出提示
                    alert('请输入正确的整数数字');
                }
            }
        }
    };

	//callback 函数作用域变成
    module.exports = function(callback,elId,pageTheme){
        return new Page(callback,elId,pageTheme);//创建对象 利用构造函数 赋值
   }