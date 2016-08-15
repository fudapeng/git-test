/**
 * fudapeng 8.12
 */
var Constant =  require('config');
var ajax = require('util/ajax');
var store = require('store');
var cookieUtil = require('util/cookie-util');

var AUTO_LOGIN_TIPS = '公共场所不建议自动登录，以防帐号丢失',
		NAME_PASSWORD_NULL = '请输入账户名和密码',
		NAME_NULL = '请输入用户名',
		PASSWORD_NULL = '请输入密码',
		ERROR_NAME_PASSWORD = '用户名或密码错误';
var secretary={
		'sa_totalScore_schoolTotalScore':1,
		'sa_totalScore_schoolTotalScoreScatter':1,
		'sa_totalScore_schoolTotalScoreAnalysis':1,
		'sa_totalScore_schoolTotalScoreGoalCount':1,
		'sa_totalScore_schoolCourseScore':1,
		'sa_totalScore_schoolCourseScoreAnalysis':1,
		'sa_totalScore_schoolCourseScoreScatter':1,
		'sa_totalScore_schoolCourseGoalCount':1
	};

var USER = [['xiaozhang1','670b14728ad9902aecba32e22fa4f6bd'],
		['510120114','670b14728ad9902aecba32e22fa4f6bd'],
		['renkejiaoshi1','670b14728ad9902aecba32e22fa4f6bd'],
		['jyjz','670b14728ad9902aecba32e22fa4f6bd']
	];

var login = {
	init:function(){
			var self = this;
			self.resetIpt();
			self.initView();
			if(cookieUtil.getCookie('token')){
				self.userInfo();
			}
			//登录账号自动聚焦
			$('#login-name-ipt').focus();
		},
		resetIpt:function(){
			$('#login-name-ipt, #password-ipt').val('').blur();
			$('#login-name-ipt').focus();
		},
		initView:function(){
			var self = this,
				$loginBox = $('#login-box'),
				$loginOption = $loginBox.find('.login-option');
			//防止firefox回退不执行js导致输入框内容未清空
			$(window).unload(function(){
				self.resetIpt();
			});
			//账号，密码输入框
			$('#login-name-ipt, #password-ipt').focus(function(){
				$(this).next('label').hide()
					.end()
					.closest('.input-group').removeClass('warning').addClass('focusing');
			}).blur(function(){
				if(!$(this).val()){
					$(this).next('label').show();
				}
				$(this).closest('.input-group').removeClass('warning').removeClass('focusing');
			});
			//自动登录
			$loginOption.delegate('input', 'click', function(){
				var $tips = $loginBox.find('.tips');
				if($(this).prop('checked')){
					$tips.removeClass('warning')
						.find('span').text(AUTO_LOGIN_TIPS);
				}
			});
			//登录
			$('.login-submit').click(function(){
				store.clear();
				var loginName = $('#login-name-ipt').val(), expire = null,
					password = $('#password-ipt').val();

				//是否自动登录
				if($loginOption.find('input').prop('checked')){
					expire = EXPIRE_TIME_SEVEN_DAY;
				}else{
					expire = null;
				}
				//没有账号密码
				if(!loginName && !password){
					self.tipWarning(NAME_PASSWORD_NULL);
					return false;
				}
				//没有账号
				if(!loginName){
					self.tipWarning(NAME_NULL);
					return false;
				}
				//没有密码
				if(!password){
					self.tipWarning(PASSWORD_NULL);
					return false;
				}
				ajax({
					url:'/api/pp/passport/login',
					data:{
						loginName:USER[0][0],
						password:USER[0][1],
						expire: expire
					},
					type:'post'
				}).then(function(data){
					if(data && data.errorCode){
						//账号或密码错误
						if(data.errorCode === 600000||data.errorCode == 600001){
							location.href = './index.html';
							return;
						}else{
							self.tipWarning(ERROR_NAME_PASSWORD);
						}
					}else if(data && data.results){
						//登录成功
						data = data.results;
						if (data.needChangePassword) {
							store.set("needChangePassword", data.needChangePassword);
						}
						if(data.token){
							if(expire){
								expire *= 1000;
							}
							cookieUtil.setCookie("token", data.token, expire);
							self.userInfo();
						}else{
							self.tipWarning(ERROR_NAME_PASSWORD);
						}
					}
			});


			});
			//键盘Enter键
			document.onkeydown = function(event){
				var event = event || window.event;
				if(event.keyCode == 13){
					$('.login-submit').click();
				}
			}
		},
		tipWarning:function(msg){
			$('#login-box .tips').css('visibility', 'visible')
				.addClass('warning')
				.find('span').text(msg);
			$('.input-group').addClass('warning');
		},
		userInfo:function(){
			$.ajax({
				url:'api/bd/user/userInfo',
				dataType: 'json',
				success:function(data){
					if(data && data.results){
						data = data.results;
						if(data.type === '1' || data.type === '0'){
							//教师
							for(var i = 0, item; item = data.permissions[i++];){
								if(secretary[item]){
									//教育局长
									data.role = Constant.DIRECTOR;
									// location.href = Constant.PATH_URL + '/public/html/diagnosis/director/index.html';
									return;
								}
							}
							if(data.type === '1'){
								//普通教师与校长
								data.role = Constant.TEACHER;
								// location.href= Constant.PATH_URL + '/public/html/exam/knowledge-point-choose-paper.html';
								return;
							}
						}else if(data.type === '2' || data.type === '3'){
							//学生与家长
							data.role = Constant.STUDENT_PARENT;
							//教育局长、教师、校长会在user-info文件中添加menuData数据，学生和家长的没有menuData
							store.set(Constant.STORAGE_KEY.USER_INFO, data);
							location.href = Constant.STU_PATH_URL + '/html/analytic/zhenduan.html';
							return;
						}
					}
				}
			});
		}
}
login.init();