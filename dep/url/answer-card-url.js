/**
 * Created by qk on 2015/4/3.
 */


var lcb = "/api/ac";

module.exports = {

    //上传记录
    //\public\JS\uploadHistory\uploadHistory.js
    '/card/sbm': lcb + '/card/sbm', //上传记录

    '/card/aggre': lcb + '/card/aggre', //按考试查看
    '/card/correc': lcb + '/card/correc',//手动输入准考证号，页码
    '/card/liststate': lcb + '/card/liststate',
    '/card/upload': lcb + '/card/upload',//上传答题卡
    '/card/uploadAnswerCard': lcb + '/card/uploadAnswerCard',//答题卡上传(支持正反面)
    '/card/uploadAnswerCardSyn': lcb + '/card/uploadAnswerCardSyn',//单张答题卡上传(支持正方面)

    '/card/getEclass': lcb + '/card/getEclass',//获取班级
    '/card/getCardDetail': lcb + '/card/getCardDetail',//答题卡详情

    '/card/queryStudentCard': lcb + '/card/queryStudentCard',//查询学生答题卡
    '/card/getCardDetai': lcb + '/card/getCardDetai',//答题卡详情
    '/card/scoreDetail': lcb + '/card/scoreDetail',//学生答题卡得分明细
    '/card/updateScore': lcb + '/card/updateScore',//修改得分
    '/card/deleteCard': lcb + '/card/deleteCard',//答题看置为无效
    '/card/updateExamNum': lcb + '/card/updateExamNum',//修改准考证号
    '/card/getUnKnownCard': lcb + '/card/getUnKnownCard',//查看未知答题卡
    '/card/queryAllExams': lcb + '/card/queryAllExams',//全部考试
    '/card/queryUnAnalysisExams': lcb + '/card/queryUnAnalysisExams',//答题卡未上传、已上传

    /* 上传记录新接口*/
    '/card/queryByExam': lcb + '/card/queryByExam',

    '/card/queryCount': lcb + '/card/queryCount',//左侧列表统计

    '/card/queryAllCards': lcb + '/card/queryAllCards',//全部答题卡
    '/card/queryAnalysisCards': lcb + '/card/queryAnalysisCards',//正常答题卡
    '/card/queryOKCards': lcb + '/card/queryOKCards',//答题卡正常/异常
    '/card/queryEclassCards': lcb + '/card/queryEclassCards',//班级答题卡
    '/card/querySchoolCards': lcb + '/card/querySchoolCards',//学校答题卡
    '/card/checkUnConfirmedResults': lcb + '/card/checkUnConfirmedResults',//答题卡校验分数
    '/card/queryPageErrorCards': lcb + '/card/queryPageErrorCards',//未识别页码
    '/card/queryExamNumErrorCards': lcb + '/card/queryExamNumErrorCards',//未识别准考证号
    '/card/queryAnalysisErrorCards': lcb + '/card/queryAnalysisErrorCards',//手动维护无法识别页面的无法识别接口
    '/card/queryUnAnalysisCards': lcb + '/card/queryUnAnalysisCards',//无法识别

    /*修改答題卡頁面，答題卡缺失重新上傳*/
    '/card/uploadSyn': lcb + '/card/uploadSyn',

    '/card/hwState': lcb + '/card/hwState',//判断是否为手写识别
    '/card/checkConfirmed': lcb + '/card/checkConfirmed',//考卷内容0-9未确认校验 确认并查看下一页
    '/card/checkExamPaperResults': lcb + '/card/checkExamPaperResults',//卷内容0-9校验已确认/已修改识别结果
    '/card/unRecognizeResults': lcb + '/card/unRecognizeResults',//考卷内容未识别
    '/card/updateRecognize': lcb + '/card/updateRecognize',//保存修改识别并查看下一个(未识别)
    '/card/updateRecognizeResult': lcb + '/card/updateRecognizeResult',//修改识别(无返回图片数据)
    '/card/queryUnCompleteCards': lcb + '/card/queryUnCompleteCards',//考生信息不完整

    '/card/deleteAnalysisErrorCards': lcb + '/card/deleteAnalysisErrorCards',//批量删除未识别答题卡
    '/card/markingPaper/getAllMissions': lcb + '/card/markingPaper/getAllMissions',//网络阅卷-返回任务列表
    //网络阅卷-返回某个学生的作答情况及学生信息
    '/card/markingPaper/getOneStudentAnswer': lcb + '/card/markingPaper/getOneStudentAnswer',
    //网络阅卷-保存评分
    '/card/markingPaper/saveScore': lcb + '/card/markingPaper/saveScore',
    //网络阅卷-跳过评分
    '/card/markingPaper/skipScore': lcb + '/card/markingPaper/skipScore',
    //网络阅卷-返回整张试卷
    '/card/markingPaper/getStuAnswerCard': lcb + '/card/markingPaper/getStuAnswerCard',
    //网络阅卷-返回当前题的答案
    '/card/markingPaper/getSubjectAnswer': lcb + '/card/markingPaper/getSubjectAnswer',
    '/card/checkCounts': lcb + '/card/checkCounts',//考卷评分校验未确认数量
    //导入数据——解析成绩Excel
    '/score/parseScoreExcel': lcb + '/score/parseScoreExcel',
    //导入数据——查看分数..
    '/score/queryScores': lcb + '/score/queryScores',
    //根据考卷id查询score上传时间
    '/score/queryCtimeByPaperIds': lcb + '/score/queryCtimeByPaperIds',
    //根据考卷id删除score记录
    '/score/deleteScoreByExamPaperId': lcb + '/score/deleteScoreByExamPaperId',
    //导入数据——修改分数..
    '/score/updateScores': lcb + '/score/updateScores',
    //删除当前学校当前考试的所有答题卡（清空答题卡）
    '/card/deleteAllCards': lcb + '/card/deleteAllCards'

};


