/**
 * fudapeng
 */
//构造函数
    function FixDisplay(selector, prSelector, top, left, isDelayFixed) {
        this.isDelayFixed = isDelayFixed;
        this.$el = $(selector);
        this.$prEl = $(prSelector);
        //top,left给即将添加上position为absolute的元素相对于父元素的top,left位置
        this.toPrElPos = {
            top: top,
            left: left
        };
        if (!this.$el[0]) {
            throw new Error('error:元素不存在');
        }
        //计算好原来的位置
        this.pos = {};
        this.pos.x = this.$el.offset().left;
        this.pos.y = this.$el.offset().top;
        this.init();
    }

    FixDisplay.prototype = {
        init: function () {

            var lastY = getPageYOffset();//纵向滚动条距离页面窗口左上角的距离 初始值
            var lastX = getPageXOffset();//横向滚动条距离页面窗口左上角的距离 初始值
            var _self = this;
            var _offsetTop;

            $(window).scroll(function (e) {
                //TODO 这里判断上下滚动与左右滚动，会导致页面上有一下的抖动问题。后续需找替代方法。
                var currentY = getPageYOffset();
                var currentX = getPageXOffset();
                //这种情况应该是不会出现的 以下这种状况 因为 scroll是在滚动条被滚动的时候才会触发，一旦滚动就不会出现当前的位置
                if (currentY == lastY && currentX == lastX && currentY != 0) {
                    return;
                }
                //todo 不会出现纵轴、横轴一起滚动的情况
                //纵轴没有滑动，横轴滑动的时候
                if (currentY == lastY && currentX != lastX) {
                    //左右移动
                    if (_self.$el.css('position') != 'absolute') {
                        //todo 这里判断是否延迟的目地
                        if (_self.isDelayFixed) {//是否延迟在顶部开始浮动
                            _offsetTop = _self.$el.offset().top;
                        } else {
                            _offsetTop = getPageYOffset() + _self.pos.y;
                        }
                        _self.$el.css({
                            'position': 'absolute',
                            'top': _offsetTop + 'px',
                            'left': _self.pos.x + 'px'
                        });
                    }
                }
                //横轴没改变的时候,纵轴改变的时候
                //所有的都是纵轴改变得时候添加 css position absolute
                else if (currentY != lastY && currentX == lastX) {
                    //是否延迟浮动
                    if (_self.isDelayFixed) {
                        //纵向滚动条的位置 滚动的小于 当前元素的偏移位置
                        if (_self.pos.y > currentY) {
                            //将偏移位置赋值给top、left
                            _self.$el.css({
                                'position': 'absolute',
                                'top': _self.pos.y + 'px',
                                'left': _self.pos.x + 'px'
                            });
                            //保留本次的滚动条位置
                            lastY = currentY;
                            lastX = currentX;
                            //position为absolute的时候 直接返回return
                            return;
                        } else {
                            //纵向滚动条的位置 滚动的 大于 等于当前元素的偏移位置
                            _offsetTop = 0;
                        }
                    } else {
                        //否则不延迟浮动的时候 将当前元素的偏移y轴坐标
                        _offsetTop = _self.pos.y;
                    }
                    //上下移动
                    if (_self.$el.css('position') != 'fixed') {
                        _self.$el.css({
                            'position': 'fixed',
                            'top': _offsetTop + 'px',
                            'left': _self.pos.x - getPageXOffset() + 'px'
                        });
                    }
                }
                //将滚动过的位置保留
                lastY = currentY;
                lastX = currentX;
            });
            $(window).resize(function () {
                //目前解决方案是，根据一个不是absolute的元素进行定位，之后再resize事件发生的时候，去重新定位他的基础位置（$el pos）
                var pos = _self.$prEl.offset();//$prEl 是父级元素
                if (_self.isDelayFixed) {//延迟浮动
                    _self.$el.css({
                        'position': 'absolute',
                        'left': pos.left + _self.toPrElPos.left + 'px',
                        'top': getPageYOffset() > _self.pos.y ? getPageYOffset() : _self.pos.y + 'px'
                    });
                } else {
                    _self.$el.css({
                        'position': 'absolute',
                        'left': pos.left + _self.toPrElPos.left + 'px'
                    });
                }
                _self.pos.x = pos.left + _self.toPrElPos.left;
                _self.pos.y = pos.top + _self.toPrElPos.top;
            });
        }
    };

    function getPageXOffset() {
        //当前页面相对于窗口左上角的x位置(即判断出现横向滚动条)
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
    }

    function getPageYOffset() {
        //当前页面相对于窗口左上角的y位置(即判断出现纵向滚动条)
        return window.pageYOffset || (document.documentElement || document.body).scrollTop;
    }

    module.exports = {
        /**
         * 初始化 定位
         * @param selector 选择器
         * @param prSelector 相对定位选择器
         * @param top 相对定位选择器的高
         * @param left 相对定位选择器的左边距
         * @param isDelayFixed {boolean} 是否延迟浮动（是否是延迟在顶部开始浮动）
         */
        init: function (selector, prSelector, top, left, isDelayFixed) {
            new FixDisplay(selector, prSelector, top, left, !!isDelayFixed);
        }
    };