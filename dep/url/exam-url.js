/**
 * Created by qk on 2015/4/1.
 */


//location begin with
var lcb = "/api/ex";
module.exports = {
    //考试任务列表
    //public/JS/exam-list.js
    '/exam/list': lcb + '/exam/list', //7.请求考试list
    "/exam/exampaper/query": lcb + "/exam/exampaper/query",
    '/exam/add': lcb + '/exam/add', //8.增加考试
    '/exam/removePaper': lcb + '/exam/removePaper',
    '/exam/delete': lcb + '/exam/delete',  //9.删除考试
    '/exam/setPaper': lcb + '/exam/setPaper',//5.保存考卷
    '/exam/get': lcb + '/exam/get', //12.返回考卷信息（内部）
    '/exam/exampaper/genWordUrlAgain': lcb + '/exam/exampaper/genWordUrlAgain', //再次生成word
    //答题卡相关
    "/exam/exampaper/saveAnswerCard": lcb + "/exam/exampaper/saveAnswerCard",
    "/exam/exampaper/getCardData": lcb + "/exam/exampaper/getCardData",
    "/exam/exampaper/downloadAnswerCard": lcb + "/exam/exampaper/downloadAnswerCard",
    "/exam/exampaper/listExamByPaper": lcb + "/exam/exampaper/listExamByPaper",
    "/exam/listExamByPaper": lcb + "/exam/listExamByPaper",

    //V1.3保存考卷
    '/exam/exampaper/save': lcb + '/exam/exampaper/save',
    "/exam/exampaper/getUrlById": lcb + "/exam/exampaper/getUrlById",//返回当前题中所有的图片
    // 下载试卷和答题卡
    "/exam/exampaper/downloadPaperAndAnswerCard": lcb + "/exam/exampaper/downloadPaperAndAnswerCard",
    //指派
    "/exam/exampaper/designateExamPaper": lcb + "/exam/exampaper/designateExamPaper",
    //返回考卷信息
    "/exam/exampaper/get": lcb + "/exam/exampaper/get",
    //增加单科考试
    "/exam/exampaper/addExamCourse": lcb + "/exam/exampaper/addExamCourse",
    //删除单科考试..
    "/exam/exampaper/deleteExamCourse": lcb + "/exam/exampaper/deleteExamCourse",
    //复制考试
    "/exam/copyExam": lcb + "/exam/copyExam",
    //考卷列表
    "/exam/exampaper/listExamPaper": lcb + "/exam/exampaper/listExamPaper",
    //复制考卷
    "/exam/exampaper/copyExamPaper": lcb + "/exam/exampaper/copyExamPaper",
    //V1.3 excel预览
    '/exam/exampaper/getExcelData': lcb + '/exam/exampaper/getExcelData',
    //V1.3 下载excel
    '/exam/exampaper/downloadExcel': lcb + '/exam/exampaper/downloadExcel',
    //选择阅卷方式
    '/chooseMarkingPaperWay': lcb + '/exam/exampaper/chooseMarkingPaperWay',
    //V1.3新增的考试发布接口
    '/exam/exampaper/releaseCard': lcb + '/exam/exampaper/releaseCard',

    //导入数据——考试列表
    '/exam/listUnnormalExam': lcb + '/exam/listUnnormalExam',
    //导入数据——解析双向细目表
    '/exam/exampaper/parserTwoWayChecklist': lcb + '/exam/exampaper/parserTwoWayChecklist',
    //导入数据——删除
    '/exam/deleteUnnormalExamCourse': lcb + '/exam/deleteUnnormalExamCourse',
    //导入数据——查看双向细目表
    '/exam/exampaper/getUnnormalExcelData': lcb + '/exam/exampaper/getUnnormalExcelData',
    //导入数据——下载模板
    '/exam/exampaper/downloadImportExcelTemplate': lcb + '/exam/exampaper/downloadImportExcelTemplate',
    //合并答题区
    '/exam/exampaper/mergerSubjectAnswerArea': lcb + '/exam/exampaper/mergerSubjectAnswerArea'
};
