/**
 * fudapeng
 */
var Constant = require('config');
var ajax = require('util/ajax');
var util = require('util/util');
var questionsStoreUrl = require('url/questions-store-url');

//tpl
var llTpl = require('choose-subject-knowledge/list-loading');
var eSuccessTpl = require('choose-subject-knowledge/evalu-success');
	var qlHelp = {
		toBox:function(obj, templateId){
			var left = $(obj).offset().left;
			var top = $(obj).offset().top - $(window).scrollTop();
			var $clone = $(obj).clone();
			var width = $(obj).width();
			var height = $(obj).height()
			$clone.addClass("move-box").css({ "position": "fixed", "width":width,"height":height,"left": left, "top": top,"background":"#fff" });
			$(templateId).append($clone);
			var toLeft = $("#my-paper").offset().left;
			var toTop = $("#my-paper").offset().top - $(window).scrollTop();
			$(".move-box").animate({
				"left": toLeft,
				"top": toTop,
				"width":0,
				"height":0
			},
			500,
			function(){
				$(".move-box").remove();
			});
		},
		leaveBox:function(obj){
			//从已选题中读取出来
			var left = $("#my-paper").offset().left;
			var top = $("#my-paper").offset().top - $(window).scrollTop();
			var $clone = $(obj).clone();
			$clone.addClass("leave-box").css({ "width":0,"height":0,"position": "fixed", "left": left, "top": top,"background":"#fff" });
			$("body").append($clone);

			var toLeft = $(obj).offset().left;
			var toTop = $(obj).offset().top - $(window).scrollTop();
			$(".leave-box").animate({
				"left": toLeft,
				"top": toTop,
				"width":$(obj).width(),
				"height":$(obj).height()
			},
			500,
			function(){
				$(".leave-box").remove();
			});
		},
		appendQuestionElem:function(databaseType){
			var $body = $("body");
			if(!$("#transparent-pop-mask").length){
				$body.append("<div class='none' id='transparent-pop-mask'></div>");
			}
			if(!$("#list-loading").length){
				$body.append(llTpl({content:'正在加载&nbsp;.&nbsp;.&nbsp;.'}));
			}
			if(!$("#store-ques").length){
				$body.append('<div id="store-ques" class="pop-up p5"></div>');
			}
			if(!$(".pop-mask").length){
				$body.append("<div class='none pop-mask'></div>");
			}
			if(databaseType === Constant.DATABASE_TYPE.DISTRICT || databaseType === Constant.DATABASE_TYPE.SCHOOL){
				///只有区级题库和校级题库才有评分
				if(!$('#evalu-success').length){
					$body.append(eSuccessTpl());
				}
			}
		},
		appendPaperElem:function(databaseType){
			var $body = $("body");
			if(!$(".pop-mask").length){
				$body.append("<div class='none pop-mask'></div>");
			}
			if(!$("#store-ques").length){
				$body.append('<div id="store-ques" class="pop-up p5"></div>');
			}
			if(databaseType === Constant.DATABASE_TYPE.DISTRICT || databaseType === Constant.DATABASE_TYPE.SCHOOL){
				///只有区级题库和校级题库才有评分
				if(!$('#evalu-success').length){
					$body.append(eSuccessTpl());
				}
			}
		},
		isInQuestions:function(questions, id){
			var id2;
			if(id.indexOf(",") + 1){
				id2 = id.slice(0, id.indexOf(","));
			}
			if(questions[id] || questions[id2]){
				return true;
			}
			return false;
		},
		getTextBooks:function(question){
			var newTextBooks = [];
			util.forEach(question.textbooks, function(textbook){
				if(textbook.teachingMaterialVersion && textbook.teachingMaterialVersion.name){
					newTextBooks.push(textbook.teachingMaterialVersion.name);
				}
				if(textbook.teachingMaterial && textbook.teachingMaterial.name){
					newTextBooks.push(textbook.teachingMaterial.name);
				}
				if(textbook.chapter && textbook.chapter.name){
					newTextBooks.push(textbook.chapter.name);
				}
			});
			return newTextBooks.join(',');
		},
		downloadQues:function(questionId, callback, databaseType){
			var sourcePlace;
			switch(databaseType){
				case Constant.DATABASE_TYPE.PUBLIC:{
					sourcePlace = 1;
					break;
				}
				case Constant.DATABASE_TYPE.PRIVAYE:{
					sourcePlace = 0;
					break;
				}
				case Constant.DATABASE_TYPE.DISTRICT:{
					sourcePlace = 3;
					break;
				}
				case Constant.DATABASE_TYPE.SCHOOL:{
					sourcePlace = 4;
					break;
				}
			}
			ajax({
				url:questionsStoreUrl['/favoritesubject/downloadSingleSubject'],
				data:{
					id:questionId,
					sourcePlace:sourcePlace
				}
			}).then(function(data){
				if(data && data.results){
					location.href = data.results;
					callback();
				}
			});
		},
		addChosenCount:function($question, questionId, databaseType){
			questionId = questionId.slice(0, questionId.indexOf(","));
			var url;
			switch(databaseType){
				case Constant.DATABASE_TYPE.PUBLIC:{
					url = questionsStoreUrl['publicAddChosenCount'];
					break;
				}
				case Constant.DATABASE_TYPE.PRIVAYE:{
					url = questionsStoreUrl['privateAddChosenCount'];
					break;
				}
				case Constant.DATABASE_TYPE.DISTRICT:{
					url = questionsStoreUrl['/subjectrepo/district/public/incChosenCount'];
					break;
				}
				case Constant.DATABASE_TYPE.SCHOOL:{
					url = questionsStoreUrl['/subjectrepo/school/public/incChosenCount'];
					break;
				}
			}
			ajax({
				url:url,
				data:{
					id:questionId
				}
			}).then(function(data){
				if(data.results && data.results.result === 'success'){
					var $paperCount = $question.find(".chosen-count strong");
					$paperCount.text($paperCount.text() - 0 + 1);
				}
			});
		},
		addUpdateMarking:function(obj, databaseType, isAdd){
			$(obj).removeClass('no').addClass('yes');
			$(obj).prevAll('dd').removeClass('no').addClass('yes');
			$(obj).nextAll('dd').removeClass('yes').addClass('no');

			var starNum = $(obj).attr('data-num'),
				questionId = $(obj).closest('.question').attr('data-id'),
				url;

			questionId = questionId.substring(0, questionId.indexOf(','));

			if(databaseType === Constant.DATABASE_TYPE.DISTRICT && isAdd){
				//区级题库--添加评分
				url = questionsStoreUrl['/subjectrepo/district/public/addMarking'];
			}else if(databaseType === Constant.DATABASE_TYPE.SCHOOL && isAdd){
				//校级题库--添加评分
				url = questionsStoreUrl['/subjectrepo/school/public/addMarking'];
			}else if(databaseType === Constant.DATABASE_TYPE.DISTRICT && !isAdd){
				//区级题库--更新评分
				url = questionsStoreUrl['/subjectrepo/district/public/updateMarking'];
			}else if(databaseType === Constant.DATABASE_TYPE.SCHOOL && !isAdd){
				//校级题库--更新评分
				url = questionsStoreUrl['/subjectrepo/school/public/updateMarking'];
			}

			ajax({
				url:url,
				data:{
					id: questionId,
					starCount: starNum
				}
			}).then(function(data){
				if(data && data.results && data.results === 'OK'){
					//添加评分成功
					$('#evalu-success, .pop-mask').show();
				}
			});
		}

	};

	module.exports = {
		/*
		 * 加入试卷动画
		 * @param obj  class="question"
		*/
		toBox:function(obj, templateId){
			qlHelp.toBox(obj, templateId);
		},
		/**
		 * 移除试卷动画函数
		 * @param obj  class="question"
		*/
		leaveBox:function(obj){
			qlHelp.leaveBox(obj);
		},
		/**
		 * 正在加载、透明遮罩层页面HTML生成
		*/
		appendQuestionElem:function(databaseType){
			qlHelp.appendQuestionElem(databaseType);
		},
		appendPaperElem:function(databaseType){
			qlHelp.appendPaperElem(databaseType);
		},
		isInQuestions:function(questions, id){
			return qlHelp.isInQuestions(questions, id);
		},
		getTextBooks:function(question){
			return qlHelp.getTextBooks(question);
		},
		/*
		 * 下载试题
		*/
		downloadQues:function(questionId, callback, databaseType){
			qlHelp.downloadQues(questionId, callback, databaseType);
		},
		/**
		 * 组卷次数加1
		*/
		addChosenCount:function($question, questionId, databaseType){
			qlHelp.addChosenCount($question, questionId, databaseType);
		},
		/**
		 * 添加评分
		*/
		addUpdateMarking:function(obj, databaseType, isAdd){
			qlHelp.addUpdateMarking(obj, databaseType, isAdd);
		}
	}