/**
 * fudapeng
 */
var Constant = require('config');
var util = require('util/util');
var cart = require('util/cart')
var store = require('store');
var fixedDisplay = require('util/fixed-display');
var questionList = require('util/question-list');
var questTypes = require('util/recognize-type-order');
var header = require('header/head-menu');
var userFn = require('user-info/index');
var bdUrl = require('url/base-data-url');
var qsUrl = require('url/questions-store-url');
var knowledgeMenu = require('choose-subject-knowledge/knowledge-point-menu');

//tpl
var dbtTpl = require('choose-subject-knowledge/database-type');
var qtlTpl = require('choose-subject-knowledge/quest-type-list');

	fixedDisplay.init('#left-point','#main-view',51,0,true);

    $('#main-view').find('.choose-quest-type-btn').removeClass('hidden');

    var isInit = false;

    //公共题库列表地址
    var publicListUrl = qsUrl['publicList'];
    //私有题库列表地址
    var privateListUrl = qsUrl['privateList'];
    //区级题库列表地址
    var districtListUrl = qsUrl['/subjectrepo/district/public/list'];
    //校级题库列表地址
    var schoolListUrl = qsUrl['/subjectrepo/school/public/list'];
    var url = publicListUrl;
    var _databaseType = Constant.DATABASE_TYPE.PUBLIC; //题库类型 Constant.DATABASE_TYPE  默认是公共库
    var _params = {
        courseId: '',
        schoolStageId: '',
        complexityUpperBound: '',
        complexityLowerBound: '',
        knowledgePointIds: '',
        orderBy: '',
        recognizeType: '',
        content:'',
        isEnable:true
    };


    var main = {
        init: function () {
            knowledgeMenu.init('left-point', bdUrl['/knowledgePoint/query'], function (schoolStageId, courseId, ids) {
                _params.knowledgePointIds = ids;//知识点id
                if(_params.courseId != courseId || _params.schoolStageId != schoolStageId){

                    if(_params.courseId != '' && _params.schoolStageId != ''){
                        cart.clearCart();//清空购物车
                    }

                    _params.courseId = courseId;
                    _params.schoolStageId = schoolStageId;
                    _params.recognizeType = '';
                    this.renderQuestTypes();
                    cart.init("cart", schoolStageId, courseId, function(){
                        //点击"清空"后，刷新列表
                        changeCondition();
                    });

                    if(!isInit){
                        fixedDisplay.init('#cart','#main-view',51,1070,true);
                        isInit = true;
                    }
                }

                changeCondition();

            }, this);

            this.showDbType();
            this.initBtn();
        },
        showDbType:function(){
            var userInfo = store.get(Constant.STORAGE_KEY.USER_INFO),
                $dbType = $('#database-type');
            //是否显示校级、区级题库
            if(Constant.IS_SHOW_SCHOOL_DISTRICT){
                if(userInfo.role === Constant.DIRECTOR){
                    //区级账号仅显示【区级题库】
                    $dbType.html(dbtTpl({isShowSchoolDistrict:true, isDirector: true}));
                }else if(userInfo.role === Constant.TEACHER){
                   //校级账号显示【区级题库】和【校级题库】
                   $dbType.html(dbtTpl({isShowSchoolDistrict:true, isTeacher: true}));
                }
            }else{
                $dbType.html(({isShowSchoolDistrict:false}));
            }
        },
        initBtn: function () {
            var _self = this;
            $(".quest-type-condition").delegate('li a', 'click', function () {
                if (_self.changeActiveBtn(this, '.quest-type-condition')) {
                    _params.recognizeType = $(this).attr('data-recognize-type-id');
                    changeCondition();
                }
            });
            $(".diff-condition a").click(function () {
                if (_self.changeActiveBtn(this, '.diff-condition')) {
                    _params.complexityLowerBound = $(this).attr('data-complexity-down');
                    _params.complexityUpperBound = $(this).attr('data-complexity-up');
                    changeCondition();
                }
            });
            $('.db-type').delegate('a', 'click', function(){
                if (_self.changeActiveBtn(this, '.db-type')) {
                    var dbType = Constant.DATABASE_TYPE;

                    switch($(this).attr('data-db-type')){
                        case dbType.PUBLIC:{
                            //公共库
                            url = publicListUrl;
                            _databaseType = dbType.PUBLIC;
                            break;
                        }
                        case dbType.PRIVATE:{
                            //个人题库
                            url = privateListUrl;
                            //不显示属性不完整的题目
                            _params.isIncompleted = 0;
                            _databaseType = dbType.PRIVATE;
                            break;
                        }
                        case dbType.DISTRICT:{
                            //区级题库
                            url = districtListUrl;
                            _databaseType = dbType.DISTRICT;
                            break;
                        }
                        case dbType.SCHOOL:{
                            //校级题库
                            url = schoolListUrl;
                            _databaseType = dbType.SCHOOL;
                            break;
                        }
                    }
                    changeCondition();
                }
            });
            $(".quest-sort-btn a").click(function () {
                if (_self.changeActiveBtn(this, '.quest-sort-btn')) {

                    var rowName = $(this).attr('data-order-by-row-name');
                    var esc=_self.defineEsc(this,'data-esc');
                    if (rowName != '') {
                        _params.orderBy = JSON.stringify([{
                            sortKey: rowName,
                            direction: esc
                        },{
                            sortKey:'ctime',
                            direction: -1
                        }]);
                    } else {
                        _params.orderBy = '';
                    }

                    changeCondition();
                }
            });

            $("#pop-knowledge-change-no-quest-type .green-btn").click(function(){
                $(".selection-condition").find('ul li a:eq(0)').click();
                $("#pop-knowledge-change-no-quest-type").hide();
                $(".pop-mask").hide();
            });
            $('.search-btn').click(function(){
                var val = $(".key-word-row input").val();
                _params.content = val;
                changeCondition();
            });
            $(".reset-btn").click(function(){
                $(".key-word-row input").val('');
                _params.content = '';
                changeCondition();
            });
        },
//        决定是升序还是降序
        defineEsc:function(_this,_class){
            var esc=$(_this).attr('data-esc');
            if(esc==1){
                esc=-1;
                $(_this).attr(_class,-1);
                $(_this).find('img').attr('src','../../bundle/img/downorderarrow.png');
            }else{
                esc=1;
                $(_this).attr(_class,1);
                $(_this).find('img').attr('src','../../bundle/img/uporderarrow.png');
            }
            return esc;
        },
        /**
         * 更改选中项
         * @param el
         * @param parentClz
         * @returns {boolean} false 不进行后续操作，true经行后续操作
         */
        changeActiveBtn: function (el, parentClz) {
//            if ($(el).hasClass('active')) {
//                return false;
//            }
            $(el).closest(parentClz).find('.active').removeClass('active');
            $(el).addClass('active');
            return true;
        },
        renderQuestTypes: function () {
            var data = questTypes(_params.schoolStageId, _params.courseId, false);
            $(".quest-type-condition").html(qtlTpl(data));
        }
    };

    function changeCondition() {
        questionList.showQuestionList('quest-content-list', url, _params, true, _databaseType);
    }

    userFn(function (data) {
        switch (data.role) {
            case Constant.DIRECTOR:
            {
                header.init(data, Constant.MENU_ID_DIR_CREATE_QUESTION);
                break;
            }
            case Constant.TEACHER:
            {
                header.init(data, Constant.MENU_ID_MANUAL_PAPER);
                break;
            }
        }
        main.init();
    });