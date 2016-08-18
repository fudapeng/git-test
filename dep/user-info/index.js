/**
 * Created by admin on 16-2-22.
 */


var ajax = require('util/ajax');

var store = require('store');

var Constant = require('config.json');

var filter = require('filter-user-config.json');

var util = require('util/util');

var permissionConfig = require('./config/left-menu-config.json');

var permissionConfig2 = require('./config/left-menu-level-config.json');

var excludePermission = "sa_standardSet";

var roleHandler = {
    init: function (data) {
        if (data.type == 1 || data.type == 0) {
            //当没有权限的时候，处理当前人物为教师登陆
            if (data.permissions.length == 0) {
                data.role = Constant.TEACHER;
                return;
            }
            for (var i = 0, item; item = data.permissions[i++];) {
                if (item == excludePermission) {//不考虑这个页面
                    continue;
                }
                if (filter.secretary[item] === 1) {
                    //局长
                    data.role = Constant.DIRECTOR;
                    break;
                } else {
                    //教师
                    data.role = Constant.TEACHER;//循环覆盖上老师的角色
                }
            }
        } else if (data.type == 2 || data.type == 3) {
            //学生与家长
            data.role = Constant.STUDENT_PARENT;
        }
    }
};


var permissionHandler = {
    permissions: '',
    role: '',
    menuData: {
        //局长单科菜单 内容
        DIRECTOR_SINGLE: [],
        //局长全科
        DIRECTOR_MUTIL: [],
        //校级单科
        TEACHER_SINGLE: [],
        //分层 校级单科
        LEVEL_TEACHER_SINGLE: [],
        //校级全科
        TEACHER_MUTIL: []
    },
    init: function (permissions, role) {
        this.role = role;
        this.permissions = permissions;
        this.initMenuData();
        return this.menuData;
    },
    initMenuData: function () {
        var self = this,
            permissionInfo, levelPermissionInfo;//todo 权限信息 全局变量
        //清空上次数据内容
        this.menuData.DIRECTOR_SINGLE = [];
        this.menuData.DIRECTOR_MUTIL = [];
        this.menuData.TEACHER_SINGLE = [];
        this.menuData.LEVEL_TEACHER_SINGLE = [];
        this.menuData.TEACHER_MUTIL = [];
        util.forEach(this.permissions, function (permission) {
            if (!permissionConfig[permission]) {//permissionConfig 是传入的对象
                return;
            }//传入的权限不存在的时候跳出当前循环不执行后面的语句
            permissionInfo = permissionConfig[permission] ? permissionConfig[permission][0] : null;
            levelPermissionInfo = permissionConfig2[permission] ? permissionConfig2[permission][0]: null;
            switch (self.role) {
                case Constant.DIRECTOR:
                    //过滤 过滤出单科全科，以及区分出来局长还有教师角色
                    if (filter.secretary[permission]) {
                        //局长权限
                        //获取权限对应的权限配置信息
                        //局长角色下面看不到分层教学班
                        self.initDir(permissionInfo);
                    }
                    if (filter.course_teacher[permission]) {
                        //校长权限 包括分层教学班
                        self.initTeacher(permissionInfo, levelPermissionInfo);
                    }
                    break;
                case Constant.TEACHER:
                    if (filter.course_teacher[permission]) {
                        self.initTeacher(permissionInfo, levelPermissionInfo);
                    }
                    break;
            }
        });
        this.menuData.DIRECTOR_SINGLE = this.menuData.DIRECTOR_SINGLE.sort(function (a, b) {
            return a.weights - b.weights;
        });
        this.menuData.DIRECTOR_MUTIL = this.menuData.DIRECTOR_MUTIL.sort(function (a, b) {
            return a.weights - b.weights;
        });
        this.menuData.TEACHER_SINGLE = this.menuData.TEACHER_SINGLE.sort(function (a, b) {
            return a.weights - b.weights;
        });
        this.menuData.LEVEL_TEACHER_SINGLE = this.menuData.LEVEL_TEACHER_SINGLE.sort(function (a, b) {
            return a.weights - b.weights;
        });
        this.menuData.TEACHER_MUTIL = this.menuData.TEACHER_MUTIL.sort(function (a, b) {
            return a.weights - b.weights;
        });
    },
    initDir: function (permissionInfo) {
         //不考虑单科和多科一起的
        if (permissionInfo.mulitCourse != 1) {
            //单科显示权限
            this.initDirSingle(permissionInfo);
        }
        if (permissionInfo.mulitCourse != 2) {
            //多可显示权限
            this.initDirMutil(permissionInfo);
        }
    },
    initTeacher: function (permissionInfo, levelPermissionInfo) {
        if (permissionInfo.mulitCourse != 1) {
            //单科显示权限
            this.initTeaSingle(permissionInfo, levelPermissionInfo);
        }
        if (permissionInfo.mulitCourse != 2) {
            //多可显示权限
            this.initTeaMutil(permissionInfo);
        }
    },
    initDirSingle: function (permissionInfo) {
        //单科显示权限
        this.addMenuData(this.menuData.DIRECTOR_SINGLE, permissionInfo);
    },
    initDirMutil: function (permissionInfo) {
        //多科显示权限
        this.addMenuData(this.menuData.DIRECTOR_MUTIL, permissionInfo);
    },
    initTeaSingle: function (permissionInfo, levelPermissionInfo) {
        if(permissionInfo){
            this.addMenuData(this.menuData.TEACHER_SINGLE, permissionInfo);
        }
        if(levelPermissionInfo){
            this.addMenuData(this.menuData.LEVEL_TEACHER_SINGLE, levelPermissionInfo);
        }
    },
    initTeaMutil: function (permissionInfo) {
        //教师多科的情况下是不区分 行政班和教学班
        this.addMenuData(this.menuData.TEACHER_MUTIL, permissionInfo);
    },
    /**
    * 给不同的list装入合并permission对象
    * @param list 对应permissionHandler.menuData下的不同数组对象
    * @param permissionInfo 当前要add进入permissionHandler.menuData中的数据
    */
    addMenuData: function (list, permissionInfo) {
        var isPush = false;
        util.forEach(list, function (currentInfo) {
            isPush = true;
            if (currentInfo.id == permissionInfo.id) {
                currentInfo.list = currentInfo.list.concat(permissionInfo.list).sort(function (a, b) {
                    return a.weights - b.weights;
                });
                isPush = false;
                return true;
            }
        });
        if (isPush || list.length == 0) {
            list.push(permissionInfo);
        }
    }
};

