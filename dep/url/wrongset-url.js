/**
 * Created by qk on 2015/3/31.
 */


//location begin with
var lcb = "/api/ws";
module.exports = {

    //我的错题本
    //\public\JS\studentWrongset\get-filter-params.js
    "/wrongSubject/findQueryData": lcb + "/wrongSubject/findQueryData", //筛选条件展示

    //\public\JS\studentWrongset\knowledge-handler.js
    "/wrongSubject/findKnowledgePoints": lcb + "/wrongSubject/findKnowledgePoints", //知识点展示
    "/wrongSubject/findByKnowledgePoint": lcb + "/wrongSubject/findByKnowledgePoint",//根据知识点筛选出题目

    //\public\JS\studentWrongset\wrong-exam-list.js
    "/wrongSubject/findExamCourses": lcb + "/wrongSubject/findExamCourses",
    "/wrongSubject/findByExamAndCourse": lcb + "/wrongSubject/findByExamAndCourse",

    //\public\JS\studentWrongset\wrong-subject-list.js
    "/wrongSubject/deleteWrongSubject": lcb + "/wrongSubject/deleteWrongSubject", //移除错题
    "/wrongSubject/addFavTags": lcb + "/wrongSubject/addFavTags", //点击收藏弹出框的“确定”按钮
    "/wrongSubject/addFav": lcb + "/wrongSubject/addFav", //点击收藏按钮
    "/wrongSubject/delFav": lcb + "/wrongSubject/delFav", //点击取消收藏
    "/wrongSubject/findAll": lcb + "/wrongSubject/findAll", //在年级、学科、类型筛选条件下查询所有错题的接口
    "/wrongSubject/finishUpload": lcb + "/wrongSubject/finishUpload",//考试报表统计错题接口
    /*
     我的收藏
     */
    //\public\JS\studentCollect\quest-list-handler.js
    '/wrongSubject/findByTag': lcb + '/wrongSubject/findByTag',
    '/wrongSubjectTag/getTags': lcb + '/wrongSubjectTag/getTags',
    '/wrongSubjectTag/updateTagName': lcb + "/wrongSubjectTag/updateTagName"
};


