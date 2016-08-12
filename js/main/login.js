/**
 * fudapeng 8.12
 */
var Constant =  require('config');


var AUTO_LOGIN_TIPS = '公共场所不建议自动登录，以防帐号丢失',
		NAME_PASSWORD_NULL = '请输入账户名和密码',
		NAME_NULL = '请输入用户名',
		PASSWORD_NULL = '请输入密码',
		ERROR_NAME_PASSWORD = '用户名或密码错误';

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
		}
}