/**
 * fudapeng
 */
var Constant = require('config');
var ajax = require('util/ajax');
var util = require('util/util');
var store = require('store');
var pageHandler2 = require('./page-v2');
var pageHandler3 = require('./page-v3');
var cartStorageHandler = require('util/cart-storage');
var collectPop = require('util/collection-pop');
var questionsStoreUrl = require('url/questions-store-url');
var getRecognizeNameById = require('util/get-recognize-name-by-index');
var qlHelp = require('util/question-list-help');
//css
require('../../less/questions-list-template');

//tpl
var questListTpl = require('common/question-list');

	var toTopElClz = 'go-top',//返回顶部
		_theRestQuestionsNum = 0,
		_callback,
		// _needUpdateTags = false,//标签是否需要更新
		_times = 0,
		_templateId,//模板显示id
		_isPaging,//是否显示分页
		_url,//请求url
		_params,//参数列表
		_databaseType,//题库类型【公共库】【区级库】【校级库】【个人库】
		_isQuestionList = false; //说明是不是题库列表

	var callbackEvent = {
		hasNotData:0, //没有数据
		hasData:1, //有数据
		collect: 2 //收藏列表（加入收藏和取消收藏都要刷新标签）
	};

	var questionsList = {
		/**
		 * @param id  列表包裹元素id   string
		 * @param url 请求列表地址   string
		 * @param params 请求列表参数   object
		 * @param isPaging 是否分页  boolean
		 * @param databaseType 题库类型  Constant.DATABASE_TYPE
		*/
		initQuestion:function(id, url, params, isPaging, databaseType){
			//默认返回顶部
			if($("."+toTopElClz).is(':visible')){
        		$("."+toTopElClz).click();
			}
			_templateId = "#" + id;
			_url = url,
			_params = JSON.parse(JSON.stringify(params)),
			_isPaging = isPaging;
			_databaseType = databaseType;
			_params.pageNum = _params.pageNum || 1;

			qlHelp.appendQuestionElem(databaseType);
			this.requestListData();

		},
		initPaper:function(id, params, subjects, databaseType, callback){
			_templateId = "#" + id;
			_databaseType = databaseType;
			_params = JSON.parse(JSON.stringify(params));

			qlHelp.appendPaperElem(databaseType);
			this.successDataHandler(subjects);
			this.viewHandler();
			if(callback){
				callback(_theRestQuestionsNum);
			}
		},
		requestListData:function(){
			var self = this;
			$("#transparent-pop-mask,#list-loading").show();
			ajax({
				url: _url,
				data: _params,
				type: 'post'
			}).then(function(data){
				$("#transparent-pop-mask,#list-loading").hide();
				//没有数据
				if(!data || !data.results || !data.results.length){
					$("#pages-top,#pages-bottom").hide();
					if(!$('.no-data-view').length){
						//页面第一次加载
						$(_templateId).html(template('common/page-no-msg-info',null));
					}
					$(".no-data-view").show();
					if(_callback){
						_callback(callbackEvent['hasNotData']);
					}
					return;
				}
				self.successDataHandler(data);
				self.viewHandler();
				if(_callback){
					_callback(callbackEvent['hasData']);
				}
			});
		},
		successDataHandler:function(data){
			$(".no-data-view").hide();
			var self = this;

			//允许有分页且分页对象第一次初始化
			if(_isPaging && !_times){
				self.pagesBottom = pageHandler2(function(num){
			        //默认返回顶部
	        		$("."+toTopElClz).click();
	        		_params.pageNum = num;
                    self.requestListData();
			    },'pages-bottom');
                self.pagesTop = pageHandler3(function(num){
                    _params.pageNum = num;
                    self.requestListData();
                },'pages-top');
                _times++;
			}

			if(_isPaging){
				$("#pages-top,#pages-bottom").show();
				//设置当前的选中页数
			    self.pagesBottom.setCurrentPageNum(_params.pageNum);
			    self.pagesTop.setCurrentPageNum(_params.pageNum);
			    //初始化内容,传递的参数是最大页数
			    self.pagesBottom.init(data.page.pageCount);
			    self.pagesTop.init(data.page.pageCount);
			}

			//题库的时候是data.results，卷库的时候是data
			data = data.results || data;
		    self.saveSeverData(data);
		    //TODO  暂时题库卷库没有样式之分，先按照题库统一处理，后续更改，从这里更改入口文件
		    $(_templateId).html(questListTpl(data));
		},
		saveSeverData:function(results){
			var storeCart = store.get(Constant.STORAGE_KEY.CART),
				self = this;
			_theRestQuestionsNum = 0;
			util.forEach(results,function(question){
				/*
					后台张玉龙负责
					收藏试题列表页面不再有【公共库】和【个人库】的搜索条件，,public和,private标识后台直接返回
				*/
				if(_url != questionsStoreUrl['/favoritesubject/listSubject']){
					//不是收藏试题列表
					if(!(question.id.indexOf(",") + 1)){
						question.id += ',' + _databaseType;
					}
				}

				question.recognizeTypeName = getRecognizeNameById(question.recognizeType);
				//区级题库和校级题库增加【试题评价】和【我的评分】选项
				if((_databaseType === Constant.DATABASE_TYPE.DISTRICT || _databaseType === Constant.DATABASE_TYPE.SCHOOL) && _isQuestionList){
					question.isShowEvaluate = true;
					//我的评价
					var myEvaluateFlags = [];
					if(question.starCount){
						for(var i = 0; i < question.starCount; i++){
							myEvaluateFlags.push(1);
						}
					}
					while(myEvaluateFlags.length < 5){
						myEvaluateFlags.push(0);
					}
					question.myEvaluateFlags = myEvaluateFlags;
					//试题评价
					var evaluateFlags = [], subjectMarking;
					if(question.subjectMarking){
						subjectMarking = Math.round(question.subjectMarking);
						for(var j = 0; j < subjectMarking; j++){
							evaluateFlags.push(1);
						}
					}
					while(evaluateFlags.length < 5){
						evaluateFlags.push(0);
					}
					question.evaluateFlags = evaluateFlags;
				}else{
					question.isShowEvaluate = false;
				}
				if(typeof question.textbooks !== 'string'){
					question.textbooks = qlHelp.getTextBooks(question);
				}
				//【考试列表】【作业列表】-【试卷预览】-【补充试题】这个时候questions中的id是没有,public和,private的
				if(storeCart && qlHelp.isInQuestions(storeCart.questions, question.id)){
					question.isHasChoosed = true;
				}else{
					question.isHasChoosed = false;
					_theRestQuestionsNum++;
				}
				cartStorageHandler.setSeverDataTemp(question);
			});
		},
		viewHandler:function(){
			var self = this;
			$("#store-ques").undelegate();
			var $handlerBtn = $(_templateId).find(".handler-btn");
			$handlerBtn.delegate(".answer-analysis-btn", "click", function(){
				//答案与解析按钮
				if($(this).is(".active")){
					$(this).removeClass("active").closest(".handler-btn").next(".answer-analysis").slideUp();
				}else{
					$(this).addClass("active").closest(".handler-btn").next(".answer-analysis").slideDown();
				}
			}).delegate('.evalucate dd', 'click', function(){
				//我的评分
				var $stars = $(this).closest('.handler-btn').find('.evalucate');
				if($stars.find('dd:first').is('.no')){
					//以前没有评分
					qlHelp.addUpdateMarking(this, _databaseType, true);
				}else{
					//已经评过分
					qlHelp.addUpdateMarking(this, _databaseType, false);
				}
			}).delegate(".input-paper", "click", function(){
				var $question = $(this).closest(".question"),
					questionId = $question.attr("data-id"),
					recognizeTypeId = $question.attr("data-recognize-type-id"),
					storageEvent = cartStorageHandler.getStorageEvent();

				if($(this).is(".active")){
					//移出试题
					if($(".move-box").is(":animated")||$(".leave-box").is(":animated")){
						return;
					}
					$(this).removeClass("active").text("加入试题");
					qlHelp.leaveBox($(this).closest(".question"));
					//删除该题在本地试卷中的存储
					cartStorageHandler.storageHandler(_params, questionId, recognizeTypeId, storageEvent.deleteStore);
				}else{
					//加入试题
					if($(".move-box").is(":animated")||$(".leave-box").is(":animated")){
						return;
					}
					$(this).addClass("active").text("移出试题");
					var $question = $(this).closest(".question");
					qlHelp.addChosenCount($question, $question.attr("data-id"), _databaseType);
					qlHelp.toBox($(this).closest(".question"), _templateId);
					//试卷的本地存储增加该题
					cartStorageHandler.storageHandler(_params, questionId, recognizeTypeId, storageEvent.addStore);
				}
			}).delegate(".store", "click", function(){
				var questionId = $(this).closest(".question").attr("data-id"),
						$self = $(this);
				if($(this).is(".active")){
					//取消收藏
					ajax({
						url:questionsStoreUrl['/favoritesubject/removeFavoriteSubject'],
						data:{
							id:questionId.slice(0,questionId.indexOf(','))
						}
					}).then(function(data){
						if(data && data.results){
							$self.removeClass("active").text("收藏试题");
							if(_callback){
								//取消收藏，要更新上边的标签
								_callback(callbackEvent['collect']);
							}
						}
					});
				}else{
					//收藏试题
					self.renderPopCollection(questionId, function(isYesClick){
                        if(isYesClick){
                            //确认收藏返回true，点击弹窗取消或者关闭没有
                            $self.addClass('active').text('取消收藏');
                        }
                        if(_callback){
							//加入收藏，要更新上边的标签
							_callback(callbackEvent['collect']);
						}
                    });
				}
			}).delegate(".download", "click", function(){
				//下载试题
				if($(this).is(".active")) return;
				var self = this,
					questionId = '';
				questionId = $(self).closest(".question").attr("data-id");
				questionId = questionId.slice(0,questionId.indexOf(','));

				qlHelp.downloadQues(questionId, function(){
					$(self).addClass("active").text("已下载");
				}, _databaseType);
			});

			$('#evalu-success').undelegate().delegate('.yes-btn, .close-box', 'click', function(){
				//评价成功弹框
				$('#evalu-success, .pop-mask').hide();
			});
		},
		renderPopCollection:function(subjectId, addCollectCallback){
			if(!$('.pop-mask').length){
                $('body').append('<div class="pop-mask"></div>');
            }
            if(!$('#pop-collection').length){
                $('body').append('<div id="pop-collection" class="none"></div>');
            }
            collectPop.show($('#pop-collection'), subjectId.slice(0,subjectId.indexOf(',')), _params.schoolStageId, _params.courseId, _databaseType, function(isYesClick){
                addCollectCallback(isYesClick);
            });
		}
	};

	module.exports = {
		initCallback:function(callback){
			_callback = callback;
		},
		/**
		 * @param id  试题列表包裹元素id
		 * @param url 请求地址
		 * @param params 后台请求参数
		 * @param isPaging   是否分页
		 * @param databaseType  题库类型 Constant.DATABASE_TYPE
		*/
		showQuestionList:function(id, url, params, isPaging, databaseType){
			_isQuestionList = true;
			questionsList.initQuestion(id, url, params, isPaging, databaseType);
		},
		/**
		 * @param id  试题列表包裹元素id
		 * @param params:{schoolStageId:1,courseId:2}
		 * @param subjects 列表数据
		 * @param databaseType  题库类型 Constant.DATABASE_TYPE
		*/
		showPaperList:function(id, params, subjects, databaseType, callback){
			questionsList.initPaper(id, params, subjects, databaseType, callback);
		},
		getCallbackEvent:function(){
			return callbackEvent;
		}
	}
