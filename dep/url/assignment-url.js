/**
 * Created by qk on 2015/3/31.
 */

//location begin with
var lcb = "/api/am";

module.exports = {
    /**
     * 作业相关
     */
    //增加作业任务
    '/assignment/teacher/addAssignment': lcb + '/assignment/teacher/addAssignment',
    //老师所出作业列表
    '/assignment/teacher/listAssignment': lcb + '/assignment/teacher/listAssignment',
    //作业试题预览
    '/assignment/teacher/paperView': lcb + '/assignment/teacher/paperView',
    //作答详情
    '/assignment/teacher/listSubmission': lcb + '/assignment/teacher/listSubmission',
    //查看
    '/assignment/getAnswerDetail': lcb + '/assignment/teacher/getAnswerDetail',
    //作业分析
    '/assignment/teacher/getAnalysis': lcb + '/assignment/teacher/getAnalysis',
    //删除一次作业
    '/assignment/teacher/deleteAssignment': lcb + '/assignment/teacher/deleteAssignment',
    //下载作业分析
    '/assignment/teacher/downloadAnalysis': lcb + '/assignment/teacher/downloadAnalysis',
    //关联试卷
    '/assignment/teacher/setPaper': lcb + '/assignment/teacher/setPaper',        //关联试题
    '/assignment/teacher/addFeedback': lcb + '/assignment/teacher/addFeedback',   //提交反馈（二期作废）
    '/assignment/teacher/saveFeedback': lcb + '/assignment/teacher/saveFeedback', //提交多题反馈（二期新加）
    '/assignment/teacher/getAssignmentContent': lcb + '/assignment/teacher/getAssignmentContent', //获取作业内容(二期新加)
    '/assignment/teacher/addContent': lcb + '/assignment/teacher/addContent', //保存作业
    '/assignment/teacher/copyAssignment': lcb + '/assignment/teacher/copyAssignment' //复制作业
};
