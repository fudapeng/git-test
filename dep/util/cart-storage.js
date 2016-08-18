/**
 * fudapeng
 */
var Constant = require('config');
var util = require('util/util');
var store = require('store');
var getRecognizeNameById = require('util/get-recognize-name-by-index');

var cartTrTpl = require('common/cart-tr');
	var _params = {},
		_pushAllQuestionsIntoCartScope,
		_pullAllQuestionFromCartScope,
		_pullAllQuestionFromCartCallback,
		_pushAllQuestionsIntoCartCallback,
		_storageEvent = {
			addStore:'add',
			deleteStore:'delete'
		},
		_severDataTemp = {};//题库列表信息缓存 //key值是questionId，带有,private和,public

	function runPullAllQuestionFromCart(){
		if (_pushAllQuestionsIntoCartScope) {
            _pullAllQuestionFromCartCallback.call(_pullAllQuestionFromCartCallback);
        } else {
            _pullAllQuestionFromCartCallback.call(null);
        }
	}
	function runPushAllQuestionIntoCart(){
		if (_pushAllQuestionsIntoCartScope) {
            _pushAllQuestionsIntoCartCallback.call(_pushAllQuestionsIntoCartScope);
        } else {
            _pushAllQuestionsIntoCartCallback.call(null);
        }
	}
	var cartStorageHandler = {
		storageHandler:function(questionId, recognizeTypeId, eventType){
			var storeCart = store.get(Constant.STORAGE_KEY.CART);

			switch(eventType){
				case _storageEvent.deleteStore:{
					delete storeCart.questions[questionId];
					break;
				}
				case _storageEvent.addStore:{
					//购物车本地还没有存储
					if(!storeCart){
						storeCart = this.initStoreObj();
					}
					storeCart.questions[questionId] = true;
					break;
				}
			}
			this.cartNumChange(storeCart.cartNum, recognizeTypeId, questionId, eventType);
            //最后还要再次保存到本地
			store.set(Constant.STORAGE_KEY.CART, storeCart);
		},
		initStoreObj:function(schoolStageId, courseId){
			var storeObj = {
				questions:{},
				cartNum:{
					totalNum:0,
					recognizeTypeNum:[]
				}
			};
			return storeObj;
		},
		cartNumChange:function(cartNum, recognizeTypeId, questionId, eventType){
			var $myPaper = $("#my-paper");
			switch(eventType){
				case _storageEvent.deleteStore:{
					var changeIndex;
					//总数减少
					cartNum.totalNum -= 1;
					$myPaper.find("tfoot tr.total-num").find("td:eq(1)").text(cartNum.totalNum);
					//删除题目数据存储
					util.forEach(cartNum.recognizeTypeNum,function(recognizeTypeNum, i){
						/*
							TODO1.3版本中recognizeTypeNum.id可能是多个认知类型用,分开，需要用正则逆序查找题型下是否存在
							该认知类型
						*/
						if(recognizeTypeNum.id == recognizeTypeId){
							var deleteIndex;
							util.forEach(recognizeTypeNum.subjects,function(subject, i){
								if(subject.id === questionId){
									deleteIndex = i;
									return true;
								}
							});
							recognizeTypeNum.subjects.splice(deleteIndex, 1);
							if(!recognizeTypeNum.subjects.length){
								$myPaper.find("tbody tr[data-id = "+recognizeTypeNum.id+"]").remove();
								changeIndex = i;
							}else{
								$myPaper.find("tbody tr[data-id = "+recognizeTypeNum.id+"]").find("td:eq(1)").text(recognizeTypeNum.subjects.length);
							}
							return true;
						}
					});
					//该认知类型为0，删除认知类型数组中该数据
					if(changeIndex != undefined){
						cartNum.recognizeTypeNum.splice(changeIndex, 1);
					}
					//购物车为0
					if(!cartNum.totalNum){
						$myPaper.find(".ques-none").show()
								.end()
								.find(".choosed-ques").hide();
					}
					break;
				}
				case _storageEvent.addStore:{
					var findFlag = false;
					cartNum.totalNum += 1;
					$myPaper.find("tfoot tr.total-num").find("td:eq(1)").text(cartNum.totalNum);
					if(cartNum.totalNum === 1){
						//第一次显示购物车
						$myPaper.find(".ques-none").hide()
								.end()
								.find(".choosed-ques").show();
					}
					if(cartNum.recognizeTypeNum.length){
						util.forEach(cartNum.recognizeTypeNum, function(recognizeTypeNum, i){
							//TODO这个地方得判断，因为我的试卷过来补充试题到手动组卷中的recognizeTypeNum.id是没有,public的
							if(recognizeTypeNum.id == recognizeTypeId){
								recognizeTypeNum.subjects.push(_severDataTemp[questionId]);
								//dom显示变化
								if(recognizeTypeNum.subjects.length === 1){
									//该认知类型上边第一次初始化
									$myPaper.find("tbody").append(cartTrTpl(recognizeTypeNum));
								}else{
									$myPaper.find("tbody tr[data-id = "+recognizeTypeNum.id+"]").find("td:eq(1)").text(recognizeTypeNum.subjects.length);
								}
								findFlag = true;
								return true;
							}
						});
					}
					if(!findFlag){
						//该认知类型第一次本地存储
						var recognizeTypeName = getRecognizeNameById(recognizeTypeId);
						var newRecognizeTypeNum = {
							id:recognizeTypeId,
							body:recognizeTypeName,
							recognizeTypeName:recognizeTypeName,
							subjects:[]
						};
						newRecognizeTypeNum.subjects.push(_severDataTemp[questionId]);
						cartNum.recognizeTypeNum.push(newRecognizeTypeNum);
						$myPaper.find("tbody").append(cartTrTpl(newRecognizeTypeNum));
					}
					break;
				}
			}
		},
		/**
		 * 将试题信息本地变量保存，方便放入购物车时使用
		*/
		setSeverDataTemp:function(question){
			var self = this,
				copyQuestion = {
					id:question.id,
					recognizeType:question.recognizeType
				};

			if(question.type === Constant.BASIC_QUESTION_INDEX.COMPLEX){
				//复合题
				copyQuestion.subSubjects = [];
				var totalScore, scoreFlag;
				if(!question.score || !question.suggestedScore){
					scoreFlag = false;
					totalScore = 0;
				}
				util.forEach(question.subSubjects, function(sub){
					var copySub = {};
					self.saveScore(copySub, sub);
					if(!scoreFlag && copySub.score){
						totalScore += copySub.score;
					}
					copyQuestion.subSubjects.push(copySub);
				});
				if(totalScore){
					copyQuestion.score = totalScore;
				}
			}else{
				self.saveScore(copyQuestion, question);
			}
			//试题内容的详细信息不用本地保存，只用保留需要的就好
			_severDataTemp[question.id] = copyQuestion;
		},
		saveScore:function(copyQuestion, question){
			//试卷信息对应的是score和semiScore，试题信息对应的是suggestedScore和suggestedSemiScore
 			if(question.score || question.suggestedScore){
 				copyQuestion.score = question.score || question.suggestedScore;
 			}
 			if(question.type === Constant.BASIC_QUESTION_INDEX.MULTI_OPTION &&
 				(question.semiScore || question.semiScore === 0)){
 				//漏选得分可以为0分
 				copyQuestion.semiScore = question.semiScore;
 			}else if(question.type === Constant.BASIC_QUESTION_INDEX.MULTI_OPTION &&
 				(question.suggestedSemiScore || question.suggestedSemiScore === 0)){
 				//漏选得分可以为0分
 				copyQuestion.semiScore = question.suggestedSemiScore;
 			}
		},
		pullAllQuestionFromCart:function(paperInfo, databaseType){
			_params.schoolStageId = paperInfo.paper.schoolStage.id;
			_params.courseId = paperInfo.paper.course.id;

			var self = this,
				storeCart = store.get(Constant.STORAGE_KEY.CART);

			util.forEach(paperInfo.subjects, function(question){
				if(!(question.id.indexOf(",") + 1)){
					//试题id没有题库类型标识的时候要增加上
					question.id += ',' + databaseType;
				}
				if(storeCart && storeCart.questions && storeCart.questions[question.id]){
					self.storageHandler(question.id, question.recognizeType, _storageEvent.deleteStore);
				}
			});
			//全部移出购物车的回调函数
			runPullAllQuestionFromCart();
		},
		pushAllQuestionsIntoCart:function(paperInfo, databaseType){
			_params.schoolStageId = paperInfo.paper.schoolStage.id;
			_params.courseId = paperInfo.paper.course.id;
			var self = this,
				storeCart = store.get(Constant.STORAGE_KEY.CART);

			util.forEach(paperInfo.subjects, function(question){
				if(!(question.id.indexOf(",") + 1)){
					//试题id没有题库类型标识的时候要增加上
					question.id += ',' + databaseType;
				}
				if(!storeCart || !storeCart.questions || !storeCart.questions[question.id]){
					self.setSeverDataTemp(question);
					self.storageHandler(question.id, question.recognizeType, _storageEvent.addStore);
				}
			});
			//全部加入购物车的回调函数
			runPushAllQuestionIntoCart();
		},
		paperPreviewStore:function(schoolStageId, courseId, examPaperId, examPaperName, callback){
			var storeCart = store.get(Constant.STORAGE_KEY.CART),
				cartInfo = JSON.parse(JSON.stringify(storeCart)),
				myPaper = {
					subjectInfo:cartInfo.cartNum.recognizeTypeNum
				};
			if(!cartInfo.generatePaper){
				myPaper.generatePaper = {
					schoolStageId:schoolStageId,
					courseId:courseId,
					examPaperId:examPaperId,
					paperName:examPaperName
				}
			}else{
				myPaper.generatePaper = cartInfo.generatePaper;
				myPaper.generatePaper.examPaperId = examPaperId;
				myPaper.generatePaper.examPaperName = examPaperName;
			}
			store.set(Constant.STORAGE_KEY.MANUAL_PAPER_PREVIEW, myPaper);//试卷预览
			callback();
		},
		/*
		 * 作业列表，新创作业到手动组卷页面选题前调用内容
		*/
		setHomework:function(schoolStageId, courseId, homeworkId, homeworkName){
			var storeCart = this.initStoreObj();
			storeCart.generatePaper = {
				schoolStageId:schoolStageId,
				courseId:courseId,
				homeworkId:homeworkId,
				paperName:homeworkName
			}
			store.set(Constant.STORAGE_KEY.CART, storeCart);
		},
		/*
		 * 考试列表，新创考试【去组卷】到手动组卷页面选题前调用内容
		*/
		setExamPaper:function(schoolStageId, courseId, examPaperId, examPaperName){
			var storeCart = this.initStoreObj();
			storeCart.generatePaper = {
				schoolStageId:schoolStageId,
				courseId:courseId,
				examPaperId:examPaperId,
				paperName:examPaperName
			}
			store.set(Constant.STORAGE_KEY.CART, storeCart);
		},
		setCartStorageNull:function(){
			store.set(Constant.STORAGE_KEY.CART, null);
		}
	};

	module.exports = {
		storageHandler:function(params, questionId, recognizeTypeId, eventType){
			_params = params;
			cartStorageHandler.storageHandler(questionId, recognizeTypeId, eventType);
		},
		getStorageEvent:function(){
			return _storageEvent;
		},
		/**
		 * 将试题信息本地变量保存，方便放入购物车时使用
		*/
		setSeverDataTemp:function(question){
			cartStorageHandler.setSeverDataTemp(question);
		},
		/**
		 * 全部加入购物车
		 * @param paperInfo 试卷全部信息（包含试题信息）
		 * @param databaseType  题库库类型  Constant.DATABASE_TYPE
		 * @param callback 全部加入购物车回调函数
		 * @param scope 上下文
		 *
		*/
		pushAllQuestionsIntoCart:function(paperInfo, databaseType, callback, scope){
			_pushAllQuestionsIntoCartScope = scope;
			_pushAllQuestionsIntoCartCallback = callback;
			cartStorageHandler.pushAllQuestionsIntoCart(paperInfo, databaseType);
		},
		pullAllQuestionFromCart:function(paperInfo, databaseType, callback, scope){
			_pullAllQuestionFromCartScope = scope;
			_pullAllQuestionFromCartCallback = callback;
			cartStorageHandler.pullAllQuestionFromCart(paperInfo, databaseType);
		},
		/*
		 * 单元测试安排考试，跳转到试卷预览的页面前调用，回调仅仅用来写跳转
		*/
		paperPreviewStore:function(schoolStageId, courseId, examPaperId, examPaperName, callback){
			cartStorageHandler.paperPreviewStore(schoolStageId, courseId, examPaperId, examPaperName, callback);
		},
		setHomework:function(schoolStageId, courseId, homeworkId, homeworkName){
			cartStorageHandler.setHomework(schoolStageId, courseId, homeworkId, homeworkName);
		},
		setExamPaper:function(schoolStageId, courseId, examPaperId, examPaperName){
			cartStorageHandler.setExamPaper(schoolStageId, courseId, examPaperId, examPaperName);
		},
		setCartStorageNull:function(){
			cartStorageHandler.setCartStorageNull();
		}
	};