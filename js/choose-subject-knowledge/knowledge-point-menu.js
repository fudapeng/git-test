/**
 * fudapeng
 * @type {[type]}
 */
var ajax = require('util/ajax');
var util = require('util/util');
var Constant = require('config');
var bdUrl = require('url/base-data-url');
var store = require('store');
//tpl
var popTpl = require('choose-subject-knowledge/knowledge-point-change-pop');
var leftMenuTpl = require('choose-subject-knowledge/knowledge-point-menu.tpl');

require('../../less/knowledge-point');
//改组件依赖css/knowledge-point.css
    var _data, _callback, _scope, _elId, _url, $el,
        openClz = 'open',
        activeClz = 'active',
        userInfo, params;

    var leftMenu = {
        init: function () {
            $el = $("#" + _elId);
            userInfo = store.get(Constant.STORAGE_KEY.USER_INFO);
            if (!userInfo) {
                throw new Error('请在user-info.js文件执行的回调函数后调用该函数');
            }

            params = {
                courseId: util.getParams('courseId') || userInfo.defaultCourseId || 2,
                schoolStageId:util.getParams('schoolStageId')  || userInfo.defaultSchoolStageId || 2,
                ids: ''
            };

            if(params.courseId != userInfo.defaultCourseId || params.schoolStageId != userInfo.defaultSchoolStageId){
                //更换默认学段学科
                this.updateUserInfo(params.courseId,params.schoolStageId);
            }

            this.initViewHtml();
            this.initBtn();
            this.getData(params);
        },
        getData: function (params) {
            //TODO 缓存数据
            var _self = this;
            ajax({
                url: _url,
                data: {
                    courseId: params.courseId,
                    schoolStageId: params.schoolStageId
                }
            }).then(function (data) {
                _data = data.results;
                runCallback();
                _self.render(_data);
            }).fail(function(e){
                console.error(e.stack);
            });
        },
        render: function (data) {
            $el.html(leftMenuTpl(data));
            $el.find('.c-title h3').text([Constant.SCHOOL_STAGE_MAP[params.schoolStageId], '-', Constant.COURSES_ALL_MAP[params.courseId]].join(''));
        },
        initBtn: function () {
            var _self = this, $pop = $("#pop-knowledge-change");
            //展开收起事件
            $el.delegate('i', 'click', function () {
                var $ul = $(this).closest('ul');
                var level = $(this).next().attr('data-level');
                if ($(this).hasClass(openClz)) {
                    $(this).removeClass(openClz);
                    if (level == 2) {
                        $ul.find('.three').slideUp();
                    } else if (level == 1) {
                        $ul.find('.sec').slideUp();
                    }
                } else {
                    $(this).addClass(openClz);
                    if (level == 2) {
                        $ul.find('.three').slideDown();
                    } else if (level == 1) {
                        $ul.find('.sec').slideDown();
                    }
                }
            });
            //点击知识点事件
            $el.delegate('.single-point a,.all-title a', 'click', function () {
                if ($(this).hasClass(activeClz)) {
                    return;
                }
                $el.find('.' + activeClz).removeClass(activeClz);
                $(this).addClass(activeClz);
                var id = $(this).attr('data-id');
                var level = $(this).attr('data-level');
                var parentId = $(this).attr('data-parent-id');//只有2级菜单才有parentId
                if (id === '') {
                    params.ids = id;
                } else {
                    params.ids = _self.getIds(id, level, parentId);
                }
                runCallback();
            });

            //点击更改课程事件
            $el.delegate('.green-change-btn', 'click', function () {
                var courseId = params.courseId,
                    schoolStageId = params.schoolStageId;
                $pop.find('.selected').removeClass('selected');
                if (schoolStageId == 1) {
                    //初中
                    $pop.find('dl:eq(1)').find('span[data-id="' + courseId + '"]').addClass('selected');
                } else if (schoolStageId == 2) {
                    $pop.find('dl:eq(0)').find('span[data-id="' + courseId + '"]').addClass('selected');
                } else if (schoolStageId == 3) {
                    $pop.find('dl:eq(2)').find('span[data-id="' + courseId + '"]').addClass('selected');
                }
                $pop.show();
                $('.pop-mask').show();
            });

            $pop.find('.close-box,.green-btn:eq(1)').click(function () {
                $("#pop-knowledge-change").hide();
                $('.pop-mask').hide();
            });

            $pop.find('dl span').click(function () {
                $pop.find('.selected').removeClass('selected');
                $(this).addClass('selected');
            });

            $pop.find('.green-btn:eq(0)').click(function () {
                var $selected = $pop.find('.selected');
                var $dl = $selected.closest('dl');
                var _courseId = $selected.attr('data-id');
                var _schoolStageId = $dl.find('dt').attr('data-id');
                if(params.courseId == _courseId && params.schoolStageId == _schoolStageId){
                    return;
                }
                params.courseId = $selected.attr('data-id');
                params.schoolStageId = $dl.find('dt').attr('data-id');
                params.ids = '';
                _self.updateUserInfo(params.courseId, params.schoolStageId);
                _self.getData(params);
                $("#pop-knowledge-change").hide();
                $('.pop-mask').hide();
            });


        },
        /**
         * 更新userInfo中默认的学科与学段
         * @param courseId
         * @param schoolStageId
         */
        updateUserInfo: function (courseId, schoolStageId) {
            //更改userInfo离线存储数据
            userInfo.defaultSchoolStageId = schoolStageId;
            userInfo.defaultCourseId = courseId;
            store.set(Constant.STORAGE_KEY.USER_INFO,userInfo);
            ajax({
                url: bdUrl['/user/updateDefaultSchoolStageAndCourse'],
                data: {
                    schoolStageId:schoolStageId,
                    courseId:courseId
                }
            }).then(function(data){
            });
        },
        initViewHtml: function () {
            var $body = $('body');
            if (!$(".pop-mask")[0]) {
                $body.append('<div class="pop-mask"></div>');
            }
            $body.append(popTpl());
        },
        /**
         * 获取左侧知识点或者教材同步知识点
         * @param id
         * @param level
         * @param parentId
         */
        getIds: function (id, level, parentId) {
            if (level == 3) {
                return id;
            } else if (level == 2) {
                return this.getIdsByLevel(id, parentId, level);
            } else if (level == 1) {
                return this.getIdsByLevel(id, level);
            }
        },
        getIdsByLevel: function (id, parentId, level) {
            var ids = [];
            if (!level) {
                level = parentId;
                parentId = '';
            }

            util.forEach(_data, function (first) {

                if (level == 1 && first.id == id) {

                    util.forEach(first.children, function (sec) {
                        util.forEach(sec.children, function (three) {
                            ids.push(three.id);
                        });
                    });
                    return true;

                } else if (level == 2) {
                    if (first.id == parentId) {
                        util.forEach(first.children, function (sec) {
                            if (sec.id == id) {
                                util.forEach(sec.children, function (three) {
                                    ids.push(three.id);
                                });
                                return true;
                            }
                        });
                        return true;
                    }
                }
            });
            return ids.join(',');
        }
    };

function runCallback() {
    var args = [params.schoolStageId, params.courseId, params.ids];
    if (_scope) {
        _callback.apply(_scope, args);
    } else {
        _callback.apply(null, args);
    }
}
module.exports = {
	/**
     * 初始化左侧菜单方法
     * @param elId
     * @param url
     * @param cb
     * @param scope
     */
    init: function (elId, url, cb, scope) {
        _elId = elId;
        _url = url;
        _callback = cb;
        _scope = scope;
        leftMenu.init();
    }
}