/**
 * fudapeng
 */
var ajax = require('util/ajax');
var util = require('util/util');
var Constant = require('config');
var store = require('store');
var eUrl = require('url/exam-url');
var bdUrl = require('url/base-data-url');

//less
require('../../less/create-exam-pop.less');
//tpl
var createExamTpl = require('common/create-exam-pop.tpl');
var checkItemTpl = require('common/check-item');

var EXAM_LEVEL = {
        UNIT: 2,//单元测试
        SCHOOL: 1,//校级考试
        REGION: 0,//区级考试
        CO_EXAM: 3 //校级联考
    };
    var _isCopyExam = null,_copyCourses = [],_copyExamId = null,_isNormal = 1;

    var isInit = false, _callback, _scope, $pop, _schoolStageId, _examLevel;

    var pop = {
        show: function (examLevel, courseId, examPaperName) {
            this.init();//初始化
            this.reset();

            if(courseId != 'undefined'){
                this.initCourse(courseId);
            }

            if(examPaperName){
                $pop.find('.examName').val(examPaperName);
            }

            this.initDefaultData(examLevel);

        },
        /*
         * 校级联考专用
        */
        coSchoolsShow:function(examLevel, schoolIds){
            this.init();//初始化
            this.reset();

            this.initCourse();

            this.initDefaultData(examLevel, schoolIds);
        },
        init: function () {
            if (isInit) {
                return;
            }
            isInit = true;//只初始化一次
            $('body').append(createExamTpl());//在body尾部添加html标签
            $pop = $("#create-exam-pop");//id自己写在当前页面
            if (!$('.pop-mask')[0]) {
                $('body').append('<div class="pop-mask"></div>');
            }
        },
        reset: function () {
            //清空操作
            $pop.find('.examName').val('');
            $pop.find('select[name="asFlag"],select[name="grade"]').unbind();
            $pop.find('.course-row input').unbind();
            $pop.find('.close-box,.ms-pop-control a:eq(1)').unbind();
            $pop.find('.ms-pop-control a:eq(0)').unbind();
        },
        bindEvent: function (examLevel, schoolIds) {
            var _self = this;
            if(examLevel == EXAM_LEVEL.UNIT){
                $pop.find('select[name="asFlag"],select[name="grade"]').change(function(){
                    _self.eclassDataChange($pop.find('select[name="asFlag"]').val(),$pop.find('select[name="grade"]').val());
                });

                $pop.find('.course-row input').change(function(){
                    var el = this;
                    if($(this).is(':checked')){
                        util.forEach($pop.find('.course-row input'),function(inputDom){
                            if(inputDom != el){
                                inputDom.checked = false;
                            }
                        });
                    }
                });
            }

            $pop.find('.close-box,.ms-pop-control a:eq(1)').click(function(){
                $pop.hide();
                $(".pop-mask").hide();

                if (_isCopyExam) {
                    _isCopyExam = null;
                    $pop.find('.course-row').show();
                };

            });
            $pop.find('.ms-pop-control a:eq(0)').click(function(){
                //保存
                if (_isCopyExam) {
                    _self.saveCopyExam(schoolIds);
                }else{
                   _self.save(schoolIds);
                };

            });
        },
        initDefaultData: function (examLevel, schoolIds) {
            var self = this;

            if (_isCopyExam && _examLevel != EXAM_LEVEL.UNIT) {
                $pop.find('.course-row').hide();
            }
            //todo  这个是诊断负责人的相关内容，现在先不用
            ajax({
                url: bdUrl['/teacher/queryTeacherByCurUserSchool']
            }).then(function (data) {
                var currentUser = store.get(Constant.STORAGE_KEY.USER_INFO);
                var html = '';
                util.forEach(data.results, function (item) {
                    if (item.id == currentUser.id) {
                        html += ['<option selected value="', item.id, '">', item.name, '</option>'].join('');
                    } else {
                        html += ['<option value="', item.id, '">', item.name, '</option>'].join('');
                    }
                });
                $pop.find('select[name="examTeacher"]').html(html);
                self.initGradeData();
                if (examLevel === EXAM_LEVEL.UNIT) {
                    //单元测试，需要获取班级数据
                    $pop.find('.eclass-row').show();
                    return ajax({
                        url:bdUrl['/eclass/queryExamEclass'],
                        data:{
                            gradeId:$pop.find('select[name="grade"]').val(),
                            flag:$pop.find('select[name="asFlag"]').val()
                        }
                    });
                }else{
                    $pop.find('.eclass-row').hide();
                }
                self.bindEvent(examLevel, schoolIds);
                $pop.show();
                $('.pop-mask').show();
            }).then(function(data){
                if(!data){
                    return;
                }
                self.initEclassData(data);
                self.bindEvent(examLevel, schoolIds);
                $pop.show();
                $('.pop-mask').show();
            }).fail(function(e){
                console.error(e.stack);
            });
        },
        initEclassData: function(data){
            if(data.results.length == 0){
                $pop.find('.eclass-row dd:eq(0)').show();
                $pop.find('.eclass-row dd:eq(1)').hide();
            }else{
                $pop.find('.eclass-row dd:eq(0)').hide();
                $pop.find('.eclass-row dd:eq(1)').show().html(checkItemTpl({
                    isDisable:false,
                    list:data.results,
                    name:'eclass'
                }));
            }
        },
        initGradeData: function () {
            var html = '';
            if (_schoolStageId && _schoolStageId == 1) {
                //初中
                util.forEach(Constant.GRADES, function (item) {
                    if (item.id > 3) {
                        return true;
                    } else {
                        html += ['<option value="', item.id, '">', item.name, '</option>'].join('');
                    }
                });
            } else if (_schoolStageId && _schoolStageId == 2) {
                //高中
                util.forEach(Constant.GRADES, function (item) {
                    if (item.id > 3 && item.id <=6 ) {
                        html += ['<option value="', item.id, '">', item.name, '</option>'].join('');
                    }
                });
            } else if(_schoolStageId && _schoolStageId == 3){
                //小学
                util.forEach(Constant.GRADES, function (item) {
                    if (item.id > 6 ) {
                        html += ['<option value="', item.id, '">', item.name, '</option>'].join('');
                    }
                });
            } else {
                util.forEach(Constant.GRADES, function (item) {
                    html += ['<option value="', item.id, '">', item.name, '</option>'].join('');
                });
            }
            $pop.find('select[name="grade"]').html(html);
        },
        initCourse: function(courseId){
            var list = Constant.COURSES;

            if (_isCopyExam && _examLevel == EXAM_LEVEL.UNIT) {
                list = _copyCourses;
            };

            var data = {
                selectedId:courseId,
                isDisable:!!courseId,//将课程id转换成boolean类型值
                list:list,
                name:'course'
            };
            $pop.find('.course-row').find('.checkboxs').html(checkItemTpl(data));
        },
        eclassDataChange: function(flag,grade){
            var self = this;
            ajax({
                url:bdUrl['/eclass/queryExamEclass'],
                data:{
                    gradeId:grade,
                    flag:flag
                }
            }).then(function(data){
                self.initEclassData(data);
            });
        },
        save: function(schoolIds){
            var postData = {
                asFlag:$pop.find('select[name="asFlag"]').val(),
                courseIds:this.getCheckedData('course'),
                eclassIds:this.getCheckedData('eclass'),
                examLevel:_examLevel,
                isNormal:_isNormal,
                'grade.id':$pop.find('select[name="grade"]').val(),
                name:$pop.find('.examName').val(),
                'teacher.id':$pop.find('select[name="examTeacher"]').val()
            };
            if(schoolIds){
                postData.schoolIds = schoolIds;
            }

            if(!this.validate(postData)){
                return;
            }
            //TODO 临时删除，诊断负责人
            delete postData['teacher.id'];
            ajax({
                url:eUrl['/exam/add'],
                data:postData,
                type:'post',
                isNotCommonError:true
            }).then(function(data){
                $pop.hide();
                $('.pop-mask').hide();
                _callback.apply(_scope,['success',postData.name,data.results.examId,data.results.examPapers[0]]);


            },function(){
                $pop.hide();
                $('.pop-mask').hide();
                _callback.apply(_scope,['error']);

            });
        },
        saveCopyExam: function(schoolIds){
            var me = this ;
            var courseIds = null;
            if (_examLevel == EXAM_LEVEL.UNIT) {
                courseIds = this.getCheckedData('course');
            }else{
                var list = [];
                util.forEach(_copyCourses,function(el){
                    list.push(el.id);
                });
                courseIds = list.join(',');
            }
            var postData = {
                asFlag:$pop.find('select[name="asFlag"]').val(),
                courseIds:courseIds,
                eclassIds:this.getCheckedData('eclass'),
                examLevel:_examLevel,
                isNormal:_isNormal,
                'grade.id':$pop.find('select[name="grade"]').val(),
                name:$pop.find('.examName').val(),
                'teacher.id':$pop.find('select[name="examTeacher"]').val(),
                examId:_copyExamId
            };
            if(schoolIds){
                postData.schoolIds = schoolIds;
            }
            if(!this.validate(postData)){
                return;
            }
            ajax({
                url:eUrl['/exam/copyExam'],
                data:postData,
                type:'post',
                isNotCommonError:true
            }).then(function(data){
                $pop.hide();
                $('.pop-mask').hide();
                _isCopyExam = null;
                $pop.find('.course-row').show();
                if(postData.examLevel == EXAM_LEVEL.UNIT){
                    _callback.apply(_scope,['success',postData.name]);
                }else{
                    _callback.apply(_scope,['success',postData.name]);
                }

            },function(){
                $pop.hide();
                $('.pop-mask').hide();
                _isCopyExam = null;
                $pop.find('.course-row').show();
                _callback.apply(_scope,['error']);

            });
        },
        validate: function(postData){
            if(postData.examLevel == EXAM_LEVEL.UNIT){
                if(postData['eclassIds'].length == 0){
                    if($pop.find('.eclass-row').find('.error-red').css('display') === 'none'){
                        $pop.find('.eclass-empty-error').show();
                    }
                    return false;
                }else{
                    $pop.find('.eclass-empty-error').hide();
                }
            }
            if(postData.name.length == 0) {
                $pop.find(".title-error-msg").text('*必填').show();
                return false;
            }else if(postData.name.length > 30){
                $pop.find(".title-error-msg").text('*不超过30个字').show();
                return false;
            }else{
                $pop.find(".title-error-msg").hide();
            }

            if(postData.courseIds.length == 0){
                $pop.find('.course-empty-error').show();
                return false;
            }else{
                $pop.find('.course-empty-error').hide();
            }

            return true;
        },
        getCheckedData:function(name){
            var checkedData = [];
            util.forEach($pop.find('input[name="'+name+'"]'),function(item){
                if(item.checked){
                    checkedData.push(item.value);
                }
            });
            return checkedData.join(',');
        }
    };

    module.exports = {
        /**
         * 显示创建考试pop
         * 调用方式：xx.show(examLevel,callback)
         * 或者xx.show(examLevel,callback,scope)
         * 或者xx.show(examLevel,callback,scope,courseId,schoolStageId)
         * 或者xx.show(examLevel,callback,courseId,schoolStageId)
         * @param examLevel 上述EXAM_LEVEL的值 必填
         * @param callback 回调函数 必填
         * @param scope 回调函数的作用域 非必填
         * @param courseId 课程id 非必填  当传递courseId schoolStageId也的必填
         * @param schoolStageId 学段id 非必填
         */
        show: function (examLevel, callback, scope, courseId, schoolStageId) {
            _callback = callback;
            _examLevel = examLevel;
            if (!_callback instanceof Function) {
                throw new Error('need function args');
            }

            if (typeof scope === 'object' || typeof scope === 'undefined') {
                _scope = scope || null;
            } else if ((typeof scope === 'string' || typeof  scope === 'number') && typeof schoolStageId === 'undefined') {
                _schoolStageId = courseId;
                courseId = scope;
                _scope = null;
                if (!_schoolStageId) {
                    throw new Error('need schoolStageId');
                }
            }


            pop.show(examLevel, courseId);
        },
        /**
         * 校级联考显示创建考试pop---专用
         * 调用方式：xx.show(examLevel,callback, schoolIds)
         * @param examLevel 上述EXAM_LEVEL的值 必填
         * @param callback 回调函数 必填
         * @param scope 回调函数的作用域 非必填
         * @param schoolIds 学校id 非必填
         */
        coSchoolsShow:function(examLevel, callback, scope, schoolIds){
            _callback = callback;
             _examLevel = examLevel;
            if(typeof scope === 'object' || typeof scope === 'undefined'){
                _scope = scope || null;
            }else if(typeof scope === 'string'){
                schoolIds = scope;
            }
            pop.coSchoolsShow(examLevel, schoolIds);
        },
        /**
         *
         * @param examLevel
         * @param schoolStageId
         * @param courseId
         * @param examPaperName
         * @param cb
         */
        showWithPaperName:function(examLevel,schoolStageId,courseId,examPaperName,cb,scope){
            _callback = cb;
            _schoolStageId = schoolStageId;
            _examLevel = examLevel;
            _scope = scope || null;
            pop.show(examLevel, courseId, examPaperName);
        },
        /**
         * [showImportScore 导入成绩]
         * @param examLevel 上述EXAM_LEVEL的值 必填
         * @param callback 回调函数 必填
         * @param scope 回调函数的作用域 必填
         * @param isNormal 0导入数据 1创建考试 必填
         */
        showImportScore:function(examLevel, callback, scope,isNormal){
            _examLevel = examLevel;
            _callback = callback;
            _scope = scope || null;
            _isNormal = isNormal;
            pop.show(examLevel);
        },
        /**
         * [setCopyExam description]
         * @param bool          [判断是否是复制考试]
         * @param copyCourses [复制考试的学科]
         * @param copyExamId    [复制考试的Id]
         */
        setCopyExam:function(bool,copyCourses,copyExamId){
            _isCopyExam = bool;
            _copyCourses = copyCourses;
            _copyExamId = copyExamId;
        },
        EXAM_LEVEL: EXAM_LEVEL
    };