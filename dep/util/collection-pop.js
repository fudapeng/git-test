/**
 * fudapeng
 */
var Constant = require('config');
var ajax = require('util/ajax');
var util = require('util/util');
var qsUrl = require('url/questions-store-url');

var collectionTpl = require('common/collection-pop');
var _$popBox,
        _collectCallback,
        _subjectId,
        _schoolStageId,
        _courseId,
        _databaseType;
    var collectionPop = {
        init:function(){
            var self = this;
            //重置加入收藏弹出框
            _$popBox.html(collectionTpl());
            //显示已有标签
            this.labelsList(function(){
                self.initBtn();
                _$popBox.show();
                $('.pop-mask').show();
            });
        },
        labelsList:function(callback){
            var self = this;
            ajax({
                url:qsUrl['/favoritesubject/getTags'],
                data:{
                    schoolStageId :_schoolStageId,
                    courseId:_courseId
                }
            }).then(function(data){
                if(data && data.results){
                    self.renderLabelsList(data.results);
                    callback();
                }
            });
        },
        renderLabelsList:function(labels){
            if(!labels.length){
                //没有收藏标签
                _$popBox.find('.had-label dd ul').html('<div style="color:#cacaca;line-height:30px;padding-left:10px;">还没有标签，不妨先新建一个标签。</div>');
                return;
            }
            var $labels = '';
            util.forEach(labels, function(label){
                $labels += '<li data-id=' + label.id + ' title=' + label.name + '><label><button>√</button><span>' + label.name + '</span></label></li>';
            });
            _$popBox.find('.had-label dd ul').html($labels);
        },
        initBtn:function(){
            var self = this;
            _$popBox.find('.pop-head .close-box, .btns .cancel-btn').click(function(){
                //关闭、取消
               self.closePopBox();
            });
            _$popBox.find('.btns .yes-btn:not(.not-click)').click(function(){
                var $self = $(this);
                $(this).addClass('not-click');
                //确定
                var tagIds = [];
                _$popBox.find('.selected-label dd li').each(function(){
                    tagIds.push($(this).attr('data-id'));
                });
                var sourcePlace;

                if(_databaseType === Constant.DATABASE_TYPE.DISTRICT){
                    //区级
                    sourcePlace = 3;
                }else if(_databaseType === Constant.DATABASE_TYPE.SCHOOL){
                    //校级
                    sourcePlace = 4;
                }else if(_databaseType === Constant.DATABASE_TYPE.PUBLIC){
                    //公共
                    sourcePlace = 1;
                }else if(_databaseType === Constant.DATABASE_TYPE.PRIVATE){
                    //个人
                    sourcePlace = 0;
                }

                var params = {
                    id: _subjectId,
                    sourcePlace :sourcePlace
                }
                if(tagIds.length){
                    params.tagIds  = tagIds.join(',');
                }

                ajax({
                    url:qsUrl['/favoritesubject/addFavoriteSubject'],
                    data:params
                }).then(function(data){
                    if(data && data.results){
                        self.closePopBox(true);
                        $self.removeClass('not-click');
                    }
                });

            });
            _$popBox.find('.selected-label dd').undelegate().delegate('ul li i', 'click', function(){
                //选定标签删除
                var dataId = $(this).closest('li').attr('data-id');
                _$popBox.find('.had-label dd li[data-id=' + dataId + ']').removeClass('active');
                $(this).closest('li').remove();
                return false;
            });
            _$popBox.find('.new-label dd button:not(.not-click)').click(function(){
                var $self = $(this);
                $(this).addClass('not-click');
                //新建标签按钮
                var $ipt = $(this).prev('input'), val = $ipt.val();
                if(!val){
                    $(this).closest('div').nextAll('.warning').show().prev('.prompt').hide();
                    return false;
                }
                $(this).closest('div').nextAll('.warning').hide().prev('.prompt').show();

                var tagArr = val.split(/[, | ，]/g);
                ajax({
                    url:qsUrl['/favoritesubject/addTag'],
                    data:{
                        schoolStageId :_schoolStageId ,
                        courseId:_courseId,
                        tags:tagArr.join(',')
                    },
                    type:'post'
                }).then(function(data){
                    if(data && data.results){
                        self.afterAddLabels(data.results);
                        $self.removeClass('not-click');
                        $ipt.val('');
                    }
                });
                return false;
            });
            _$popBox.find('.had-label dd').undelegate().delegate('li label', 'click', function(){
                //已有标签选中
                var $singleBox = $(this).closest('li');
                if($singleBox.is('.active')){
                    //已经选中，点击取消选中
                    var dataId = $singleBox.attr('data-id');
                    _$popBox.find('.selected-label dd ul li[data-id=' + dataId + ']').remove();
                    $singleBox.removeClass('active');
                }else{
                    //未选中，点击选中
                    var dataId = $singleBox.attr('data-id'),
                        dataName = $(this).find('span').text();
                    _$popBox.find('.selected-label dd ul').append('<li data-id=' + dataId + ' title=' + dataName + '><span>' + dataName + '</span><i>×</i></li>');
                    $singleBox.addClass('active');
                }
                return false;
            });
        },
        /**
         * 添加新标签以后上下选定标签和已有标签的变化
         * @param labels
         */
        afterAddLabels:function(labels){
            var $selectedLabelBox = _$popBox.find('.selected-label dd ul'),
                $hadLabelBox = _$popBox.find('.had-label dd ul');
            util.forEach(labels, function(label){
                if(label.state){
                    //已经存在
                    var $hadLabel = $hadLabelBox.find('li[data-id=' + label.id + ']');
                    if(!$hadLabel.is('.active')){
                        $hadLabel.addClass('active');
                        $selectedLabelBox.append('<li data-id=' + label.id + ' title=' + label.name + '><span>' + label.name + '</span><i>×</i></li>');
                    }
                }else{
                    //未存在
                    $hadLabelBox.find('div').remove();
                    $hadLabelBox.append('<li class="active" data-id=' + label.id + ' title=' + label.name + '><label><button>√</button><span>' + label.name + '</span></label></li>');
                    $selectedLabelBox.append('<li data-id=' + label.id + ' title=' + label.name + '><span>' + label.name + '</span><i>×</i></li>');
                }
            });
        },
        closePopBox:function(isYesClick){
            _collectCallback(isYesClick);
            _$popBox.hide();
            $('.pop-mask').hide();
        }
    }

    module.exports = {
        /**
         * 加入收藏弹出框
         * @param $popBox  必须
         * @param subjectId  必须 题目id
         * @param schoolStageId 必须
         * @param courseId 必须
         * @param databaseType 必须 题库类型  Constant.DATABASE_TYPE
         * @param collectCallback 非必须 主要是“我的收藏”题目列表页，加入收藏后要更新“收藏标签”
         */
        show:function($popBox, subjectId, schoolStageId, courseId, databaseType, collectCallback){
            _$popBox = $popBox;
            _schoolStageId = schoolStageId;
            _courseId = courseId;
            _collectCallback = collectCallback || null;
            _subjectId = subjectId;
            _databaseType = databaseType;
            collectionPop.init();
        }
    }