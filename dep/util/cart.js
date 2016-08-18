/**
 * fudapeng
 */
var ajax = require('util/ajax');
var util = require('util/util');
var Constant = require('config');
var store = require('store');
var scUrl = require('url/score-count-url');
var examPop = require('util/create-exam-pop');
// var createHWPop = require('util/score-count-url');
//css
require('../../less/my-paper-cart');
//tpl
var cartTpl = require('choose-subject-knowledge/cart');
var _templateId,
		_schoolStageId,
		_courseId,
		_callback,
		_homeworkCode = 'am_manage',
		_homeworkFlag = false;//南京，作业权限code
	var myPaper = {
		init:function(id, schoolStageId, courseId){
			//南京start
			/*this.judgeInputOutput(function(flag){
				if(flag){
					_templateId = "#" + id;
					_schoolStageId = schoolStageId;
					_courseId = courseId;
					var	storeCart = store.get(Constant.STORAGE_KEY.CART);
					if(storeCart){
						this.renderCart(storeCart);
					}else{
						//购物车还没有本地存储
						this.renderCart({});
					}
					this.initBtn();
				}
			},this);*/
			//南京end
			_templateId = "#" + id;
			_schoolStageId = schoolStageId;
			_courseId = courseId;
   			var	storeCart = store.get(Constant.STORAGE_KEY.CART);
			if(storeCart){
                //如果刷新页面url不是针对性练习这个页面 并且保存的针对性练习的字段 清空本地cart 包括学生成绩报告这边
                if(location.href.indexOf("#")=="-1"&&!!storeCart.targetPractice){
                    store.set(Constant.STORAGE_KEY.CART, null);
                    this.renderCart({});
                }else {
                   this.renderCart(storeCart);
                }
			}else{
				//购物车还没有本地存储
				this.renderCart({});
			}
			this.initBtn();
		},
		/**
		 * 南京---判断是否有加入移出按钮
		 * @param callback
		 * @param scope
		 */
		judgeInputOutput:function(callback, scope){
			var flag = true;
			userInfo(function(data){
				if(data.type === '0'){
					//区级账号
					var storeCart = store.get(Constant.STORAGE_KEY.CART);
					if(!storeCart || !storeCart.generatePaper || !storeCart.generatePaper.examPaperId){
						//不是从考试列表创建考试过来的
						flag = false;
					}
				}
				//作业权限判断
				for(var i = 0; i < data.permissions.length; i++){
					if(data.permissions[i] === _homeworkCode){
						_homeworkFlag = true;//作业管理权限标识
						break;
					}
				}
				callback.call(scope, flag);
			});
		},
		renderCart:function(cartNum){
			//南京start
			cartNum.homeworkFlag = _homeworkFlag;
			//南京end
			$(_templateId).html(cartTpl(cartNum));
		},
		clearCart:function(flag){
			//清空购物车
			var	storeCart = store.get(Constant.STORAGE_KEY.CART);
			if(storeCart){
				store.set(Constant.STORAGE_KEY.CART, null);
			}
			$("#my-paper").find(".choosed-ques").hide()
						  .find("tfoot td:eq(1)").text(0)
						  .end()
						  .find("tbody").empty()
						  .end()
						  .end()
						  .find(".ques-none").show();
			if(flag){
				_callback();
			}
		},
		initBtn:function(){
			var self = this;
			//清空
			$("#my-paper .clear").click(function(){
				if($("#my-paper .ques-none").is(":visible")){
					return;
				}
				self.clearCart(true);
			});
			//生成考试
			$("#create-exam").click(function(){
				var storeCart = store.get(Constant.STORAGE_KEY.CART);
				if(!storeCart.generatePaper || !storeCart.generatePaper.examPaperId){
					userInfo(function(data){
						var examPopType;
						if(data.type != '0'){
							//校级账号
							examPopType = examPop.EXAM_LEVEL.SCHOOL;
						}else{
							//非校级账号
							examPopType = examPop.EXAM_LEVEL.REGION;
						}
						//安排考试
						examPop.show(examPopType,function(state, examPaperName, examId, examPapers){
							//保存提交回调
				            if(state === 'success'){
					            self.generateExam(examPapers.examPaperId, examPaperName);
				            }else{
				            	alert("安排考试失败!");
				            }
				        }, _courseId, _schoolStageId);
					});
				}
			});
			//布置作业
			$("#create-homework").click(function(){
				var storeCart = store.get(Constant.STORAGE_KEY.CART);
				if(!storeCart.generatePaper || !storeCart.generatePaper.homeworkId){
					//弹出布置作业的弹出框，回调函数是【确定】的执行
					createHWPop.show(function(state, homeworkName, homeworkId, courseId, schoolStageId){
						if(state === 'success'){
							self.generateHomework(homeworkId, homeworkName);
						}else{
							alert("布置作业失败!");
						}
					}, _courseId);
				}
			});
			//不用在这个地方创建考试或者作业直接跳转----这个时候肯定有generatePaper
			$("#paper-preview").click(function(){
				var storeCart = store.get(Constant.STORAGE_KEY.CART),
					cartInfo = JSON.parse(JSON.stringify(storeCart)),
					myPaper = {
						subjectInfo:cartInfo.cartNum.recognizeTypeNum
					};

				myPaper.generatePaper = cartInfo.generatePaper;
				self.goToPaperPreview(myPaper);
			});
			//针对性练习 包括学生查看报告 完成功能
			$('#target-practice').click(function(){
				var storeCart = store.get(Constant.STORAGE_KEY.CART),
					cartInfo = JSON.parse(JSON.stringify(storeCart));
				var params = cartInfo.params;
				var sourceSubjects = [];
				util.forEach(cartInfo.cartNum.recognizeTypeNum, function(r){
					if(r.subjects.length){
						util.forEach(r.subjects, function(s){
                                sourceSubjects.push({id:s.subjectId||s.id});
						});
					}
				});
                if(cartInfo.targetKnowpointPractice){
                    //针对知识点添加的练习题
                    ajax({
                        url:scUrl['targetedPractice/savePracticeForStu'],
                        data:{
                                examId:params.examId,
                                courseId:params.courseId,
                                knowledgePoints:JSON.stringify(params.knowledgePoints),//这个是按照之前选择的知识点
                                studentId:params.studentId,
                                targetedPracticeId:params.targetedPracticeId,
	                            sourceSubjects:JSON.stringify(sourceSubjects)
                        },
                        type:'post'
                    }).then(function(data){
                        /*
                        * then返回的结果还是promise对象
                        * */
                        if(data && data.results){
                            return ajax({
                                url: scUrl['/targetedPractice/pushQuestions'],
                                data: {
                                    targetedPracticeId:params.targetedPracticeId || data.results,
                                    studentId:params.studentId||undefined
                                }
                            });
                        }
                    }).then(function(data){
                        if(data && data.results === "ok"){
                            var href = location.href;
                            var p = href.substring(href.indexOf('#'));
                            location.href = '/acareport/html/student/single-score-report.html' + p;
                        }
                    });
                }else{
                    //针对习题添加的针对性练习题的id
                    ajax({
                        url:scUrl['/targetedPractice/savePractice'],
                        data: {
                            examId:params.examId,
                            courseId:params.courseId,
                            subjectId:params.subjectId,
                            targetedPracticeId:params.targetedPracticeId || undefined,
                            sourceSubjects: JSON.stringify(sourceSubjects)
                        }
                    }).then(function(data){
                        //练习试题保存（更新）成功
                        if(data && data.results){
                            return ajax({
                                url: scUrl['/targetedPractice/pushQuestions'],
                                data: {
                                    targetedPracticeId:params.targetedPracticeId || data.results
                                }
                            });
                        }
                    }).then(function(data){
                        if(data && data.results === "ok"){
                            var href = location.href;
                            var p = href.substring(href.indexOf('#'));
                            location.href = '/acareport/html/teacher/specific-practice-set.html' + p;
                        }
                    });
                }
			});
		},
		generateExam:function(examPaperId, examPaperName){
			var storeCart = store.get(Constant.STORAGE_KEY.CART),
				cartInfo = JSON.parse(JSON.stringify(storeCart)),
				myPaper = {
					subjectInfo:cartInfo.cartNum.recognizeTypeNum
				};
			if(!cartInfo.generatePaper){
				myPaper.generatePaper = {
					schoolStageId:_schoolStageId,
					courseId:_courseId,
					examPaperId:examPaperId,
					paperName:examPaperName
				}
			}else{
				myPaper.generatePaper = cartInfo.generatePaper;
				myPaper.generatePaper.examPaperId = examPaperId;
				myPaper.generatePaper.paperName = examPaperName;
			}
			this.goToPaperPreview(myPaper);
		},
		generateHomework:function(homeworkId, homeworkName){
			var storeCart = store.get(Constant.STORAGE_KEY.CART),
				cartInfo = JSON.parse(JSON.stringify(storeCart)),
				myPaper = {
					subjectInfo:cartInfo.cartNum.recognizeTypeNum
				};
			if(!cartInfo.generatePaper){
				myPaper.generatePaper = {
					schoolStageId:_schoolStageId,
					courseId:_courseId,
					homeworkId:homeworkId,
					paperName:homeworkName
				}
			}else{
				myPaper.generatePaper = cartInfo.generatePaper;
				myPaper.generatePaper.homeworkId = homeworkId;
				myPaper.generatePaper.paperName = homeworkName;
			}
			this.goToPaperPreview(myPaper);
		},
		goToPaperPreview:function(myPaper){
			//购物车清空
			this.clearCart(true);

			//试卷预览本地保存
			store.set(Constant.STORAGE_KEY.MANUAL_PAPER_PREVIEW, myPaper);//试卷预览
			//跳转到试卷预览
			location.href = Constant.PATH_URL + '/public/html/exam/paper-preview.html#source=' + Constant.PAPER_PREVIEW_SOURCE.MANUAL_PAPER;
		}

	};

	module.exports = {
		/**
		* @param id 引用的包裹元素id
		* @param schoolStageId
		* @param courseId
		* @param callback  此回调用于，点击清空后，当前页面题目列表的刷新
		*/
		init:function(id, schoolStageId, courseId, callback){
			_callback = callback;
			myPaper.init(id, schoolStageId, courseId);
		},
		/*
		 * 清空购物车，点击【更改】以后的调用
		*/
		clearCart:function(){
			myPaper.clearCart();
		}
	}