//获取用户信息
// callback 成功返回用户信息 必填
// errorCallback 失败后调用的方法 必填
// ctx 上下文信息，选填
module.exports = function (callback, errorCallback, ctx) {
    if (!store.get(Constant.STORAGE_KEY.USER_INFO)) {
        ajax({
            url: '/api/bd/user/userInfo.do'
        }).then(function (data) {
            data = data.results;
            roleHandler.init(data);//添加用户角色
            data.menuData = permissionHandler.init(data.permissions, data.role);
            store.set(Constant.STORAGE_KEY.USER_INFO, data);
            if (ctx) {
                callback.call(ctx, data);
            } else {
                callback(data);
            }
        }, function () {
            //console.log('获取当前用户信息失败');
            if (ctx) {
                errorCallback.apply(ctx, arguments);
            } else {
                errorCallback.apply(null, arguments);
            }

        }).fail(function (e) {
            console.error(e);
        });
    } else {
        var data = store.get(Constant.STORAGE_KEY.USER_INFO);
        if (data.role === Constant.STUDENT_PARENT) {
            //学生角色
            location.href = Constant.STU_PATH_URL + '/html/user/login.html';
        }
        if (ctx) {
            callback.call(ctx, store.get(Constant.STORAGE_KEY.USER_INFO));
        } else {
            callback(store.get(Constant.STORAGE_KEY.USER_INFO));
        }
    }
};
