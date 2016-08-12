/**
 * Created by admin on 15-8-25.
 */
(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory)
    } else {
        $(document).ready(function () {
            root.fixTable=factory(root.$);
        });
    }

})(this,function(){
    var tableStyle={
        fixTable: function(className,pRow, pCol,tWidth,tHeight, splitColor){
            //滚动条宽度
            var scrW = 16;

            //设置分隔线颜色
            if(!splitColor){
                splitColor = '#a7dbbd';
            }

            //得到表格本身
            var t = $("."+className);
            //var pid = 'fixbox_'+t.attr('class');
            //如果传进来的是多个class值
            var rex=/^\S+/;
            var tableClassName=rex.exec(className);
            var pid = 'fixbox_'+tableClassName;

            t.show();

            //得到表格实际大小
            var tw = t.outerWidth(true);
            var th = t.outerHeight(true);

            //在外部包一个DIV,用来获取允许显示区域大小
            t.wrap("<div id='"+pid+"' ></div>");
            var p = $('#'+pid);
            p.css({
                width: '100%',
                height: '100%',
                border: '0px',
                margin: '0 0 0 0',
                padding: '0 0 0 0'
            });

            //允许显示区域大小
            t.hide();
//    var cw = p.outerWidth(true);
//    var ch = p.outerHeight(true);
            var cw=tWidth;
            var ch=tHeight;
            t.show();

            //拿到表格的HTML代码
            var thtml = p.html();

            //判断是否需要固定行列头
            if(tw<=cw && th<=ch){
                return;
            }
            //判断需要固定行/列/行列
            var fixType = 4;	//全固定
            if(tw<=cw-scrW){	//宽度够, 高度不够
                fixType = 1;	//行固定
                cw = tw+scrW;
            }else if(th<=ch-scrW){	//高度够, 宽度不够
                fixType = 2;	//列固定
                ch = th+scrW;
            }
            //固定单元格的位置
            var w1 = 0;
            var h1 = 0;

            var post = t.offset();

            var p1, p2, p3, p4;
            if(fixType==4){	//行头列头都需固定
                //取出指定行列单元格左上角的位置,单位px
                var pos = t.find('tr').eq(pRow).children('td,th').eq(pCol).offset();

                w1 = pos.left - post.left;
                h1 = pos.top - post.top;


                var tmp='<div style="position: relative; overflow:hidden;height:'+ch+'px;width:'+cw+'px"><div class="lt aa" id="'+pid+'1" style="border-bottom: 2px solid '+splitColor+';border-right:2px solid '+splitColor+'"></div><div class="rt aa" id="'+pid+'2" style="border-bottom: 2px solid '+splitColor+';"></div><div class="lb aa" id="'+pid+'3" style="border-right:2px solid '+splitColor+'"></div><div class="rb aa" id="'+pid+'4"></div></div>';
                p.before(tmp);

                $('div[id^='+pid+']').each(function(){
                    $(this).css({
                        position:"absolute",
                        background: 'white',
                        overflow: 'hidden',
                        margin: '0 0 0 0',
                        padding: '0 0 0 0'
//                border: '0'
                    });
                });
                p1 = $('#'+pid+'1');
                p2 = $('#'+pid+'2');
                p3 = $('#'+pid+'3');
                p4 = $('#'+pid+'4');

                //左上角方块
                p1.html(thtml).css({width: w1-1, height: h1-1,zIndex:3});

                //右上方块
                p2.html(thtml).css({width: cw-w1-scrW, height: h1-1,left:w1,zIndex:2});
                p2.find('table:first').css({
                    position: 'relative',
                    left: -w1
                });

                //左下方块
                p3.html(thtml).css({width: w1-1, height: ch-h1-scrW,position:"relative",top:h1,zIndex:2});
                p3.find('table:first').css({
                    position: 'relative',
                    top: -h1
                });

                //主方块
                p4.append(p).css({
                    position:"absolute",
                    top:0,
                    left:0,
                    width:cw,
                    height:ch,
                    overflow: 'auto',
                    zIndex:1
                });

                p.css({width: tw, height: th, overflow: 'hidden'});

                p4.scroll(function(){
                    p2.scrollLeft($(this).scrollLeft());
                    p3.scrollTop($(this).scrollTop());
                });
            }
            else if(fixType==1){	//只需固定行头
                var pos = t.find('tr').eq(pRow).children('td,th').first().offset();
                h1 = pos.top - post.top;
                var tmp='<div style="position: relative; overflow:hidden;height:'+ch+'px;width:'+cw+'px"><div class="lt aa" style="border-bottom: 2px solid '+splitColor+'" id="'+pid+'1"></div><div class="rb aa" id="'+pid+'2"></div>';
                p.before(tmp);
                $('div[id^='+pid+']').each(function(){
                    $(this).css({
                        position:"absolute",
                        background: 'white',
                        overflow: 'hidden',
                        margin: '0 0 0 0',
                        padding: '0 0 0 0'
//                border: '0'
                    });
                });
                p1 = $('#'+pid+'1');
                p2 = $('#'+pid+'2');
                //上方方块
                p1.html(thtml).css({width: tw, height: h1-1,zIndex:2});

                //主方块
                p2.append(p).css({
                    width: cw+1,
                    height: ch,
                    top:0,
                    left:0,
                    overflow: 'auto',
                    zIndex:1
                });
                p.css({width: tw, height: th, overflow: 'hidden'});
            }
            else if(fixType==2){	//只需固定列头
                var pos = t.find('tr').first().children('td,th').eq(pCol).offset();
                w1 = pos.left - post.left;
                var tmp='<div style="position: relative; overflow:hidden;height:'+ch+'px;width:'+cw+'px"><div class="lt aa" style="border-right: 2px solid '+splitColor+'" id="'+pid+'1"></div><div class="rb aa" id="'+pid+'2"></div>';
                p.before(tmp);
                $('div[id^='+pid+']').each(function(){
                    $(this).css({
                        position:"absolute",
                        background: 'white',
                        overflow: 'hidden',
                        margin: '0 0 0 0',
                        padding: '0 0 0 0'
//                border: '0'
                    });
                });
                p1 = $('#'+pid+'1');
                p2 = $('#'+pid+'2');
                //左侧方块
                p1.html(thtml).css({width: w1-1, height: th,zIndex:2});

                //主方块
                p2.append(p).css({
                    top:0,
                    left:0,
                    width: cw,
                    height: ch+1,
                    overflow: 'auto',
                    zIndex:1
                });
                p.css({width: tw, height: th, overflow: 'hidden'});
            }
        }
    };
    return {
        /**
         * 自适应表格
         * @param className 表格的类名（注意一定是表格的，不是外部包裹的div的）
         * @param pRow      固定的行数
         * @param pCol      固定的列数
         * @param tWidth    显示区域的宽度
         * @param tHeight   显示区域的高度
         * @param splitColor 分割符的颜色（可以为空）
         */
        init:function(className,pRow, pCol,tWidth,tHeight, splitColor){
           // var fun=tableStyle.fixTable;
           // $(className).fun(pRow, pCol, splitColor);
            tableStyle.fixTable(className,pRow, pCol,tWidth,tHeight, splitColor);
        }
    }
});