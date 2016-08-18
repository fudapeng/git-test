/**
 * Created by fudapeng on 2015/3/31.
 */


//location begin with
var lcb = "/api/bd";

module.exports = {
    /*
     * 用户数量
     * */
    "queryCount": lcb + '/user/queryCount',
    //系统用户
    "queryByPositionId": lcb + '/user/queryByPositionId',
    //普通用户
    "queryNormalUser": lcb + '/user/queryNormalUser',
    //删除用户
    "remove": lcb + '/user/remove',
    //匹配用户
    "/user/queryNormalAndTeacherUser": lcb + "/user/queryNormalAndTeacherUser",
    /*
     * 学生相关
     * */
    //获取学生信息
    "/student/get": lcb + "/student/get",
    //按姓名模糊查询学生考号信息
    "/student/queryExamNumByName": lcb + "/student/queryExamNumByName",
    //按准考证号或姓名模糊查询学生
    "/student/getStudentByExamNumOrName": lcb + '/student/getStudentByExamNumOrName',
    //按班级id查询学生信息
    "/student/queryByEclassIds": lcb + "/student/queryByEclassIds",
    //查询学生姓名、考号信息
    "/student/queryByIdsAndSchoolTermId": lcb + "/student/queryByIdsAndSchoolTermId",
    //根据用户id获取学生信息
    "/student/queryByUserIds": lcb + "/student/queryByUserIds",
    //按考号查询学生信息
    "/student/queryByExamNums": lcb + "/student/queryByExamNums",

    "/student/downloadExamNum": lcb + "/student/downloadExamNum",

    /**
     * 班级相关
     *
     */
    //获取班级信息
    "/eclass/get": lcb + "/eclass/get",
    //按学期和年级获取所有班级信息
    "/eclass/query": lcb + "/eclass/query",
    //按班级id获取指定学期班级信息
    "/eclass/queryByIdsAndSchoolTermId": lcb + "/eclass/queryByIdsAndSchoolTermId",
    //按班级id获取所有相关班级
    "/eclass/queryAllByIds": lcb + "/eclass/queryAllByIds",
    //按学生id获取所有班级
    "/eclass/queryByStudentIds": lcb + "/eclass/queryByStudentIds",
    //查询班级人数信息
    "/eclass/eclassExamNumCount": lcb + "/eclass/eclassExamNumCount",

    //考试列表-创建考试的弹出框中用到的
    "/eclass/queryExamEclass": lcb + "/eclass/queryExamEclass",
    "/teacher/queryTeacherByCurUserSchool": lcb + "/teacher/queryTeacherByCurUserSchool",

    /**
     * 年级相关
     *
     */
    //获取年级信息
    "/grade/get": lcb + "/grade/get",
    //获取学生的年级信息
    "/grade/queryByStudentId": lcb + "/grade/queryByStudentId",
    //获取所有年级信息
    "/grade/queryAll": lcb + "/grade/queryAll",

    /**
     * 校区相关
     */
    //按id获取校区信息
    "/campus/get": lcb + "/campus/get",
    //获取所有校区信息
    "/campus/query": lcb + "/campus/query",
    //按学校id获取校区信息
    "/campus/queryBySchoolId": lcb + "/campus/queryBySchoolId",

    /**
     * 学校相关
     */
    //获取学校信息
    "/school/get": lcb + "/school/get",
    //获取所有学校
    "/school/queryAll": lcb + "/school/queryAll",
    //获取所有学校类别
    "/schoolType/genAllSchoolType": lcb + "/schoolType/genAllSchoolType",
    //按区,学校类别 查询学校
    "/school/querySchoolByDistrictAndSchoolType": lcb + "/school/querySchoolByDistrictAndSchoolType",
    /**
     * 教师相关
     */
    //获取教师信息
    "/teacher/get": lcb + "/teacher/get",
    //获取教师任课信息
    "/teacher/queryTeachCourse": lcb + "/teacher/queryTeachCourse",
    //按用户id获取教师信息
    "/teacher/queryByUserIds": lcb + "/teacher/queryByUserIds",
    //查询当前用户所属教师任课信息
    '/teacher/queryCurTeacherTeachCourse': lcb + '/teacher/queryCurTeacherTeachCourse',
    /**
     * 能力类型相关
     */
    //按课程和学段查询能力类型
    "/ability/query": lcb + "/ability/query",
    //按id查询能力类型
    "/ability/get": lcb + "/ability/get",

    /**
     * 知识点相关
     */
    //按课程和学段查询能力类型
    "/knowledgePoint/query": lcb + "/knowledgePoint/query",
    //按id查询知识点
    "/knowledgePoint/get": lcb + "/knowledgePoint/get",
    //按三级id查询知识点
    "/knowledgePoint/queryByIds": lcb + "/knowledgePoint/queryByIds",
    //按id查询三级知识点
    "/knowledgePoint/queryLevel3ByIds": lcb + "/knowledgePoint/queryLevel3ByIds",

    /**
     * 认知层次相关
     */
    //按课程和学段查询认知层次
    "/cognitiveLevel/query": lcb + "/cognitiveLevel/query",
    //按id查询认知层次
    "/cognitiveLevel/get": lcb + "/cognitiveLevel/get",

    /**
     * 教材、章、节相关
     */
    //查询所有教材
    "/teachingMaterial/query": lcb + "/teachingMaterial/query",
    //按id查询教材
    "/teachingMaterial/get": lcb + "/teachingMaterial/get",
    //查询章
    "/chapter/query": lcb + "/chapter/query",
    //按id查询章信息
    "/chapter/get": lcb + "/chapter/get",
    //查询节信息
    "/section/query": lcb + "/section/query",
    //按id查询节信息
    "/section/get": lcb + "/section/get",

    /**
     * 学期相关
     */
    //按id查询学期信息
    "/schoolTerm/get": lcb + "/schoolTerm/get",
    //查询学期信息（当前学期和启用过的学期）
    "/schoolTerm/query": lcb + "/schoolTerm/query",
    //查询当前学期
    "/schoolTerm/queryCurrent": lcb + "/schoolTerm/queryCurrent",
    //查询学生经历过的学期
    "/schoolTerm/queryByStudentId": lcb + "/schoolTerm/queryByStudentId",

    /**
     * 用户,权限相关
     */
    //查询用户权限
    "/privilege/query": lcb + "/privilege/query",
    //查询用户权限类型信息
    "/user/userInfo": lcb + "/user/userInfo",
    //添加新用户
    "/user/save": lcb + "/user/save",
    /**
     * 数据范围
     */
    //查询用户班级数据范围
    "/dataScope/queryEclass": lcb + "/dataScope/queryEclass",
    //查询用户课程数据范围
    "/dataScope/queryCourse": lcb + "/dataScope/queryCourse",

    //地区
    "/district/getAllDistrict": lcb + "/district/getAllDistrict",

    '/user/updateDefaultSchoolStageAndCourse': lcb + '/user/updateDefaultSchoolStageAndCourse',//更新默认课程和学段

    '/teachingMaterial/queryTMV': lcb + '/teachingMaterial/queryTMV',//按学段，学科查询教材版本（同步知识点选题）

    '/teachingMaterial/queryUnitTestTMV': lcb + '/teachingMaterial/queryUnitTestTMV',//按学段，学科查询教材版本(单元测试)

    '/teachingMaterial/queryTMById': lcb + '/teachingMaterial/queryTMById',//按教材版本查询教材

    '/chapter/queryChapterByTM': lcb + '/chapter/queryChapterByTM',//按教材查询章节

    '/user/sendCodeForSetPwd': lcb + '/user/sendCodeForSetPwd',//发送找回密码的短信验证码

    '/user/verifySetPwdCode': lcb + '/user/verifySetPwdCode',//验证找回密码的短信验证码

    '/user/setFindPwd': lcb + '/user/setFindPwd',//找回密码-设置密码

    '/student/queryMaxLengthExamNum': lcb + '/student/queryMaxLengthExamNum'//获取学生考号位数最长值

};


