/**
 * Created by YU on 2016/2/17.
 */
var menuData = require('./head-menu-config');
var headerTpl = require('./tpl/head');
// var $ = require('jquery');
require('./less/head');
var _homeworkCode = 'am_manage'; //作业权限
var schoolQuestMangeCode = 'sr_school_subjectrepo_manage';//校级题库管理权限CODE
var dirQuestManageCode = 'sr_district_subjectrepo_manage';//区级题库管理权限CODE

var config = require('config.json');
var drNavGreenArrowPng = require('./images/dr-nav-green-arrow.png');
var drNavBlackArrowPng = require('./images/dr-nav-black-arrow.png');
var drNavWhiteArrowPng = require('./images/dr-nav-white-arrow.png');
var ajax = require('util/ajax');
var acountUrl = require('url/acount-url');
var cookieUtil = require('util/cookie-util');
var store = require('store');

var Constant = {
    DIRECTOR:0,
    TEACHER:1
};

var header = {
    userInfo:null,
    menuInfo:null,
    menuId:null,
    init: function(data,menuId){
        this.userInfo = data;
        this.menuId = menuId + '';
        switch (this.userInfo.role - 0){
            case Constant.DIRECTOR:
                this.menuInfo = menuData[0];
                //南京start
                this.permissionsControl(Constant.DIRECTOR, data);
                //南京end
                break;

            case Constant.TEACHER:
                this.menuInfo = menuData[1];
                //南京start
                this.permissionsControl(Constant.TEACHER, data);
                //南京end
                break;
        }
        this.renderMenu();
        this.initShow();
        this.initHover();
        this.initSelected();
        this.initEvent();
    },
    /**
     * 南京-- 权限控制（目前有局长和教师角色下的【作业管理】的控制）
     */
    permissionsControl:function(role, data){
        var homeworkFlag = false,schoolQuestManageFlag = false, dirQuestManageFlag = false, permissions = data.permissions;
        for(var i = 0; i < permissions.length; i++){
            if(permissions[i] === _homeworkCode){
                homeworkFlag = true;//作业管理权限标识
                break;
            }
            if(permissions[i] === schoolQuestMangeCode){
                schoolQuestManageFlag = true;
            }
            if(permissions[i] === dirQuestManageCode){
                dirQuestManageFlag = true;
            }
        }
        if(!homeworkFlag){
            switch (role){
                case Constant.DIRECTOR:{
                    //局长在[2,2]
                    this.menuInfo[2].children.splice(2, 1);
                    if(!dirQuestManageFlag){
                        this.menuInfo[2].children.splice(4, 1);
                    }
                    break;
                }
                case Constant.TEACHER:{
                    //教师在[2]
                    this.menuInfo.splice(2, 1);
                    if(!schoolQuestManageFlag){
                        this.menuInfo.splice(4, 1);
                    }
                    break;
                }
            }
        }else if(homeworkFlag){
            switch (role){
                case Constant.DIRECTOR:{
                    //局长在[2,2]
                    if(!dirQuestManageFlag){
                        this.menuInfo[2].children.splice(5, 1);
                    }
                    break;
                }
                case Constant.TEACHER:{
                    //教师在[2]
                    if(!schoolQuestManageFlag){
                        this.menuInfo.splice(5, 1);
                    }
                    break;
                }
            }
        }
    },
    renderMenu: function(){
        $('#header').html(headerTpl({
            menu: this.menuInfo,
            user: this.userInfo
        }));
    },
    initShow: function(){
        var param = this.menuId, first;
        if(param == ''){
            param = this.menuInfo[0].id;
        }
        first = param[0];
        //一级导航的黑色三角
        for(var i = 0,el;el = $('#header').find('li')[i++];){
            if($(el).has(".sec-menu").length){
                var imgSrcInit = el.getAttribute('data-id') == first ? "<img src='"+drNavGreenArrowPng+"'/>" : "<img src='"+drNavBlackArrowPng+"'/>";
                var inner1 = $(el).find(">span").html() + imgSrcInit;
                $(el).find(">span").html(inner1);
                //二级导航的黑色三角
                for(var j=0,e;e = $(el).find(".sec-menu-data")[j++];){
                    if($(e).has(".third-menu").length){
                        var inner2 = $(e).find("> span").html() + "<img src='"+drNavBlackArrowPng+"'/>";
                        $(e).find("> span").html(inner2);
                    }
                }
            }
        }
    },
    initHover: function(){
        var oldFirstNavImgSrc = "";
        //一级导航的hover
        $("#dr-nav-list li").hover(function(){
            oldFirstNavImgSrc = $(this).find(">span img").attr("src");
            $(this).find(">span img").attr("src",drNavGreenArrowPng);

            //二级导航显示
            $(this).find(".sec-menu").removeClass("none");
        },function(){
            $(this).find(">span img").attr("src",oldFirstNavImgSrc);
            //二级导航隐藏
            $(this).find(".sec-menu").addClass("none");
        });
        //二级导航的hover
        $(".sec-menu-data").hover(function(){
            $(this).find(">span").css("color","#fff");
            $(this).find(">span img").attr("src",drNavWhiteArrowPng);
            $(this).find(".third-menu").removeClass("none");
        },function(){
            $(this).find(">span").css("color","#515151");
            $(this).find(">span img").attr("src",drNavBlackArrowPng);
            $(this).find(".third-menu").addClass("none");
        });
        //退出框显示
        $("#dr-user-info").hover(function(){
            $(this).find(".dr-box").removeClass("none");
        },function(){
            $(this).find(".dr-box").addClass("none");
        });
    },
    initSelected: function(){
        var param = this.menuId, first;//first是全局变量 校长角色下MENU_ID_MANUAL_PAPER 32
        if(param == ''){
            param = this.menuInfo[0].id;//32
        }
        first = param[0];
        for (var i = 0, el; el = $('#header').find('li')[i++];) {
            if (el.getAttribute('data-id') == first) {
                $(el).addClass('active');
            }
        }
    },
    initEvent: function(){
        $("#header").find('li').click(function () {
            //一级导航点击事件
            var url;
            if(this.getAttribute('data-url')){
                url = this.getAttribute('data-url');
            }else{
                url = $(this).find('.sec-menu .sec-menu-data:eq(0)').attr('data-url');
                if(!url){
                    url = $(this).find('.third-menu span:eq(0)').attr('data-url');
                }
            }
            location.href = url;
        });
        $("#header").find('.sec-menu-data').click(function (e) {
            e.stopPropagation();
            //二级导航点击事件
            var url;
            if(this.getAttribute('data-url')){
                url = this.getAttribute('data-url');
            }else{
                url = $(this).find('.third-menu span:eq(0)').attr('data-url');
            }

            location.href = url;
        });
        $("#header").find('.third-menu span').click(function(e){
            e.stopPropagation();
            var url =$(this).attr("data-url");

            //三级导航点击事件
            location.href = $(this).attr("data-url");
        });
        //退出事件
        $(".leave").click(function(){
            store.clear();
            ajax({
                url:acountUrl['/passport/logout']
            }).then(function(){

            },function(){});
            cookieUtil.delCookie('token');
            location.href='/diagnosis/public/html/login/index.html';
        });
    }
};


module.exports = {
    init:function(data,menuId){
        header.init(data,menuId);
    }
};