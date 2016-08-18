/**
 * Created by hui on 2015/3/31.
 */

var lcb = "/api/pp";

module.exports = {
    //登陆
    "/passort/login": lcb + "/passport/login",
    //注销 修改密码
    "/passport/logout": lcb + "/passport/logout",
    //内部接口 校验接口
    "/passport/checkToken": lcb + "/passport/checkToken",
    //添加用户
    "/passport/add": lcb + "/passport/add",
    //初次修改密码
    '/passport/changePassFirst': lcb + '/passport/changePassFirst',
    //重置密码
    'resetPassword': lcb + '/passport/resetPassword',
    //修改密码
    'changePass': lcb + '/passport/changePass',
    //检测用户名是否重复
    '/passport/checkRepeat': lcb + '/passport/checkRepeat'
};


