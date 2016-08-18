/**
 * Created by YU on 2015/1/26.
 */
// (function (root, factory) {

//     if (typeof define === 'function' && define.amd) {
//         define(['jquery','domReady'], factory)
//     } else {
//         $(document).ready(function () {
//             factory($);
//         });
//     }

// })(this, function ($) {//jquery
    var $ = require('jquery');
    require('./less/scrollTop');

    var isShow = false, toTopElClz = 'go-top', viewerClz = 'abs-right-btns', time = 200;

    $(window).scroll(function(){//jquery 的滚动事件 适合任何可以滚动的元素和window(浏览器窗口)
        //在IE 8、7、6、5下面window.pageYOffset等同于document.documentElement.scrollTop 或者document.body.scrollTop
        var offsetHeight = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        //当有卷动，并且没有并没有显示的时候 pageYOffset//滚动条顶部到网页顶部的距离 x轴这里不涉及 没有横向滚动条
        if(offsetHeight > 0 && !isShow){//offsetHeight大于0 且isShow为false的时候
            $('.' + viewerClz).fadeIn(500);//显示框的淡入时间
            isShow = true;//标志位
        }else if(offsetHeight == 0){
            $('.' + viewerClz).fadeOut(500);//显示框淡出时间 应该大于滚动条回到(0,0)的时间
            isShow = false;
        }
    });

    var html = '<ul>' +
                    '<li class="abs-btns go-top"></li>' +
                '</ul>';



    var rightBtns = {
        init:function(){
            if(!$("." + viewerClz)[0]){
                $('body').append('<div class="'+viewerClz+'"></div>');
            }
            $("." + viewerClz).html(html);
            this.initEvent();
        },
        /**
         * 初始化点击事件
         */
        initEvent:function(){
            var self = this;
            //初始化去顶部事件
            $('.'+toTopElClz).click(function(){
                self.goTop();
            });
        },
        goTop:function(){
            var curTime = time;
            var offsetHeight = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
           //一个循环
            var ide = setInterval(function(){
                //time是死的，一个固定值，变动的是curTime,tween算法就是"一个curtime经过time(time相当于一个持续的时间段)变化 到达offsetHeigt的过程"
                window.scrollTo(0,Tween.Quad.easeIn(curTime,0,offsetHeight,time));//x，y坐标是在出现滚动条的时候影响滚动条的位置
                /*当curTime=100的时候，offsetHeight到达底部的时候，y值正好到达的位置是差了一个滚动条的长度*/
                //curTime = curTime+1;//curTime每次一个步长递增（递减）到time,easeIn是从0开始加速 ，1就是自己定义的步长，置底的过程
                curTime=curTime-5;//步长是-5，相当time是0，或者小于0，curTime是逐渐接近到0的过程，置顶的过程
               if(curTime<0){
                 clearInterval(ide);
                 window.scrollTo(0,0);
               }
            },20);
        }
    };
/*Tween.Quad.easeIn(curTime,0,offsetHeight,time)为了计算出y坐标的值*/
    /*Tween.Quad.easeIn(curTime,0,offsetHeight,time) curTime当前的时间，0为初始的y值位置，offsetHeight变化的距离，time持续的时间
    * 随着改变得出一个y的动态值*/
    //缓动公式
    var Tween = {
        /**
         *
         * @param t 当前执行时间  初始记步次数
         * @param b 初始值 begin开始位置
         * @param c 变化量 change 变化量
         * @param d 持续时间 duration持续次数 变化次数，次数越多速度越慢 (记时间越长速度越慢)
         * @returns {*}
         * @constructor
         */
        Linear: function(t, b, c, d) {
            return c * t / d + b;
        },
        /*每个效果都分三个缓动方式（方法），分别是：
         easeIn：从0开始加速的缓动；
         easeOut：减速到0的缓动；
         easeInOut：前半段从0开始加速，后半段减速到0的缓动。
         其中Linear是无缓动效果，没有以上效果。*/
        Quad: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function(t, b, c, d) {
                return - c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return - c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return - c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return - c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function(t, b, c, d) {
                return - c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function(t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function(t, b, c, d) {
                return - c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function(t, b, c, d) {
                return (t == 0) ? b: c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function(t, b, c, d) {
                return (t == d) ? b + c: c * ( - Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * ( - Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function(t, b, c, d) {
                return - c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function(t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return - c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function(t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function(t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function(t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return - .5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        },
        Back: {
            easeIn: function(t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function(t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function(t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn: function(t, b, c, d) {
                return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function(t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function(t, b, c, d) {
                if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    };

    rightBtns.init();

// });